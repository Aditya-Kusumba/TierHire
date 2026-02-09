import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pg from "pg";

import userRoutes from "./routes/user.routes.js";
import examRoutes from "./routes/exam.routes.js";
import tierRoutes from "./routes/tier.routes.js";
import contestRoutes from "./routes/contest.routes.js";
import recruiterRoutes from "./routes/recruiter.routes.js";
import domainRoutes from "./routes/domain.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

// Configure CORS to handle multiple origins
const allowedOrigins = process.env.CORS_ORIGIN.split(',').map(origin => origin.trim());

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());
app.use(express.static('public'));



app.use("/api/users", userRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/tiers", tierRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/recruiters", recruiterRoutes);
app.use("/api/domains", domainRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/problems", problemRoutes);

const { Pool } = pg;
if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL not found in .env");
    process.exit(1);
}

export { app };
