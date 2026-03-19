import { Router } from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../db.js";

const router = Router();
const COL = "blogs";

// GET /api/blogs
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const { status, category, search, page = "1", limit = "10" } = req.query;

    const filter = {};
    if (status && status !== "all") filter.status = status;
    if (category && category !== "all") filter.category = category;
    if (search) filter.$text = { $search: search };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [items, total] = await Promise.all([
      db.collection(COL)
        .find(filter, search ? { score: { $meta: "textScore" } } : {})
        .sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .toArray(),
      db.collection(COL).countDocuments(filter),
    ]);

    const data = items.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));
    res.json({ data, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// GET /api/blogs/:id
router.get("/:id", async (req, res) => {
  try {
    const db = getDB();
    const doc = await db.collection(COL).findOne({ _id: new ObjectId(req.params.id) });
    if (!doc) return res.status(404).json({ error: "Post not found" });
    const { _id, ...rest } = doc;
    res.json({ id: _id.toString(), ...rest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// POST /api/blogs
router.post("/", async (req, res) => {
  try {
    const db = getDB();
    const { title, excerpt, content, category, author, coverImage, status, scheduledDate } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ error: "title and content are required" });
    }

    const doc = {
      title: title.trim(),
      excerpt: excerpt?.trim() || "",
      content: content.trim(),
      category: category?.trim() || "",
      author: author?.trim() || "Admin",
      coverImage: coverImage?.trim() || "",
      status: ["draft", "published", "scheduled"].includes(status) ? status : "draft",
      scheduledDate: scheduledDate || null,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection(COL).insertOne(doc);
    res.status(201).json({ id: result.insertedId.toString(), ...doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// PUT /api/blogs/:id
router.put("/:id", async (req, res) => {
  try {
    const db = getDB();
    const { title, excerpt, content, category, author, coverImage, status, scheduledDate } = req.body;

    const update = {
      ...(title && { title: title.trim() }),
      ...(excerpt !== undefined && { excerpt: excerpt.trim() }),
      ...(content && { content: content.trim() }),
      ...(category !== undefined && { category: category.trim() }),
      ...(author && { author: author.trim() }),
      ...(coverImage !== undefined && { coverImage: coverImage.trim() }),
      ...(status && { status }),
      ...(scheduledDate !== undefined && { scheduledDate }),
      updatedAt: new Date(),
    };

    const result = await db.collection(COL).findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: update },
      { returnDocument: "after" }
    );

    if (!result) return res.status(404).json({ error: "Post not found" });
    const { _id, ...rest } = result;
    res.json({ id: _id.toString(), ...rest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update post" });
  }
});

// DELETE /api/blogs/:id
router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection(COL).deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// PATCH /api/blogs/:id/views
router.patch("/:id/views", async (req, res) => {
  try {
    const db = getDB();
    await db.collection(COL).updateOne(
      { _id: new ObjectId(req.params.id) },
      { $inc: { views: 1 } }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update views" });
  }
});

export default router;
