// @author: Vijaya Bhaskar Velagana

// Routes folder is used to define API endpoints (URLs) and connect them to logic

import express from "express";
import Url from "../models/Url.js";
import { nanoid } from "nanoid";

// nanoid is a named export, so we import it with curly braces
// If something is exported without default, it is a named export
// And you must use {} to import it

const router = express.Router(); // create router object to define routes

router.post("/shorten", async (req, res) => {
    try{
        const { originalUrl } = req.body; // Get the original URL from the request body

        // Validate the original URL
        if (!originalUrl) {
            return res.status(400).json({ error: "Invalid URL" });
        }

        try{
            // Check if the original URL is valid
            new URL(originalUrl); // This will throw an error if the URL is invalid
        }
        catch{
            return res.status(400).json({ error: "Invalid URL format" });
        }

        // Generate a unique short ID using nanoid
        let shortId;
        let shortIdExists = true; // assume it exists until we check
        while(shortIdExists){
            shortId = nanoid(8); // Generate an 8-character short ID
            shortIdExists = await Url.findOne({ shortId }); // returns null if not found, which is falsy, so loop will exit
        }

        // Create a new URL document in MongoDB
        const newUrl = new Url({
            originalUrl,
            shortId
        });
        await newUrl.save(); // Save the new URL document to MongoDB
        // Return the shortened URL to the client
        return res.json({ 
            shortId: shortId,
            shortUrl: `${process.env.BACKEND_URL}/${shortId}` 
        });

    }
    catch(error){
        console.error("Error shortening URL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:shortId", async (req, res) => {
    try{
        const { shortId } = req.params; // Get the short ID from the URL parameters -> destructuring assignment to extract shortId from req.params which is same as const shortId = req.params.shortId
        const url = await Url.findOne({ shortId }); // Find the URL document in MongoDB by short ID
        if (url) {
            url.clicks += 1; // Increment the click count
            await url.save(); // Save the updated URL document to MongoDB
            return res.redirect(url.originalUrl); // Redirect the user to the original URL
        } else {
            return res.status(404).json({ error: "URL not found" });
        }
    }
    catch(error){
        console.error("Error redirecting to original URL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router; // Export the router to be used in server.js