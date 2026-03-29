// @author: Vijaya Bhaskar Velagana

import express from 'express';
import mongoose from 'mongoose';
import dotenv from  'dotenv';
// Importing CORS middleware to enable Cross-Origin Resource Sharing
// Middleware is a function that runs between request and response
// Client → Middleware → Middleware → Route → Response
import cors from 'cors'; 
import urlRoutes from './routes/url.js'; // Import URL routes

dotenv.config();

const app = express();

// Enable CORS middleware to allow cross-origin requests from the frontend
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow requests only from the specified frontend URL
    methods: ['GET', 'POST'] // Allow only GET and POST requests
})); 

// Parse incoming requests with JSON payloads
// Middleware to parse JSON bodies
app.use(express.json()); 

app.use("/", urlRoutes); // Use URL routes starting from the root path

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB connected");
    const PORT = process.env.PORT;
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error)=>{
    console.error("MongoDB connection error:", error);
});

