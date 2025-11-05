import type { RequestHandler } from "express";
import { z } from "zod";
import { getMongoClient } from "../lib/mongo";
import type { OrderRequest, OrderResponse } from "@shared/api";

const Item = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().optional(),
  price: z.number().nonnegative(),
  originalPrice: z.number().optional(),
  qty: z.number().int().positive(),
});

const Form = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string().optional().nullable(),
  city: z.string().min(1),
  state: z.string().min(1),
  postcode: z.string().min(1),
  phone: z.string().min(6),
  email: z.string().email(),
  notes: z.string().optional().nullable(),
  createAccount: z.boolean().optional().nullable(),
});

const Order = z.object({
  items: z.array(Item).min(1),
  subtotal: z.number().nonnegative(),
  total: z.number().nonnegative(),
  taxes: z.number().optional(),
  form: Form,
});

export const handleCheckout: RequestHandler = async (req, res) => {
  try {
    const parsed = Order.parse(req.body as OrderRequest);
    const client = await getMongoClient();
    const db = client.db("wraps_and_boxes");
    const orders = db.collection("orders");

    const result = await orders.insertOne({
      ...parsed,
      createdAt: new Date(),
      status: "pending",
    });

    const response: OrderResponse = { ok: true, orderId: String(result.insertedId) };
    res.json(response);
  } catch (err: any) {
    const response: OrderResponse = { ok: false, error: err?.message ?? "Unknown error" };
    res.status(400).json(response);
  }
};
