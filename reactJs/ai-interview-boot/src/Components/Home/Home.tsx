/** @format */
import React, { useState, useRef, FormEvent, useEffect } from "react";
import styles from "./Home.module.css";
import sendIcon from "../../assets/send-icon.svg";

interface ChatMessage {
	text: string;
	sender: "user" | "ai";
	timestamp?: string;
}

const Home: React.FC = () => {
	const [message, setMessage] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

	const inputRef = useRef<HTMLInputElement>(null);
	const chatContainerRef = useRef<HTMLDivElement>(null);

	// Efectul pentru scroll automat
	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [chatMessages]); // Rulează de fiecare dată când se schimbă mesajele

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const trimmedMessage = message.trim();
		if (!trimmedMessage) return;

		setMessage("");
		setIsLoading(true);

		try {
			const userMessage: ChatMessage = {
				text: trimmedMessage,
				sender: "user",
				timestamp: new Date().toISOString(),
			};

			// Add user message first
			setChatMessages((prev) => [...prev, userMessage]);

			const response = await fetch("http://localhost:3001/api/message", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message: trimmedMessage }),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();

			const aiMessage: ChatMessage = {
				text: data.message,
				sender: "ai",
				timestamp: data.timestamp,
			};

			// Add AI response
			setChatMessages((prev) => [...prev, aiMessage]);
		} catch (error) {
			console.error("Error fetching AI response:", error);

			const errorMessage: ChatMessage = {
				text: "Sorry, something went wrong. Please try again.",
				sender: "ai",
			};

			// Add error message
			setChatMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
			inputRef.current?.focus();
		}
	};

	return (
		<div className={styles["chat-container"]}>
			<h1>AI Chat Assistant</h1>

			{/* Adaugă ref și stil pentru scroll */}
			<div
				ref={chatContainerRef}
				className={styles["history-chat"]}
				style={{
					overflowY: "auto",
					maxHeight: "400px",
				}}>
				{chatMessages.map((chat, index) => (
					<div
						key={index}
						className={
							chat.sender === "user" ? styles["user-chat"] : styles["ai-chat"]
						}>
						<div className={styles["message"]}>
							<strong>{chat.sender === "user" ? "You:" : "AI:"}</strong>{" "}
							{chat.text}
						</div>
					</div>
				))}
			</div>

			<form className={styles["chat-form"]} onSubmit={handleSubmit}>
				<div className={styles["input"]}>
					<input
						type='text'
						className={styles["input-bar"]}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						ref={inputRef}
						placeholder='Type your message...'
						disabled={isLoading}
					/>
					<button
						className={styles["input-button"]}
						type='submit'
						disabled={isLoading || !message.trim()}>
						<img src={sendIcon} alt='Send' />
					</button>
				</div>
			</form>
		</div>
	);
};

export default Home;
