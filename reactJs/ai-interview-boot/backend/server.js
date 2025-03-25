/** @format */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const apiKey = 'AIzaSyAQDuPur9WK9B-LHI7xrhdWwC8kxDXWNkA';
// Middleware
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type"],
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handlers
app.get("/api/hello", (req, res) => {
	res.json({ message: "Server is running successfully!" });
});

// Message handling endpoint
app.post("/api/message", (req, res) => {
	const { message } = req.body;

	// Input validation
	if (!message || typeof message !== "string") {
		return res.status(400).json({
			error: "Invalid message. Message is required and must be a string.",
		});
	}

	const processedMessage = `${message.trim()}`;

	// Simulate some AI response logic
	res.status(200).json({
		message: processedMessage,
		timestamp: new Date().toISOString(),
	});
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		error: "Something went wrong!",
		details: err.message,
	});
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

const server = app.listen(PORT, () => {
	console.log(`✅ Express Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
	console.log("SIGTERM signal received: closing HTTP server");
	server.close(() => {
		console.log("HTTP server closed");
	});
});

export default app;
