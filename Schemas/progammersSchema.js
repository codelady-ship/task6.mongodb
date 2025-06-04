import mongoose from "mongoose";

const stackSchema = new mongoose.Schema({
  name: String,
});

const programmersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: { 
    type: Number, 
    required: true,
  },
  stack: { 
    type: stackSchema,
    required: true,
  },
});

export default mongoose.model("Programmer", programmersSchema);
