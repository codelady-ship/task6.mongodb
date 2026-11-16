import express from "express";
import mongoose from "mongoose";
import programmersModel from "../Models/programmersModel.js";

// Mounted at /programmers in app.js, so paths here are relative to that.
const router = express.Router();

const isValidId = (id) => mongoose.isValidObjectId(id);

// Keep only the fields the API accepts (fields that are missing stay missing).
const pick = ({ name, age, stack } = {}) => {
  const out = {};
  if (name !== undefined) out.name = typeof name === "string" ? name.trim() : name;
  if (age !== undefined) out.age = Number(age);
  if (stack !== undefined) out.stack = stack && typeof stack === "object" ? { name: String(stack.name ?? "").trim() } : stack;
  return out;
};

// GET /programmers  -> always an array (empty if there are none)
router.get("/", async (req, res) => {
  try {
    const data = await programmersModel.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: "Error fetching programmers" });
  }
});

// POST /programmers  body: { name, age, stack: { name } }
router.post("/", async (req, res) => {
  const data = pick(req.body);
  if (!data.name || !data.age || !data.stack?.name) {
    return res.status(400).json({ message: "Invalid data: name, age and stack.name are required" });
  }
  try {
    const created = await programmersModel.create(data);
    res.status(201).json(created);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error creating programmer" });
  }
});

// GET /programmers/:id
router.get("/:id", async (req, res) => {
  if (!isValidId(req.params.id)) return res.status(400).json({ message: "Invalid ID" });
  try {
    const programmer = await programmersModel.findById(req.params.id);
    if (!programmer) return res.status(404).json({ message: "Programmer not found" });
    res.status(200).json(programmer);
  } catch {
    res.status(500).json({ message: "Error fetching programmer" });
  }
});

// PUT /programmers/:id
router.put("/:id", async (req, res) => {
  if (!isValidId(req.params.id)) return res.status(400).json({ message: "Invalid ID" });
  try {
    const updated = await programmersModel.findByIdAndUpdate(req.params.id, pick(req.body), {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Programmer not found" });
    res.status(200).json(updated);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error updating programmer" });
  }
});

// DELETE /programmers/:id
router.delete("/:id", async (req, res) => {
  if (!isValidId(req.params.id)) return res.status(400).json({ message: "Invalid ID" });
  try {
    const deleted = await programmersModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Programmer not found" });
    res.status(200).json({ message: "Programmer deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting programmer" });
  }
});

export default router;
