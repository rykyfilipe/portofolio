/** @format */
import React, { useState } from "react";
import styles from "./styles/Login.module.css";

import image from "../../assets/login-image.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Username:", username);
		console.log("Password:", password);

		navigate("/home");
	};

	return (
		<form onSubmit={handleSubmit}>
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
				<button type='submit'>Login</button>
			</div>

			<div className={styles["help-wrapper"]}>
				<a
					onClick={() => {
						navigate("/forgot-password");
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
