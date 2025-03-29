/** @format */
import React, { useState } from "react";
import styles from "./styles/Login.module.css";
import image from "../../assets/login-image.jpg";
import { useNavigate } from "react-router-dom";
import { login } from "./utils";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState<"error" | "success" | "">(""); // Pentru tipul mesajului

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const serverResponse: any = await login(username, password);
			console.log(serverResponse);

			if (serverResponse.status === 401) {
				setMessage(serverResponse.message);
				setMessageType("error");
				setTimeout(() => {
					setMessage("");
					setMessageType("");
				}, 2000);
			} else if (serverResponse.status === 200) {
				setMessage("Login successful!");
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
			<div className={styles["info-wrapper"]}>
				<img src={image} alt='Login Illustration' />
				<h3>Interview</h3>
				<p>Made easy!</p>
			</div>

			<div className={styles.inputs}>
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
				<button type='submit' className={styles["button"]}>
					Login
				</button>
			</div>

			{/* Afișăm mesajul cu stiluri bazate pe tipul său */}
			{message && (
				<div className={`${styles["message"]} ${styles[messageType]}`}>
					{message}
				</div>
			)}

			<div className={styles["help-wrapper"]}>
				<a
					onClick={() => {
						navigate("/login/forgot-password");
					}}>
					Forgot password?
				</a>
				<span>or</span>
				<a
					onClick={() => {
						navigate("/sign-up");
					}}>
					Sign Up?
				</a>
			</div>
		</form>
	);
};

export default Login;
