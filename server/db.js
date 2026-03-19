import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "brosureshbabu";

let client;
let db;

export async function connectDB() {
  if (db) return db;
  if (!uri) throw new Error("MONGODB_URI environment variable is not set");

  client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000,
    connectTimeoutMS: 5000,
  });

  await client.connect();
  db = client.db(dbName);

  await db.collection("enquiries").createIndex({ createdAt: -1 });
  await db.collection("enquiries").createIndex({ status: 1 });
  await db.collection("blogs").createIndex({ createdAt: -1 });
  await db.collection("blogs").createIndex({ status: 1 });
  await db.collection("blogs").createIndex({ category: 1 });
  await db.collection("blogs").createIndex({ title: "text", excerpt: "text" });

  console.log(`✅ MongoDB connected → ${dbName}`);
  return db;
}

export function getDB() {
  if (!db) throw new Error("DB not initialised — call connectDB() first");
  return db;
}
