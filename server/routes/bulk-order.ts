import type { RequestHandler } from "express";
import { z } from "zod";
import { getMongoClient } from "../lib/mongo";

const BulkOrderSchema = z.object({
  name: z.string().min(1),
  company: z.string().optional().nullable(),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  category: z.string().min(1),
  quantity: z.string().or(z.number()).transform((v) => Number(v)).refine((n) => Number.isFinite(n) && n > 0, "Invalid quantity"),
  budget: z.string().optional().nullable(),
  deadline: z.string().optional().nullable(),
  details: z.string().min(1),
});

export const handleBulkOrder: RequestHandler = async (req, res) => {
  try {
    const input = BulkOrderSchema.parse(req.body);
    const client = await getMongoClient();
    const db = client.db("wraps_and_boxes");
    const col = db.collection("bulk_orders");
    const result = await col.insertOne({ ...input, createdAt: new Date() });
    res.json({ ok: true, id: String(result.insertedId) });
  } catch (err: any) {
    res.status(400).json({ ok: false, error: err?.message || "Invalid request" });
  }
};
