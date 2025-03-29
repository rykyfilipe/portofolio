/** @format */

import { useState, useRef, useEffect } from "react";
import styles from "./styles/SignUp.module.css";
import { getUser, loadResurces, changePassword } from "./utils";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
	const [password, setPassword] = useState("");
	const [validator, setValidator] = useState("");
	const inputValidator = useRef<HTMLInputElement>(null);
	let email: string;
	const navigate = useNavigate();

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
		if (password != validator) {
			return;
		}
		const data = loadResurces();
		if (data) email = data;

		try {
			const user = await getUser(email);

			if (!user) {
				throw "Fetching error!";
			} else {
				const username = user.username;
				const res = await changePassword(password, username);
				if (res) {
					setPassword("");
					setValidator("");
					navigate("/login", { replace: true });
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<h1>Change Password</h1>
			<div className={styles.inputs}>
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
					Change
				</button>
			</div>
		</form>
	);
};

export default ChangePassword;
