import type { RequestHandler } from "express";
import crypto from "node:crypto";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getMongoClient } from "../lib/mongo";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

function base64url(input: Buffer | string) {
  const b64 = (typeof input === "string" ? Buffer.from(input) : input).toString("base64");
  return b64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function getSessionSecret() {
  return process.env.SESSION_SECRET || "dev_session_secret_change_me";
}

function signSession(payload: Record<string, any>) {
  const data = JSON.stringify(payload);
  const sig = crypto.createHmac("sha256", getSessionSecret()).update(data).digest();
  return `${base64url(Buffer.from(data))}.${base64url(sig)}`;
}

function verifySession(token: string | undefined | null): any | null {
  if (!token) return null;
  const [dataB64, sigB64] = token.split(".");
  if (!dataB64 || !sigB64) return null;
  const data = Buffer.from(dataB64.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString();
  const expectedSig = base64url(crypto.createHmac("sha256", getSessionSecret()).update(data).digest());
  if (expectedSig !== sigB64) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function getRedirectUri(req: any) {
  const host = req.get("host");
  const proto = (req.headers["x-forwarded-proto"] as string) || req.protocol || "http";
  return `${proto}://${host}/api/auth/google/callback`;
}

export const startGoogleAuth: RequestHandler = async (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) return res.status(500).send("Google client id not configured");
  const redirectUri = getRedirectUri(req);
  const url = new URL(GOOGLE_AUTH_URL);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  res.redirect(url.toString());
};

export const googleCallback: RequestHandler = async (req, res) => {
  try {
    const code = req.query.code as string | undefined;
    if (!code) return res.status(400).send("Missing code");
    const clientId = process.env.GOOGLE_CLIENT_ID as string;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
    const redirectUri = getRedirectUri(req);

    const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });
    const tokenJson: any = await tokenRes.json();
    if (!tokenRes.ok) throw new Error(tokenJson?.error || "Token exchange failed");

    const userRes = await fetch(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${tokenJson.access_token}` },
    });
    const profile: any = await userRes.json();
    if (!userRes.ok) throw new Error("Failed to fetch user info");

    const client = await getMongoClient();
    const db = client.db("wraps_and_boxes");
    const users = db.collection("users");
    const now = new Date();
    await users.updateOne(
      { provider: "google", providerId: profile.sub },
      {
        $set: {
          provider: "google",
          providerId: profile.sub,
          email: profile.email,
          name: profile.name,
          picture: profile.picture,
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true }
    );
    const user = await users.findOne({ provider: "google", providerId: profile.sub });

    const payload = { id: String(user?._id), email: user?.email, name: user?.name, picture: user?.picture };
    const token = signSession(payload);
    res.cookie("session", token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 1000 * 60 * 60 * 24 * 30 });

    const next = (req.query.state as string) || "/";
    res.redirect(next);
  } catch (err: any) {
    res.status(400).send(err?.message || "Auth error");
  }
};

export const me: RequestHandler = async (req, res) => {
  const token = req.cookies?.session || req.headers["x-session-token"];
  const user = verifySession(typeof token === "string" ? token : undefined);
  if (!user) return res.status(401).json({ ok: false });
  res.json({ ok: true, user });
};

export const logout: RequestHandler = async (_req, res) => {
  res.clearCookie("session", { path: "/" });
  res.json({ ok: true });
};

const RegisterSchema = z.object({
  name: z.string().optional().nullable(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const register: RequestHandler = async (req, res) => {
  try {
    const input = RegisterSchema.parse(req.body);
    const client = await getMongoClient();
    const db = client.db("wraps_and_boxes");
    const users = db.collection("users");

    const existing = await users.findOne({ email: input.email });
    if (existing) return res.status(400).json({ ok: false, error: "Email already in use" });

    const hash = await bcrypt.hash(input.password, 10);
    const now = new Date();
    const result = await users.insertOne({
      provider: "password",
      email: input.email,
      name: input.name || undefined,
      passwordHash: hash,
      createdAt: now,
      updatedAt: now,
    });

    const payload = { id: String(result.insertedId), email: input.email, name: input.name };
    const token = signSession(payload);
    res.cookie("session", token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 1000 * 60 * 60 * 24 * 30 });
    res.json({ ok: true });
  } catch (err: any) {
    res.status(400).json({ ok: false, error: err?.message || "Invalid input" });
  }
};

const LoginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
export const passwordLogin: RequestHandler = async (req, res) => {
  try {
    const input = LoginSchema.parse(req.body);
    const client = await getMongoClient();
    const db = client.db("wraps_and_boxes");
    const users = db.collection("users");
    const user: any = await users.findOne({ email: input.email, provider: { $in: ["password", undefined] } });
    if (!user || !user.passwordHash) return res.status(400).json({ ok: false, error: "Invalid email or password" });
    const ok = await bcrypt.compare(input.password, user.passwordHash);
    if (!ok) return res.status(400).json({ ok: false, error: "Invalid email or password" });

    const payload = { id: String(user._id), email: user.email, name: user.name, picture: user.picture };
    const token = signSession(payload);
    res.cookie("session", token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 1000 * 60 * 60 * 24 * 30 });
    res.json({ ok: true });
  } catch (err: any) {
    res.status(400).json({ ok: false, error: err?.message || "Login failed" });
  }
};
