// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const storedUser = localStorage.getItem("user");
	const initialUser = storedUser ? JSON.parse(storedUser) : null;
	const [user, setUser] = useState(initialUser);

	const login = (id, firstName, lastName, email, token) => {
		setUser({ id, firstName, lastName, email, token });
		localStorage.setItem(
			"user",
			JSON.stringify({ id, firstName, lastName, email, token })
		);
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	useEffect(() => {
		console.log("AuthContext Updated:", user);
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
