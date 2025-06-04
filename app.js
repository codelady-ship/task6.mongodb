import express from "express";
import mongoose from "mongoose"; 
import programmersRoutes from "./routes/programmers.js";
const { connection } = mongoose;

const app = express();
app.use(express.json());

const connection_string = "mongodb+srv://jalilovaantiqa:<db_password>@cluster0.vdz9a5b.mongodb.net/programmers?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(connection_string)
    .then(() => console.log("Database is connected"))
    .catch(err => console.error("Database connection error:", err));

app.use("/programmers", programmersRoutes);


app.listen(8080, () => {
    console.log("Server is running at http://localhost:8080");
});
