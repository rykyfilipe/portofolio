/** @format */

import React from "react";
import styles from "./ChatForm.module.css";
import sendIcon from "../../assets/send-icon.svg";

interface ChatFormProps {
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isLoading: boolean;
}

const ChatForm: React.FC<ChatFormProps> = ({
	message,
	setMessage,
	handleSubmit,
	isLoading,
}) => {
	return (
		<form className={styles["chat-form"]} onSubmit={handleSubmit}>
			<div className={styles["input"]}>
				<input
					type='text'
					className={styles["input-bar"]}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
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
	);
};

export default ChatForm;
