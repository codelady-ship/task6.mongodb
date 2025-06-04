import express from "express";
import mongoose from "mongoose";
import programmersModel from "../models/programmersModel.js";

const router = express.Router();
//get    

router.get("/programmers", (req, res) => {
  programmersModel.find()
    .then(data => {
      if (data && data.length > 0) {
        res.status(200).send(data);
      } else {
        res.status(404).send({ message: "No programmers found." });
      }
    })
})

//post
router.post("/programmers", (req, res) => {
  const data = req.body;//bunla tuturuq
  if (data.name && data.age && data.stack && data.stack.length > 0){
    programmersModel.create(data)//yaradiriq
      .then(() => {
        res.status(201).send({
          status: 201,
          message: "Data added successfully",
        });
      })
  } else {
    res.status(400).send({
      status: 400,
      message: "Invalid data: name, age, and stack are required",
    });
  }
  });

//get id
router.get("/programmers/:id", (req, res) => {
    const programmer = programmersModel.findById(req.params.id);//paramsla tutaq
    if (programmer) {
      res.status(200).send(programmer);
    } else {
      res.status(404).send({ message: "Programmer not found" });
    }

});

//put İD ilə proqramçını yenilə
router.put("/programmers/:id",(req, res) => {
    const updated = programmersModel.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    if (updated) {
      res.status(200).send({
        message: "Programmer updated successfully",
      });
    } else {
      res.status(404).send({ message: "Programmer not found" });
    }
  } 
);

//delete
router.delete("/programmers/:id",(req, res) => {
    const deleted =  programmersModel.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.status(200).send({
        message: "Programmer deleted successfully",
      });
    } else {
      res.status(404).send({ message: "Programmer not found" });
    }
});
