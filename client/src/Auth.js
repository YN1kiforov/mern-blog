import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);

	const login = async (inputs) => {
		const res = await axios.post("/login", inputs);
		setCurrentUser(res.data);
	};
	const register = async (inputs) => {
		const res = await axios.post("/register", inputs);
		setCurrentUser(res.data);
	};
	const logout = () => {
		setCurrentUser(null);
	};

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(currentUser));
	}, [currentUser]);

	return (
		<AuthContext.Provider value={{ currentUser, login, logout, register }}>
			{children}
		</AuthContext.Provider>
	);
};