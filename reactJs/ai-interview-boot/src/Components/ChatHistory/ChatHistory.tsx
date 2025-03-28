/** @format */

import React, { useRef, useEffect } from "react";
import ChatMessage from "./../ChatMessage/ChatMessage";
import { ChatMessage as ChatMessageType } from "./../utils";
import styles from "./ChatHistory.module.css";

interface ChatHistoryProps {
	messages: ChatMessageType[];
	isLoading: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading }) => {
	const chatContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div ref={chatContainerRef} className={styles["history-chat"]}>
			{messages.map((chat) => (
				<ChatMessage key={chat.id} text={chat.text} sender={chat.sender} />
			))}

			{isLoading && (
				<div className={styles["ai-chat"]}>
					<div className={styles["is-loading"]}>
						<div className={styles["loading-dot"]}></div>
						<div className={styles["loading-dot"]}></div>
						<div className={styles["loading-dot"]}></div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatHistory;
