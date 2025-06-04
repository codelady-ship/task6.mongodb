import mongoose from "mongoose";
import programmersSchema from "../Schemas/programmersSchema.js"; 

const programmersModel = mongoose.model("Programmer", programmersSchema);

export default programmersModel;
