import axios from "./axios";
import { createContext, useEffect, useState } from "react";
import { useSnackbar } from 'notistack';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);
	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(currentUser));
	}, [currentUser]);

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const login = async (inputs) => {
		try {
			const res = await axios.post("/login", inputs);
			if (res.status == 200) {
				setCurrentUser(res.data.user);
			}
			enqueueSnackbar('Неверный логин или пароль', { autoHideDuration: 1000, variant: 'error', })

		} catch (error) {
			console.log(`error ${error}`)
			enqueueSnackbar('Неверный логин или пароль', { autoHideDuration: 1000, variant: 'error', })
		}
	};
	const register = async (inputs) => {
		try {
			const res = await axios.post("/register", inputs);
			if (res.status == 200) {
				setCurrentUser(res.data.user);
			}
			enqueueSnackbar('Неверный логин или пароль', { autoHideDuration: 1000, variant: 'error', })

		} catch (error) {
			console.log(`error ${error}`)
			enqueueSnackbar('Неверный логин или пароль', { autoHideDuration: 1000, variant: 'error', })
		}
	};
	const logout = () => {
		setCurrentUser(null);
	};

	return (
		<AuthContext.Provider value={{ currentUser, login, logout, register }}>
			{children}
		</AuthContext.Provider>
	);
};