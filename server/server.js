// server/server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import nbaRoutes from "./routes/nbaRoutes.js";

dotenv.config(); 
console.log("API KEY:", process.env.BALLDONTLIE_API_KEY);


const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use("/api", nbaRoutes);

// --- Basic Test Route  ---

app.get('/', (req, res) => {
    res.status(200).send('GM Mode API Is running...');
});


// --- Connect to MongoDB  ---

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    })
    .catch((err) => console.log(err));

