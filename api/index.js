const express = require("express");
const cors = require("cors");
const { connectDB } = require("../server/db");
const enquiriesRouter = require("../server/routes/enquiries");
const blogsRouter = require("../server/routes/blogs");

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.disable("x-powered-by");

app.use("/api/enquiries", enquiriesRouter);
app.use("/api/blogs", blogsRouter);
app.get("/api/health", (_req, res) => res.json({ status: "ok", ts: Date.now() }));

// Connect DB then handle request
let dbReady = false;
const handler = async (req, res) => {
  if (!dbReady) {
    await connectDB();
    dbReady = true;
  }
  app(req, res);
};

module.exports = handler;
