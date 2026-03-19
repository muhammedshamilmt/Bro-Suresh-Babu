require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
const enquiriesRouter = require("./routes/enquiries");
const blogsRouter = require("./routes/blogs");

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "1mb" }));

// Disable x-powered-by for security
app.disable("x-powered-by");

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/enquiries", enquiriesRouter);
app.use("/api/blogs", blogsRouter);

app.get("/api/health", (_req, res) => res.json({ status: "ok", ts: Date.now() }));

// ── Start ─────────────────────────────────────────────────────────────────────
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
