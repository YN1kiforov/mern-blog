import { useState, useRef } from "react"
import axios from "../axios"
import { useNavigate } from "react-router-dom";
import { logout, editUser } from "../redux/slices/auth"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../redux/store"
import * as React from 'react'
import { UserType } from "../types"

export const useAuthorBlock = (author: UserType) => {
	const currentUser = useSelector((state: RootState) => state.auth.currentUser)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const inputFileRef = useRef<HTMLInputElement>(null);

	const [avatarUrl, setAvatarUrl] = useState<string>("");
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [aboutInput, setAboutInput] = useState<string>("");
	const [nameInput, setNameInput] = useState<string>("");
	const [isSubscribed, setIsSubscribed] = useState<Boolean>(author.subscribersList ? author.subscribersList.includes(currentUser?._id || "") : false);
	async function editUserData() {
		try {
			if (!currentUser && aboutInput.length && nameInput) {
				return
			}
			await axios.patch(`/user`, { id: currentUser?._id, about: aboutInput, name: nameInput, avatarUrl })
			author.name = nameInput;
			author.about = aboutInput;
			author.avatarUrl = avatarUrl;
			dispatch(editUser({ avatarUrl }))
			setIsEditing(false)
		} catch (error) {
			console.log(error)
		}
	}
	function editHandler() {
		try {
			setAboutInput(author.about)
			setNameInput(author.name)
			setAvatarUrl(author.avatarUrl)
			setIsEditing(true)
		} catch (error) {
			console.log(error)
		}
	}
	async function subscribeUser() {
		try {
			if (currentUser) {
				await axios.post('/subscribe', { id: currentUser?._id, receiverId: author?._id })
				setIsSubscribed(true)
			}
		} catch (error) {
			console.log(error)
		}
	}
	async function unSubscribeUser() {
		try {
			if (currentUser) {
				await axios.post('/unsubscribe', { id: currentUser?._id, receiverId: author?._id })
				setIsSubscribed(false)
			}

		} catch (error) {
			console.log(error)
		}
	}

	const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const formData = new FormData();
			const file = event.target.files && event.target.files[0];
			file && formData.append('image', file);
			const { data } = await axios.post('/upload', formData);
			setAvatarUrl(data.url);
		} catch (err) {
			console.warn(err);
			alert('Ошибка при загрузке файла!');
		}
	};
	const deleteUser = async function () {
		try {
			await axios.delete(`/user?id=${currentUser?._id}`)
			navigate('/')
			dispatch(logout())
		} catch (error) {
			console.log(error)
		}
	}
	const isYou = author?._id === currentUser?._id
	return ({
		currentUser, inputFileRef, avatarUrl, setAvatarUrl, isEditing, setIsEditing,
		aboutInput, setAboutInput, nameInput, setNameInput, isSubscribed, setIsSubscribed,
		editUserData, editHandler, subscribeUser, unSubscribeUser, handleChangeFile, deleteUser, isYou
	})
}
