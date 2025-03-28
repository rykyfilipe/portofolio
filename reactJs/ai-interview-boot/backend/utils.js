/** @format */

const conversationHistory = []; // Menține istoricul conversației
const MAX_HISTORY = 10; // Limităm istoricul pentru performanță

export const askAi = async (userMessage) => {
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
