/** @format */

export interface ChatMessage {
	id: string;
	text: string;
	sender: "user" | "ai";
	timestamp: string;
}

export const fetchAiResponse = async (message: string) => {
	try {
		const response = await fetch("http://localhost:3001/api/message", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message }),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching AI response:", error);
		return { message: "Sorry, something went wrong. Please try again." };
	}
};

export const startChat = async () => {
	try {
		const response = await fetch("http://localhost:3001/hello");

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching AI response:", error);
		return { message: "Sorry, something went wrong. Please try again." };
	}
};
