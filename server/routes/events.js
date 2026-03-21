import { Router } from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../db.js";

const router = Router();
const COL = "events";

// Ensure text index exists on first use
async function ensureIndexes(db) {
  await db.collection(COL).createIndex(
    { title: "text", description: "text", location: "text" },
    { background: true }
  );
}

// GET /api/events
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    await ensureIndexes(db);
    const { status, type, search, page = "1", limit = "20" } = req.query;

    const filter = {};
    if (status && status !== "all") filter.status = status;
    if (type && type !== "all") filter.type = type;
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
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// GET /api/events/:id
router.get("/:id", async (req, res) => {
  try {
    const db = getDB();
    const doc = await db.collection(COL).findOne({ _id: new ObjectId(req.params.id) });
    if (!doc) return res.status(404).json({ error: "Event not found" });
    const { _id, ...rest } = doc;
    res.json({ id: _id.toString(), ...rest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// POST /api/events
router.post("/", async (req, res) => {
  try {
    const db = getDB();
    const {
      title, type, tag, date, time, location, image,
      description, longDescription, status, registrationOpen, color,
      showHighlights, highlights, showSpeakers, speakers,
      showSchedule, schedule,
    } = req.body;

    if (!title?.trim()) return res.status(400).json({ error: "title is required" });

    const doc = {
      title: title.trim(),
      type: type?.trim() || "",
      tag: tag?.trim() || "",
      date: date?.trim() || "",
      time: time?.trim() || "",
      location: location?.trim() || "",
      image: image?.trim() || "",
      description: description?.trim() || "",
      longDescription: longDescription?.trim() || "",
      status: ["draft", "published", "archived"].includes(status) ? status : "draft",
      registrationOpen: registrationOpen !== false,
      color: color || "from-blue-600 to-indigo-700",
      showHighlights: !!showHighlights,
      highlights: Array.isArray(highlights) ? highlights.filter(Boolean) : [],
      showSpeakers: !!showSpeakers,
      speakers: Array.isArray(speakers) ? speakers.filter((s) => s.name) : [],
      showSchedule: !!showSchedule,
      schedule: Array.isArray(schedule) ? schedule.filter((d) => d.day) : [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection(COL).insertOne(doc);
    res.status(201).json({ id: result.insertedId.toString(), ...doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create event" });
  }
});

// PUT /api/events/:id
router.put("/:id", async (req, res) => {
  try {
    const db = getDB();
    const {
      title, type, tag, date, time, location, image,
      description, longDescription, status, registrationOpen, color,
      showHighlights, highlights, showSpeakers, speakers,
      showSchedule, schedule,
    } = req.body;

    const update = {
      ...(title !== undefined && { title: title.trim() }),
      ...(type !== undefined && { type: type.trim() }),
      ...(tag !== undefined && { tag: tag.trim() }),
      ...(date !== undefined && { date: date.trim() }),
      ...(time !== undefined && { time: time.trim() }),
      ...(location !== undefined && { location: location.trim() }),
      ...(image !== undefined && { image: image.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(longDescription !== undefined && { longDescription: longDescription.trim() }),
      ...(status !== undefined && { status }),
      ...(registrationOpen !== undefined && { registrationOpen }),
      ...(color !== undefined && { color }),
      ...(showHighlights !== undefined && { showHighlights }),
      ...(highlights !== undefined && { highlights: highlights.filter(Boolean) }),
      ...(showSpeakers !== undefined && { showSpeakers }),
      ...(speakers !== undefined && { speakers: speakers.filter((s) => s.name) }),
      ...(showSchedule !== undefined && { showSchedule }),
      ...(schedule !== undefined && { schedule: schedule.filter((d) => d.day) }),
      updatedAt: new Date(),
    };

    const result = await db.collection(COL).findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: update },
      { returnDocument: "after" }
    );

    if (!result) return res.status(404).json({ error: "Event not found" });
    const { _id, ...rest } = result;
    res.json({ id: _id.toString(), ...rest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update event" });
  }
});

// DELETE /api/events/:id
router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection(COL).deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

// GET /api/events/:id/registrations
router.get("/:id/registrations", async (req, res) => {
  try {
    const db = getDB();
    const { search, status, page = "1", limit = "50" } = req.query;

    const filter = { eventId: req.params.id };
    if (status && status !== "all") filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [items, total] = await Promise.all([
      db.collection("event_registrations")
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .toArray(),
      db.collection("event_registrations").countDocuments(filter),
    ]);

    const data = items.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));
    res.json({ data, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
});

// POST /api/events/:id/registrations
router.post("/:id/registrations", async (req, res) => {
  try {
    const db = getDB();
    const { name, email, phone, city, church, attendees, attendance, message } = req.body;

    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({ error: "name and email are required" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Check event exists and registration is open
    const event = await db.collection(COL).findOne({ _id: new ObjectId(req.params.id) });
    if (!event) return res.status(404).json({ error: "Event not found" });
    if (!event.registrationOpen) return res.status(403).json({ error: "Registration is closed for this event" });

    const doc = {
      eventId: req.params.id,
      eventTitle: event.title,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "",
      city: city?.trim() || "",
      church: church?.trim() || "",
      attendees: attendees || "1",
      attendance: attendance || "in-person",
      message: message?.trim() || "",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("event_registrations").insertOne(doc);
    res.status(201).json({ id: result.insertedId.toString(), ...doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit registration" });
  }
});

// PATCH /api/events/registrations/:regId/status
router.patch("/registrations/:regId/status", async (req, res) => {
  try {
    const db = getDB();
    const { status } = req.body;
    if (!["confirmed", "pending", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const result = await db.collection("event_registrations").findOneAndUpdate(
      { _id: new ObjectId(req.params.regId) },
      { $set: { status, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    if (!result) return res.status(404).json({ error: "Registration not found" });
    const { _id, ...rest } = result;
    res.json({ id: _id.toString(), ...rest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update registration" });
  }
});

export default router;
