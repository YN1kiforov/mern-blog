
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { useEffect, useState, } from "react"
import axios from "../axios"
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store"
import { TagType, PostType } from "../types"

export const useFullPost = () => {
	const currentUser = useSelector((state: RootState) => state.auth.currentUser)
	const tags = useSelector((state: RootState) => state.tags.tags)

	const location = useLocation()
	const postId = location.pathname.split('/')[2];
	const navigate = useNavigate();

	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [post, setPost] = useState<PostType | null>(null);
	const [optionSelected, setOptionSelected] = useState<TagType[]>([]);
	const [body, setBody] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const isYourPost: boolean = currentUser?._id === post?.author?._id

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(`/post?postId=${postId}`);
			let post: PostType = data?.post
			setPost(post)
			setBody(post.body)
			setTitle(post.title)
			setIsLoading(false)
			const options: TagType[] = []
			post.tags.forEach(tag => {
				for (let i = 0; i < tags.length; i++) {
					if (tag === tags[i].value)
						options.push(tags[i])
				}
			})
			setOptionSelected(options)
		})()
	}, [postId, tags]);
	async function editPost() {
		try {
			if (!post) return
			const options = optionSelected?.map(tag => tag.value)
			await axios.patch(`/post`, { postId, title, body, tags: options })
			setPost(() => ({ ...post, title, body }))
			setIsEditing(false)
		} catch (error) {
			console.log(error)
		}
	}
	async function deletePost() {
		try {
			await axios.delete(`/post?id=${postId}&authorId=${currentUser?._id}`)
			navigate('/posts')
		} catch (error) {
			console.log(error)
		}
	}
	return {
		tags, postId, isEditing, setIsEditing, post,
		optionSelected, setOptionSelected, body, setBody, title, setTitle,
		isLoading, isYourPost, editPost, deletePost,
	}
}
