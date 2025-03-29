/** @format */
export function authenticateUser(user: string, password: string): string {
	var token = user + ":" + password;
	var hash = btoa(token);
	return "Basic " + hash;
}

export async function login(username: string, password: string) {
	try {
		const res = await fetch("http://localhost:3001/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: authenticateUser(username, password),
			},
			body: JSON.stringify({ username }),
		});

		console.log("Status code:", res.status);

		// Dacă răspunsul nu este OK, tratează-l corespunzător
		if (!res.ok) {
			if (res.status === 401) {
				return { status: 401, message: "Wrong username or password" };
			}
			throw new Error(`Request failed with status ${res.status}`);
		}

		// Folosește res.text() pentru a obține răspunsul ca text
		const data = await res.text();
		console.log("Response data:", data);

		// Returnează statusul și mesajul (nu mai încerca să parsezi ca JSON)
		return { status: res.status, message: data };
	} catch (error) {
		console.error("Unexpected error:", error);
		throw error;
	}
}

export async function signUp(
	username: string,
	password: string,
	email: string,
) {
	try {
		const res = await fetch("http://localhost:3001/user/sign-up", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: authenticateUser(username, password),
			},
			body: JSON.stringify({ username, email }),
		});

		console.log("Status code:", res.status);

		// În loc de res.json(), folosește res.text() pentru a obține răspunsul ca text
		const data = await res.text();
		console.log("Response data:", data);

		// Verifică dacă răspunsul nu este 200 OK
		if (!res.ok) {
			if (res.status === 401) {
				return { status: 401, message: data }; // Folosește mesajul din răspunsul serverului
			}
			throw new Error(`Request failed with status ${res.status}`);
		}

		// Dacă răspunsul este OK, returnează statusul și mesajul de succes
		return { status: res.status, message: data }; // Serverul trimite mesaj text
	} catch (error) {
		console.error("Unexpected error:", error);
		throw error;
	}
}

export async function forgotPassword(email: string) {
	try {
		const res = await fetch("http://localhost:3001/forgot-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		console.log("Status code:", res.status);

		if (!res.ok) {
			if (res.status === 400) {
				return { status: 400, message: "Email is required!" };
			}
			if (res.status === 500) {
				return { status: 500, message: "Server error!" };
			}
			throw new Error(`Request failed with status ${res.status}`);
		}

		const data = await res.text();
		return data;
	} catch (error) {
		console.error("Unexpected error:", error);
		throw error;
	}
}

export const changePassword = async (newPassword: string, username: string) => {
	try {
		const res = await fetch(
			"http://localhost:3001/forgot-password/change-password",
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: authenticateUser(username, newPassword),
				},
				body: JSON.stringify({ username }),
			},
		);

		if (!res.ok) {
			throw console.error(res);
		} else {
			const data = await res.text();
			return data;
		}
	} catch (error) {
		console.log(error);
	}
};

export const getUser = async (email: string) => {
	try {
		const res = await fetch("http://localhost:3001/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		if (!res.ok) {
			throw "Get user error";
		} else {
			const data = await res.json();
			return data;
		}
	} catch (error) {
		console.log(error);
	}
};

export const loadResurces = () => {
	const data = localStorage.getItem("email");
	if (data) return data;

	return;
};
