/** @format */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/ForgotPassword.module.css";
import { forgotPassword } from "./utils";

const ForgotPassword: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>("");
	const [userCode, setUserCode] = useState<string>("");
	const [code, setCode] = useState<string | null>(null);
	const [message, setMessage] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [sent, setSent] = useState(0);

	const handleSubmit = async (emailToUse?: string) => {
		setIsLoading(true);
		setMessage("");

		try {
			const data = await forgotPassword(emailToUse || email);

			if (typeof data === "string") {
				setCode(data);
				setSent(1);
				setMessage("Verification code sent successfully!");
			} else {
				setMessage(data?.message || "Failed to send verification code");
			}
		} catch (error) {
			console.error("Error in handleSubmit:", error);
			setMessage("An unexpected error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	const verifyCode = () => {
		if (!userCode.trim()) {
			setMessage("Please enter the verification code");
			return;
		}

		if (code === userCode) {
			localStorage.setItem("email", email);
			navigate("/forgot-password/change-password", { replace: true });
		} else {
			setMessage("Invalid verification code!");
		}
	};

	const resetForm = () => {
		setCode(null);
		setUserCode("");
		setMessage("");
		setEmail("");
		setSent(0);
	};

	return (
		<div className={styles.container}>
			{sent == 0 ? (
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}>
					<h1>Forgot Password</h1>
					<div className={styles.inputs}>
						<input
							type='email'
							name='email'
							required
							value={email}
							placeholder='Enter your email'
							onChange={(e) => setEmail(e.target.value)}
							disabled={isLoading}
						/>
						<button
							className={styles.button}
							type='submit'
							disabled={isLoading}>
							{isLoading ? "Sending..." : "Send Code"}
						</button>
					</div>

					{message && (
						<div className={`${styles.message} ${styles.errorMessage}`}>
							{message}
						</div>
					)}
				</form>
			) : (
				<div className={styles.form}>
					<h2>Verify Code</h2>
					<TimerComponent
						handleSubmit={handleSubmit}
						setCode={setCode}
						email={email}
						resetForm={resetForm}
					/>
					<div className={styles.verify_inputs}>
						<input
							type='text'
							placeholder='Enter verification code'
							required
							value={userCode}
							onChange={(e) => setUserCode(e.target.value)}
						/>
						<button className={styles.verifyButton} onClick={verifyCode}>
							Verify
						</button>
					</div>

					{message && <div className={`${styles.message}`}>{message}</div>}
				</div>
			)}
		</div>
	);
};

interface TimerComponentProps {
	handleSubmit: (email?: string) => Promise<void>;
	setCode: (code: string | null) => void;
	email: string;
	resetForm: () => void;
}

const TimerComponent: React.FC<TimerComponentProps> = ({
	handleSubmit,
	setCode,
	email,
	resetForm,
}) => {
	const [timer, setTimer] = useState<number>(60);
	const [isResending, setIsResending] = useState<boolean>(false);

	useEffect(() => {
		if (timer === 0) return;

		const intervalId = setInterval(() => {
			setTimer((prevTimer) => {
				if (prevTimer <= 1) {
					clearInterval(intervalId);
					setCode(null);
					return 0;
				}
				return prevTimer - 1;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [timer]);

	const handleResendCode = async () => {
		setIsResending(true);
		await handleSubmit(email);
		setTimer(60);
		setIsResending(false);
	};

	return (
		<div className={styles.timerContainer}>
			{timer !== 0 ? (
				<p className={styles.timer}>Codul expiră în: {timer} secunde</p>
			) : (
				<div className={styles.buttonsWrapper}>
					<button
						onClick={handleResendCode}
						className={styles.buttonPrimary}
						disabled={isResending}>
						{isResending ? "Sending..." : "Send again"}
					</button>
					<button onClick={resetForm} className={styles.buttonSecondary}>
						Restart
					</button>
				</div>
			)}
		</div>
	);
};

export default ForgotPassword;
