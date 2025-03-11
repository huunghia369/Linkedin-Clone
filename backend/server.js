import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import authRoutes from "./routes/auth.route.js";
import connectionRoutes from "./routes/connection.route.js";
import notificationRoutes from "./routes/notification.route.js";
import postRoutes from "./routes/post.route.js";
import userRoutes from "./routes/user.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.use(express.json({ limit: "5mb" })); // parse JSON request bodies
app.use(cookieParser()); // parse cookies

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
}); 
