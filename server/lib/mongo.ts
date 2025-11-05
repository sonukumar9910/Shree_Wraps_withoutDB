import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Use project settings to set it.");
  }
  if (client) return client;
  client = new MongoClient(uri);
  await client.connect();
  return client;
}
