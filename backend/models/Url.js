// @author: Vijaya Bhaskar Velagana

/**
 * URL Shortener Database Model
 * 
 * This module defines the MongoDB schema and model for the URL Shortener application.
 * It manages URL documents including the original URL, shortened ID, and click analytics(how many times it was clicked).
 * 
 * @module models/Url
 * @requires mongoose
 */

import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: true
        },
        shortId: {
            type: String,
            required: true,
            unique: true
        },
        clicks: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

// Model for interacting with URL documents in MongoDB
const Url = mongoose.model("Url", urlSchema);

export default Url; 