import "./FullPost.scss"
import Comments_icon from "../../assets/comment_icon.png"
import Views_icon from "../../assets/views_icon.webp"
import AuthorBlock from "../../components/AuthorBlock/AuthorBlock"
import Tag from "../../components/Tag/Tag"
import CommentsBlock from "../../components/CommentsBlock/CommentsBlock"
import MultipleSelect from "../../components/MultipleSelect/MultipleSelect"
import Button from "../../components/Button/Button"
import Loader from "../../components/Loader/Loader";


import { useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../AuthContext"
import { Menu, MenuItem } from "../../components/Menu/Menu"
import axios from "../../axios"
import Editor from "../../components/Editor/MyEditor";
import { useNavigate } from "react-router-dom";
import { dataFormatter } from "../../dateFormatter"

const FullPost = () => {
	const { currentUser, tags } = useContext(AuthContext)
	const location = useLocation()
	const postId = location.pathname.split('/')[2];
	const [isEditing, setIsEditing] = useState(false);
	const [post, setPost] = useState(null);
	const [optionSelected, setOptionSelected] = useState([]);
	const [body, setBody] = useState("");
	const [title, setTitle] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const isYourPost = currentUser?._id === post?.author?._id
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(`/post?postId=${postId}`);
			setPost(data?.post)
			setBody(data?.post?.body)
			setTitle(data?.post?.title)
			setIsLoading(false)
			const options = data?.post?.tags.map(tag => {
				for (let i = 0; i < tags.length; i++) {
					if (tag === tags[i].value)
						return tags[i]
				}
				return null
			})
			setOptionSelected(options)
		})()
	}, [postId, tags]);
	async function editPost() {
		try {
			const options = optionSelected?.map(tag => tag.value)
			await axios.patch(`/post`, { postId, title, body, tags: options })
			setPost(prev => ({ ...prev, title, body, tags: options }))
			setIsEditing(false)
		} catch (error) {
			console.log(error)
		}
	}
	async function deletePost() {
		try {
			await axios.delete(`/post?id=${postId}&authorId=${currentUser._id}`)
			navigate('/posts')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			{isLoading
				? <Loader />
				: <ul className="full-post">
					{post ? <div className=''>
						<li className="post">
							{isEditing
								? <>
									<Editor setBody={setBody} setTitle={setTitle} body={body} title={title} />
									<MultipleSelect setOptionSelected={setOptionSelected} optionSelected={optionSelected} options={tags}></MultipleSelect>
									<div className='post__buttons'>
										<Button variant="cancel" onClick={() => { setIsEditing(false) }} className=''>Отмена</Button>
										<Button variant="save" onClick={editPost} className=''>Сохранить</Button>
									</div>
								</>
								: <>
									{isYourPost ? <div className='post__options'>
										<Menu >
											<div className='post__options-icon'>
												<span></span>
											</div>
											<MenuItem onClick={() => { setIsEditing(true) }}>Редактировать</MenuItem>
											<MenuItem onClick={deletePost}>Удалить</MenuItem>
										</Menu>
									</div> : <></>}
									<img src={`https://infinite-tundra-41570.herokuapp.com${post.imageUrl}`} alt="" />
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
										<div dangerouslySetInnerHTML={{ __html: post?.body }} className="post__text" />
									</div>
									<ul className='full-post__tags'>
										{post.tags && post.tags.map((tag, index) => {
											for (let i = 0; i < tags.length; i++) {
												if (tag === tags[i].value)
													return <Tag key={`${tag}_${index}`} color={tags[i].color} name={tags[i].label} link={tags[i].value} ></Tag>
											}
											return null
										})}
									</ul>
								</>
							}
						</li>
						<li>
							<AuthorBlock author={post.author} />
						</li>
						<li className='full-post__comments'>
							<CommentsBlock currentUser={currentUser} postId={postId}></CommentsBlock>
						</li>
					</div> : <div className=''>Статья не найдена</div>
					}

				</ul>
			}
		</>

	);
}
export default FullPost;
