import axios from "../axios"
import { useEffect, useState } from "react"
import { RootState } from "../redux/store"
import { CommentType } from "../types"
import { useSelector } from 'react-redux'


export const useCommentsBlock = (postId: string) => {
	const currentUser = useSelector((state: RootState) => state.auth.currentUser)
	const [commentValue, setCommentValue] = useState<string>("");
	const [comments, setComments] = useState<CommentType[]>([]);

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(`/getComments?postId=${postId}`)
			setComments(data.comments)
		})()
	}, [postId]);

	async function sendComment() {
		try {
			if (commentValue) {
				if (!currentUser) return
				let { data } = await axios.post("/comment", { postId: postId, author: currentUser._id, body: commentValue })
				setComments((prev) => [data.comment, ...prev])
				setCommentValue("")
			}
		} catch (error) {
			console.log(error)
		}
	}

	async function editComment(id: string, body: string) {
		try {
			await axios.patch(`/comment`, { id, body })
		} catch (error) {
			console.log(error)
		}
	}

	async function deleteComment(id: string) {
		try {
			await axios.delete(`/comment?id=${id}`)
			setComments(prev => prev.filter(com => com._id !== id))
		} catch (error) {
			console.log(error)
		}
	}
	return {
		currentUser, commentValue, setCommentValue, comments,
		sendComment, editComment, deleteComment
	}
}
