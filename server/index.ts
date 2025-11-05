import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { handleDemo } from "./routes/demo";
import { handleCheckout } from "./routes/checkout";
import { handleBulkOrder } from "./routes/bulk-order";
import { startGoogleAuth, googleCallback, me, logout, register, passwordLogin } from "./routes/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/checkout", handleCheckout);
  app.post("/api/bulk-order", handleBulkOrder);

  // Auth routes
  app.get("/api/auth/google", startGoogleAuth);
  app.get("/api/auth/google/callback", googleCallback);
  app.get("/api/auth/me", me);
  app.post("/api/auth/logout", logout);
  app.post("/api/auth/register", register);
  app.post("/api/auth/login", passwordLogin);

  return app;
}
