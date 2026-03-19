require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "ministry_db";

// Single client instance — reused across all requests (connection pooling)
let client;
let db;

async function connectDB() {
  if (db) return db;

  client = new MongoClient(uri, {
    maxPoolSize: 20,          // up to 20 concurrent connections
    minPoolSize: 2,           // keep 2 warm connections alive
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000,
    connectTimeoutMS: 5000,
  });

  await client.connect();
  db = client.db(dbName);

  // Ensure indexes for fast queries
  await db.collection("enquiries").createIndex({ createdAt: -1 });
  await db.collection("enquiries").createIndex({ status: 1 });
  await db.collection("blogs").createIndex({ createdAt: -1 });
  await db.collection("blogs").createIndex({ status: 1 });
  await db.collection("blogs").createIndex({ category: 1 });
  await db.collection("blogs").createIndex({ title: "text", excerpt: "text" }); // full-text search

  console.log(`✅ MongoDB connected → ${dbName}`);
  return db;
}

function getDB() {
  if (!db) throw new Error("DB not initialised — call connectDB() first");
  return db;
}

module.exports = { connectDB, getDB };
