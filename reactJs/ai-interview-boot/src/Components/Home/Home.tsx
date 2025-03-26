/** @format */

import React, { useState, useEffect, useRef, FormEvent } from "react";
import styles from "./Home.module.css";
import sendIcon from "../../assets/send-icon.svg";
import { fetchAiResponse, ChatMessage, startChat } from "./utils"; // Importăm funcțiile de utilitate
import { v4 as uuidv4 } from "uuid"; // Importăm uuid pentru a genera chei unice

const Home: React.FC = () => {
	const [message, setMessage] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const chatContainerRef = useRef<HTMLDivElement>(null);

	let go = true;

	// Efect pentru a trimite mesajul inițial de la AI doar o dată
	useEffect(() => {
		const fetchData = async () => {
			// Asigură-te că mesajul inițial de la AI este trimis doar o dată
			const data = await startChat();
			if (go) {
				setChatMessages((prev) => [
					...prev,
					{
						id: uuidv4(), // Folosește un ID unic pentru fiecare mesaj
						text: data.message,
						sender: "ai",
						timestamp: new Date().toISOString(),
					},
				]);
				go = false;
			}
		};

		fetchData(); // Se va executa doar când chatMessages este gol
	}, []); // Depinde de chatMessages, dar se va executa doar când este gol

	// Funcția pentru trimiterea mesajului
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const trimmedMessage = message.trim();
		if (!trimmedMessage) return;

		setMessage("");
		setIsLoading(true);

		// Mesajul utilizatorului
		const userMessage: ChatMessage = {
			id: uuidv4(), // Folosește un ID unic pentru fiecare mesaj
			text: trimmedMessage,
			sender: "user",
			timestamp: new Date().toISOString(),
		};

		setChatMessages((prev) => [...prev, userMessage]);

		try {
			// Răspunsul de la AI pentru mesajul utilizatorului
			const data = await fetchAiResponse(trimmedMessage);

			const aiMessage: ChatMessage = {
				id: uuidv4(), // Folosește un ID unic pentru fiecare mesaj
				text: data.message,
				sender: "ai",
				timestamp: new Date().toISOString(),
			};

			// Adăugăm răspunsul de la AI
			setChatMessages((prev) => [...prev, aiMessage]);
		} catch (error) {
			const errorMessage: ChatMessage = {
				id: uuidv4(), // Folosește un ID unic pentru fiecare mesaj
				text: "Sorry, something went wrong. Please try again.",
				sender: "ai",
				timestamp: new Date().toISOString(),
			};

			// Adaugă mesaj de eroare
			setChatMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
			inputRef.current?.focus();
		}
	};

	// Efect pentru scroll automat
	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [chatMessages]);

	return (
		<div className={styles["chat-container"]}>
			<h1>AI interviewer</h1>

			<div
				ref={chatContainerRef}
				className={styles["history-chat"]}
				style={{ overflowY: "auto", maxHeight: "400px" }}>
				{chatMessages.map((chat) => (
					<div
						key={chat.id}
						className={
							chat.sender === "user" ? styles["user-chat"] : styles["ai-chat"]
						}>
						<div className={styles["message"]}>{chat.text}</div>
					</div>
				))}

				{isLoading && (
					<div className={styles["ai-chat"]}>
						<div className={styles["message"]}>
							<strong>AI:</strong>
							<div className={styles["is-loading"]}>
								<div className={styles["loading-dot"]}></div>
								<div className={styles["loading-dot"]}></div>
								<div className={styles["loading-dot"]}></div>
							</div>
						</div>
					</div>
				)}
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
