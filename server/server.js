import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});