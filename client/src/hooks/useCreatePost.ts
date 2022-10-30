import { useState, useRef, useEffect } from "react";
import axios from "../axios"
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux'
import { RootState } from "../redux/store"
import * as React from 'react';
import { TagType } from "../types"

export const useCreatePost = () => {
	const { enqueueSnackbar } = useSnackbar();

	const currentUser = useSelector((state: RootState) => state.auth.currentUser)
	const tags = useSelector((state: RootState) => state.tags.tags)

	const [optionSelected, setOptionSelected] = useState<TagType[]>([]);
	const [body, setBody] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const navigate = useNavigate();
	const inputFileRef = useRef<HTMLInputElement>(null);
	
	useEffect(() => {
		if (!currentUser) {
			navigate('/login')
		}
	}, [currentUser, navigate]);

	const submitHandler = async () => {
		if (body && title && imageUrl) {
			const tags = optionSelected.map(item => item.value)
			await axios.post('/post', { title, author: currentUser?._id, body, imageUrl, tags })
			navigate("/")
		} else {
			console.log(body, title, imageUrl)
			enqueueSnackbar('Заполните все поля', { autoHideDuration: 1000, variant: 'error', })
		}
	}

	const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const formData = new FormData();
			const file = event.target.files && event.target.files[0];
			file && formData.append('image', file);
			const { data } = await axios.post('/upload', formData);
			setImageUrl(data.url);
		} catch (err) {
			console.warn(err);
			alert('Ошибка при загрузке файла!');
		}
	};
	return {
		currentUser,tags,optionSelected,setOptionSelected,body,setBody,title,
		setTitle,imageUrl,setImageUrl,inputFileRef,submitHandler,handleChangeFile,
	};
}
