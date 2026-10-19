
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
// import { clerkMiddleware } from '@clerk/express'

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => {
    res.send("API is working afroz");
});

export default app;
