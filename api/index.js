import express from "express";
import cors from "cors";
import { connectDB } from "../server/db.js";
import enquiriesRouter from "../server/routes/enquiries.js";
import blogsRouter from "../server/routes/blogs.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.disable("x-powered-by");

app.use("/api/enquiries", enquiriesRouter);
app.use("/api/blogs", blogsRouter);
app.get("/api/health", (_req, res) => res.json({ status: "ok", ts: Date.now() }));

let dbReady = false;

export default async function handler(req, res) {
  try {
    if (!dbReady) {
      await connectDB();
      dbReady = true;
    }
    app(req, res);
  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).json({ error: "Internal server error", detail: err.message });
  }
}
