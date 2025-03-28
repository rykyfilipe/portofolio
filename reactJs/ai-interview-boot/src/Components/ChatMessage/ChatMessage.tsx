/** @format */

import React from "react";
import styles from "./ChatMessage.module.css";

interface ChatMessageProps {
	text: string;
	sender: "user" | "ai";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender }) => {
	return (
		<div
			className={sender === "user" ? styles["user-chat"] : styles["ai-chat"]}>
			<div className={styles["message"]}>{text}</div>
		</div>
	);
};

export default ChatMessage;
