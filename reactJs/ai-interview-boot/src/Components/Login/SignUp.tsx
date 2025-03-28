/** @format */
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { signUp } from "./utils";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [validator, setValidator] = useState("");
	const navigate = useNavigate();
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState<"error" | "success" | "">(""); // Pentru tipul mesajului
	const inputValidator = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputValidator.current) {
			if (password !== validator) {
				inputValidator.current.style.boxShadow = "0 0 5px red";
			} else {
				inputValidator.current.style.boxShadow = "";
			}
		}
	}, [validator, password]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const serverResponse: any = await signUp(username, password, email);
			console.log(serverResponse);

			if (serverResponse.status === 401) {
				setMessage(serverResponse.message);
				setMessageType("error");
				setTimeout(() => {
					setMessage("");
					setMessageType("");
				}, 2000);
			} else if (serverResponse.status === 201) {
				setMessage("Account created successfully!");
				setMessageType("success");
				setTimeout(() => {
					setMessage("");
					setMessageType("");
					navigate("/home", { replace: true });
				}, 2000);
			} else {
				setMessage(`Unexpected response status: ${serverResponse.status}`);
				setMessageType("error");
			}
		} catch (error: any) {
			setMessage(`Unexpected error occurred: ${error.message}`);
			setMessageType("error");
			console.error("Error:", error);
		}
	};
	return (
		<form onSubmit={handleSubmit} className={styles["form"]}>
			<h1 className={styles["title"]}>Sign Up</h1>

			<div className={styles.inputs}>
				<label>
					<input
						type='email'
						name='username'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder='email'
					/>
				</label>
				<label>
					<input
						type='text'
						name='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						placeholder='username'
					/>
				</label>
				<label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder='password'
					/>
				</label>

				<label>
					<input
						type='password'
						name='consfirm-password'
						value={validator}
						onChange={(e) => setValidator(e.target.value)}
						required
						placeholder='confirm-password'
						ref={inputValidator}
					/>
				</label>

				<button type='submit' className={styles["button"]}>
					Create Account
				</button>
			</div>

			{/* Afișăm mesajul cu stiluri bazate pe tipul său */}
			{message && (
				<div className={`${styles["message"]} ${styles[messageType]}`}>
					{message}
				</div>
			)}
		</form>
	);
};

export default SignUp;
