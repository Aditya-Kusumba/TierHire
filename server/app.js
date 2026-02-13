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

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  }

  // If preflight, return immediately
  if (req.method === 'OPTIONS') return res.sendStatus(204);

  next();
});



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
