import express from "express";
import mongoose from "mongoose"; 

const { connection } = mongoose;

const app = express();
app.use(express.json());

const connection_string = "mongodb+srv://jalilovaantiqa:<db_password>@cluster0.vdz9a5b.mongodb.net/programmers?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(connection_string)
    .then(() => console.log("Database is connected"))
    .catch(err => console.error("Database connection error:", err));

//get    
app.get("/programmers", (req, res) => {
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
app.post("/programmers", (req, res) => {
  const data = req.body;
  if (data.name && data.age && data.stack && data.stack.length > 0){
    programmersModel.create(data)
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



app.listen(8080, () => {
    console.log("Server is running at http://localhost:8080");
});
