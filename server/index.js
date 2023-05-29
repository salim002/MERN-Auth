import express from "express";
const app = express();
const PORT = process.env.PORT || 9000;

import connectToMongo from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";


connectToMongo();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Backend is running..");
})

app.use("/api/auth", authRoutes);

app.listen(PORT, ()=>{
    console.log(`API is Running on http://localhost:${PORT}`);
})