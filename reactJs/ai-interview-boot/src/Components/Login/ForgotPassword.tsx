/** @format */

import { useState } from "react";
import styles from "./styles/ForgotPassword.module.css";
import { forgotPassword } from "./utils";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		let response;

		try {
			response = await forgotPassword(email);

			console.log("Response from forgotPassword:", response);

			if (response) {
				setEmail("");
				alert("Verification code sent successfully!");
			} else {
				console.error("Unknown error");
			}
		} catch (error) {
			console.error("Error in handleSubmit:", error);
			alert("An unexpected error occurred");
		}

		console.log("Final response:", response);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<h1>Forgot Password</h1>
			<div className={styles.inputs}>
				<input
					type='email'
					name='email'
					required
					value={email}
					placeholder='email'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button className={styles.button} onSubmit={handleSubmit}>
					Sent
				</button>
			</div>
		</form>
	);
};

export default ForgotPassword;
