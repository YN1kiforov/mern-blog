import "./Post.scss"
import Button from "../../components/Button/Button"
import Comments_icon from "../../assets/comment_icon.png"
import Views_icon from "../../assets/views_icon.webp"
import Avatar from "../../assets/avatar_icon.png"
import { Link } from "react-router-dom"
import { dataFormatter } from "../../dateFormatter"

const Post = (props) => {
	const author = props.author || {};
	return (
		<div className="post">

			<img src={`${process.env.REACT_APP_URL}${props.imageUrl}`} alt="Картинка поста"></img>

			<h2><Link to={`/post/${props.link}`}>{props.title}</Link></h2>
			<ul className='post__info'>
				<li className="post__date">{dataFormatter(props.date)}</li>
				<li className="post__comments">
					<img className="post__icon" src={Comments_icon} alt="" />

					{props.commentsCount || 0}
				</li>
				<li className="post__views">
					<img className="post__icon" src={Views_icon} alt="" />
					{props.viewsCount || 0}
				</li>
			</ul>
			<div dangerouslySetInnerHTML={{ __html: props.body }} className="post__text" />
			<div className='post__bottom'>
				<Link to={`/post/${props.link}`}><Button variant="arrow" className=''>Читать далее</Button></Link>
				<Link to={`/user/${author?._id}`}>
					<div className="post__author">
						<img src={author.avatarUrl ? `${process.env.REACT_APP_URL}${author.avatarUrl}` : Avatar} className="avatar" alt="" />
						<span>{author.name}</span>
					</div>
				</Link>
			</div>
		</div>
	);
}
export default Post;
