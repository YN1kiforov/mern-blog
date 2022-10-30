import "./Post.scss"
import Button from "../../components/Button/Button"
import Comments_icon from "../../assets/comment_icon.png"
import Views_icon from "../../assets/views_icon.webp"
import Avatar from "../../assets/avatar_icon.png"
import { Link } from "react-router-dom"
import { dataFormatter } from "../../dateFormatter"
import React from 'react'
import { UserType } from "../../types"

type Props = {
	author: UserType,
	body: string,
	link: string,
	imageUrl: string,
	title: string,
	date: string,
	commentsCount: number,
	viewsCount: number,
	className?: string,
	children?: React.ReactNode,
}
const Post = ({ author, body, link, imageUrl, title, date, commentsCount, viewsCount }: Props) => {
	return (
		<div className="post">
			<img src={`https://infinite-tundra-41570.herokuapp.com${imageUrl}`} alt="Картинка поста" />
			<h2><Link to={`/post/${link}`}>{title}</Link></h2>
			<ul className='post__info'>
				<li className="post__date">{dataFormatter(date)}</li>
				<li className="post__comments">
					<img className="post__icon" src={Comments_icon} alt="" />
					{commentsCount || 0}
				</li>
				<li className="post__views">
					<img className="post__icon" src={Views_icon} alt="" />
					{viewsCount || 0}
				</li>
			</ul>
			<div dangerouslySetInnerHTML={{ __html: body }} className="post__text" />
			<div className='post__bottom'>
				<Link to={`/post/${link}`}><Button variant="arrow" className=''>Читать далее</Button></Link>
				<Link to={`/user/${author?._id}`}>
					<div className="post__author">
						<img src={author.avatarUrl ? `https://infinite-tundra-41570.herokuapp.com${author.avatarUrl}` : Avatar} className="avatar" alt="" />
						<span>{author.name}</span>
					</div>
				</Link>
			</div>
		</div>
	);
}
export default Post;
