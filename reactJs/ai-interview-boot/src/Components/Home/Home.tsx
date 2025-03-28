/** @format */

import React, { useState, useEffect, FormEvent } from "react";
import styles from "./Home.module.css";
import { fetchAiResponse, ChatMessage, startChat } from "../utils";
import { v4 as uuidv4 } from "uuid";
import ChatHistory from "./../ChatHistory/ChatHistory";
import ChatForm from "./../ChatForm/ChatForm";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
	const [message, setMessage] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
	const navigate = useNavigate();
	let go = true;
	navigate("/", { replace: true });

	useEffect(() => {
		const fetchData = async () => {
			const data = await startChat();
			if (go) {
				setChatMessages((prev) => [
					...prev,
					{
						id: uuidv4(),
						text: data.message,
						sender: "ai",
						timestamp: new Date().toISOString(),
					},
				]);
				go = false;
			}
		};

		fetchData();
	}, []);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const trimmedMessage = message.trim();
		if (!trimmedMessage) return;

		setMessage("");
		setIsLoading(true);

		const userMessage: ChatMessage = {
			id: uuidv4(),
			text: trimmedMessage,
			sender: "user",
			timestamp: new Date().toISOString(),
		};

		setChatMessages((prev) => [...prev, userMessage]);

		try {
			const data = await fetchAiResponse(trimmedMessage);

			const aiMessage: ChatMessage = {
				id: uuidv4(),
				text: data.message,
				sender: "ai",
				timestamp: new Date().toISOString(),
			};

			setChatMessages((prev) => [...prev, aiMessage]);
		} catch (error) {
			const errorMessage: ChatMessage = {
				id: uuidv4(),
				text: "Sorry, something went wrong. Please try again.",
				sender: "ai",
				timestamp: new Date().toISOString(),
			};

			setChatMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles["chat-container"]}>
			<h1>AI interviewer</h1>
			<ChatHistory messages={chatMessages} isLoading={isLoading} />
			<ChatForm
				message={message}
				setMessage={setMessage}
				handleSubmit={handleSubmit}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default Home;
