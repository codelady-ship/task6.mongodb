import express from "express";
import programmersModel from "../Models/programmersModel.js";

const router = express.Router();

// GET
router.get("/programmers", async (req, res) => {
  try {
    const data = await programmersModel.find();
    if (data && data.length > 0) {
      res.status(200).send(data);
    } else {
      res.status(404).send({ message: "No programmers found." });
    }
  } catch (error) {
    res.status(500).send({ message: "Error fetching data", error });
  }
});

// POST
router.post("/programmers", async (req, res) => {
  const data = req.body;
  if (data.name && data.age && data.stack && data.stack.length > 0) {
    try {
      await programmersModel.create(data);
      res.status(201).send({
        status: 201,
        message: "Data added successfully",
      });
    } catch (error) {
      res.status(500).send({ message: "Error creating data", error });
    }
  } else {
    res.status(400).send({
      status: 400,
      message: "Invalid data: name, age, and stack are required",
    });
  }
});

// GET by ID
router.get("/programmers/:id", async (req, res) => {
  try {
    const programmer = await programmersModel.findById(req.params.id);
    if (programmer) {
      res.status(200).send(programmer);
    } else {
      res.status(404).send({ message: "Programmer not found" });
    }
  } catch (error) {
    res.status(400).send({ message: "Invalid ID", error });
  }
});

// PUT
router.put("/programmers/:id", async (req, res) => {
  try {
    const updated = await programmersModel.findByIdAndUpdate(req.params.id, req.body);
    if (updated) {
      res.status(200).send({
        message: "Programmer updated successfully",
      });
    } else {
      res.status(404).send({ message: "Programmer not found" });
    }
  } catch (error) {
    res.status(400).send({ message: "Error updating", error });
  }
});

// DELETE
router.delete("/programmers/:id", async (req, res) => {
  try {
    const deleted = await programmersModel.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.status(200).send({
        message: "Programmer deleted successfully",
      });
    } else {
      res.status(404).send({ message: "Programmer not found" });
    }
  } catch (error) {
    res.status(400).send({ message: "Error deleting", error });
  }
});

export default router;
