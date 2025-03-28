/** @format */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const conversationHistory = []; // Menține istoricul conversației
const MAX_HISTORY = 10; // Limităm istoricul pentru performanță

const users = [];

// Middleware
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
		methods: ["GET", "POST"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Funcție asincronă pentru a obține răspunsul de la Gemini
const askAi = async (userMessage) => {
	const apiKey = "AIzaSyAQDuPur9WK9B-LHI7xrhdWwC8kxDXWNkA"; // API Key din .env
	const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

	// Adăugăm mesajul utilizatorului la context
	conversationHistory.push({ role: "user", text: userMessage });

	// Limităm dimensiunea contextului
	if (conversationHistory.length > MAX_HISTORY) {
		conversationHistory.shift(); // Șterge primul mesaj pentru a menține dimensiunea
	}

	// Construim payload-ul cu context
	const requestBody = {
		contents: conversationHistory.map(({ role, text }) => ({
			role,
			parts: [{ text }],
		})),
	};

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		});

		// Afișăm răspunsul complet pentru diagnosticare
		const responseText = await response.text();

		if (!response.ok) {
			throw new Error(
				`Network response was not ok. Status: ${response.status}. Body: ${responseText}`,
			);
		}

		const responseData = JSON.parse(responseText);

		const aiResponse =
			responseData.candidates[0]?.content?.parts[0]?.text ||
			"Scuze, nu am putut genera un răspuns.";

		// Adăugăm răspunsul AI la context
		conversationHistory.push({ role: "model", text: aiResponse });

		return aiResponse;
	} catch (error) {
		console.error("Detailed Error:", error);
		return "A apărut o eroare la generarea răspunsului.";
	}
};

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "b.ryky.filipe@gmail.com",
		pass: "plpi kfuq ccgh uabz",
	},
});

async function sendEmail(to, subject, message) {
	await transporter.sendMail({
		from: "b.ryky.filipe@gmail.com",
		to: to,
		subject: subject,
		text: message,
	});
}

// Route handlers
app.get("/hello", async (req, res) => {
	try {
		const aiResponse =
			await askAi(`Comportă-te ca un angajator sau interviewer, cere utilizatorului un domeniu in care sa 
				ii iei interview-ul, pune intrebari pe rand exact
				ca la un interview in domeniul care il alege utilizatorul,
				asteapta raspunsul, la final spune daca este sau nu angajat,
				foloseste răspunsuri clare și precise.`);
		res.status(200).json({
			message: aiResponse,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({
			error: "Eroare la generarea răspunsului AI",
			details: error instanceof Error ? error.message : "Eroare necunoscută",
		});
	}
});

// Message handling endpoint
app.post("/api/message", async (req, res) => {
	const { message } = req.body;

	// Input validation
	if (!message || typeof message !== "string") {
		return res.status(400).json({
			error: "Invalid message. Message is required and must be a string.",
		});
	}

	try {
		const aiResponse = await askAi(message);
		res.status(200).json({
			message: aiResponse,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).json({
			error: "Eroare la generarea răspunsului AI",
			details: error instanceof Error ? error.message : "Eroare necunoscută",
		});
	}
});
app.post("/user/login", (req, res) => {
	const authorization = req.headers.authorization;
	if (!authorization) {
		return res.status(400).send("Authorization header missing");
	}

	const encodedCredentials = authorization.split(" ")[1];

	const username = req.body.username;
	if (!username) {
		return res.status(400).send("Username is required");
	}

	const validateUser = users.find(
		(user) => user.username == username && user.password == encodedCredentials,
	);

	if (validateUser) {
		res.status(200).send("Login successful");
	} else {
		res.status(401).send("Account not found");
	}
});

app.get("/users", (req, res) => {
	res.json(users);
});

app.post("/user/sign-up", (req, res) => {
	console.log(users);

	const authorization = req.headers.authorization;
	if (!authorization) {
		return res.status(400).send("Authorization header missing");
	}

	const encodedCredentials = authorization.split(" ")[1];

	const { username, email } = req.body;
	if (!username) {
		return res.status(400).send("Username is required");
	}

	if (!email) {
		return res.status(400).send("Email is required");
	}
	const validateUser = users.find(
		(user) => user.username == username && user.email == email,
	);

	if (!validateUser) {
		users.push({ email, username, password: encodedCredentials });
		res.status(201).send("User registered successfully");
	} else {
		res.status(401).send("Username already used!");
	}
});

app.post("/forgot-password", (req, res) => {
	const { email } = req.body;
	if (!email) {
		return res.status(400).json({ error: "Email is required" });
	}

	const code = Math.floor(100000 + Math.random() * 900000);

	sendEmail(
		email,
		"Password Reset Code",
		`Hello, 

		You have requested to reset your password. 
		
		Your verification code is: **${code}** 
		
		Please enter this code in the required field to proceed with resetting your password. 
		
		If you did not request this change, please ignore this email.
		
		Best regards,  
		Your Company Team`,
	)
		.then(() => {
			res.status(200).json(code);
		})
		.catch((err) => {
			console.error("Error sending email:", err);
			res.status(500).json({ error: "Failed to send verification code" });
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

process.on("SIGTERM", () => {
	console.log("SIGTERM signal received: closing HTTP server");
	server.close(() => {
		console.log("HTTP server closed");
	});
});

export default app;
