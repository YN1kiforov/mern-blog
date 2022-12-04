import "./FullPost.scss"
import Comments_icon from "../../assets/comment_icon.png"
import Views_icon from "../../assets/views_icon.webp"
import AuthorBlock from "../../components/AuthorBlock/AuthorBlock"
import Tag from "../../components/Tag/Tag"
import CommentsBlock from "../../components/CommentsBlock/CommentsBlock"
import MultipleSelect from "../../components/MultipleSelect/MultipleSelect"
import Button from "../../components/Button/Button"
import Loader from "../../components/Loader/Loader";
import React from 'react'
import { Menu, MenuItem } from "../../components/Menu/Menu"
import Editor from "../../components/Editor/MyEditor";
import { dataFormatter } from "../../dateFormatter"

import { useFullPost } from "../../hooks/useFullPost"
const FullPost = () => {
	const {
		tags, postId, isEditing, setIsEditing, post,
		optionSelected, setOptionSelected, body, setBody, title, setTitle,
		isLoading, isYourPost, editPost, deletePost,
	} = useFullPost()
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
									<img src={`${post.imageUrl}`} alt="" />
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
							<AuthorBlock options={false} author={post.author} />
						</li>
						<li className='full-post__comments'>
							<CommentsBlock postId={postId}></CommentsBlock>
						</li>
					</div> : <div className=''>Статья не найдена</div>
					}

				</ul>
			}
		</>

	);
}
export default FullPost;
