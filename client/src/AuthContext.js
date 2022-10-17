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
	const tags = [
		{ value: "puteshestviya", label: "Путешествия", color: "rgb(177, 2, 177)" },
		{ value: "eda", label: "Еда", color: "orange" },
		{ value: "jizn", label: "Жизнь", color: "green" },
		{ value: "programmirovanie", label: "Программирование", color: "blue" },
		{ value: "zdorovie", label: "Здоровье", color: "rgb(218, 218, 13)" },
	]
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
		<AuthContext.Provider value={{ currentUser, login, logout, register, enqueueSnackbar, tags }}>
			{children}
		</AuthContext.Provider>
	);
};