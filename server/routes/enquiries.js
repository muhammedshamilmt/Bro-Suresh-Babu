import { Router } from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../db.js";

const router = Router();
const COL = "enquiries";

// GET /api/enquiries
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const { status, search, page = "1", limit = "50" } = req.query;

    const filter = {};
    if (status && status !== "all") filter.status = status;
    if (search) {
      const re = new RegExp(search, "i");
      filter.$or = [{ name: re }, { email: re }, { type: re }];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [items, total] = await Promise.all([
      db.collection(COL)
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .toArray(),
      db.collection(COL).countDocuments(filter),
    ]);

    const data = items.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));
    res.json({ data, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch enquiries" });
  }
});

// POST /api/enquiries
router.post("/", async (req, res) => {
  try {
    const db = getDB();
    const { name, email, phone, type, message } = req.body;

    if (!name?.trim() || !email?.trim() || !type?.trim() || !message?.trim()) {
      return res.status(400).json({ error: "name, email, type and message are required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const doc = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "",
      type: type.trim(),
      message: message.trim(),
      status: "new",
      createdAt: new Date(),
    };

    const result = await db.collection(COL).insertOne(doc);
    res.status(201).json({ id: result.insertedId.toString(), ...doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save enquiry" });
  }
});

// PATCH /api/enquiries/:id
router.patch("/:id", async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["new", "read", "replied", "closed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const result = await db.collection(COL).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } },
      { returnDocument: "after" }
    );

    if (!result) return res.status(404).json({ error: "Enquiry not found" });
    const { _id, ...rest } = result;
    res.json({ id: _id.toString(), ...rest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update enquiry" });
  }
});

// DELETE /api/enquiries/:id
router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection(COL).deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete enquiry" });
  }
});

export default router;
