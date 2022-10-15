import "./FullPost.scss"
import Photo from "../../assets/random_photo.jpg"
import Comments_icon from "../../assets/comment_icon.png"
import Views_icon from "../../assets/views_icon.webp"
import AuthorBlock from "../../components/AuthorBlock/AuthorBlock"
import Comment from "../../components/Comment/Comment"
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../AuthContext"
import { Menu, MenuItem } from "../../components/Menu/Menu"
import axios from "../../axios"
import Editor from "../../components/Editor/MyEditor";
import { useNavigate } from "react-router-dom";
import { dataFormatter } from "../../dateFormatter"

const FullPost = () => {
	const { currentUser } = useContext(AuthContext)
	const location = useLocation()
	const postId = location.pathname.split('/')[2];
	const [isEditing, setIsEditing] = useState(false);
	const [post, setPost] = useState(null);
	const [commentValue, setCommentValue] = useState("");
	const [comments, setComments] = useState(null);
	const [body, setBody] = useState("");
	const [title, setTitle] = useState("");
	const isYourPost = currentUser?._id == post?.author._id
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const [posts, comments] = await Promise.all([
				axios.get(`/post?postId=${postId}`),
				axios.get(`/getComments?postId=${postId}`)
			]);
			setPost(posts.data.post)
			setBody(posts.data.post.body)
			setTitle(posts.data.post.title)
			setComments(comments.data.comments)
		})()

	}, [postId]);
	async function editPost() {
		try {
			await axios.patch(`/post`, { postId, title, body })
			setPost(prev => ({ ...prev, title, body }))
			setIsEditing(false)
		} catch (error) {
			console.log(error)
		}
	}
	async function deletePost() {
		try {
			await axios.delete(`/post?id=${postId}`)
			navigate('/posts')
		} catch (error) {
			console.log(error)
		}
	}
	async function deleteComment(id) {
		try {
			await axios.delete(`/post?id=${id}`)

		} catch (error) {
			console.log(error)

		}
	}
	async function editComment(id, body) {
		try {
			await axios.patch(`/comment`, { id, body })

		} catch (error) {
			console.log(error)
		}
	}

	async function sendComment() {
		try {
			if (commentValue) {
				let { data } = await axios.post("/comment", { postId, author: currentUser._id, body: commentValue })
				setComments((prev) => [data.comment, ...prev])
			}

		} catch (error) {
			console.log(error)
		}
	}
	return (
		<ul className="full-post">
			{post ? <div className=''>
				<li className="post">
					{isEditing
						? <>
							<Editor setBody={setBody} setTitle={setTitle} body={body} title={title} />
							<div className='post__buttons'>
								<button onClick={() => { setIsEditing(false) }} className=''>Отмена</button>
								<button onClick={editPost} className=''>Сохранить</button>
							</div>
						</>
						: <>
							{isYourPost ? <div className='post__options'>
								<Menu >
									<div className='post__options-icon'>
										<span></span>
									</div>
									<MenuItem>
										<button onClick={() => { setIsEditing(true) }} className='comment__edit-icon'>
											Редактировать
										</button>
									</MenuItem>
									<MenuItem>
										<button onClick={deletePost} className='comment__detele-icon'>
											Удалить
										</button>
									</MenuItem>
								</Menu>
							</div>: <></>}
							<img src={Photo} alt="" />
							<h2>{post.title}</h2>
							<ul className='post__info'>

								<li className="post__date">{dataFormatter(post.createdAt)}</li>
								<li className="post__comments">
									<img className="post__icon" src={Comments_icon} alt="" />
									{post.commentsCount}
								</li>
								<li className="post__views">
									<img className="post__icon" src={Views_icon} alt="" />
									{post.viewsCount}
								</li>
							</ul>
							<div className='full-post__content'>
								<div dangerouslySetInnerHTML={{ __html: post.body }} className="post__text" />
							</div>
						</>

					}
				</li>
				<li className='full-post__author'>
					<AuthorBlock author={post.author} />
				</li>
				<li className='full-post__comments comments'>
					<div className=''>
						<h4 htmlFor="Ваш коментарий">Напишите коментарий</h4>
						<textarea onChange={(e) => { setCommentValue(e.target.value) }} value={commentValue} name="" id="" cols="30" rows="10" placeholder="Напишите комментарий"></textarea>
						<button onClick={sendComment} className=''>Отправить</button>
					</div>
					{comments ? <ul className="comments__list">
						<h4>Коментарии</h4>
						{comments.map(comment => {
							return <li><Comment edit={editComment} delete={deleteComment} id={comment._id} body={comment.body} date={comment.createdAt} author={comment.author} /></li>
						})}
					</ul> : <div className=''>Коментарии не найдены</div>}
				</li>
			</div> : <div className=''>Статья не найдена</div>}

		</ul>

	);
}
export default FullPost;
