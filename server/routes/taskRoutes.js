import express from "express";
import Task from "../models/Task.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// ✅ CREATE TASK (Protected)
router.post("/", protect, async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        const task = new Task({
            title,
            description,
            status,
            dueDate,
            userId: req.user._id
        });

        const savedTask = await task.save();
        res.status(201).json(savedTask);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ✅ GET ALL TASKS (Protected)
router.get("/", protect, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ✅ GET SINGLE TASK (Protected)
router.get("/:id", protect, async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ✅ UPDATE TASK (Protected)
router.put("/:id", protect, async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            {
                title,
                description,
                status,
                dueDate
            },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ✅ DELETE TASK (Protected)
router.delete("/:id", protect, async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;