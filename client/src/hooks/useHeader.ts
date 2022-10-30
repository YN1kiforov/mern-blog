import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import axios from "../axios"
import { logout } from "../redux/slices/auth"
import { RootState } from "../redux/store"
import { PostType } from "../types"

export const useHeader = function () {
	const currentUser = useSelector((state: RootState) => state.auth.currentUser)

	const [searchInput, setSearchInput] = useState<string>("");
	const [notifications, setNotifications] = useState<PostType[]>([]);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	function searchHandler() {
		if (!searchInput) {
			return
		}
		navigate(`/posts?search=${searchInput}`)
	}
	const logoutHandler = () => {
		dispatch(logout())
	}
	useEffect(() => {
		try {
			if (currentUser?._id) {
				(async () => {
					const { data } = await axios.get(`/user?id=${currentUser?._id}`)
					setNotifications(data?.user?.notificationsList)
				})()
			}
		} catch (error) {
			console.log(error)
		}
	}, [currentUser?._id]);
	return { currentUser, searchInput, setSearchInput, notifications, logoutHandler, searchHandler }
}
