import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import crudRouter from "./routes/crud.js";
import nodemailer from "nodemailer"

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());



const PORT = process.env.PORT || 7000

app.use("/api", crudRouter); //http://localhost:7000/api/users

app.get("/", (req, res)=>{
    res.send("Welcome to our CRUD API");
})


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Database connected");
      app.listen(PORT, ()=>{
        console.log(`server running on PORT ${PORT}`)
    })
    })
    .catch((err) => {
      console.error("Error connecting to the database:", err.message);
    });

   

