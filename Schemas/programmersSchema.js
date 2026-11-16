import mongoose from "mongoose";

// A programmer's main stack, e.g. { name: "React" }.
const stackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 40 },
  },
  { _id: false },
);

// Exports the schema only. The model is created once in Models/programmersModel.js.
const programmersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    age: { type: Number, required: true, min: 14, max: 99 },
    stack: { type: stackSchema, required: true },
  },
  { timestamps: true },
);

export default programmersSchema;
