import "./Post.scss"
import Photo from "../../assets/random_photo.jpg"
import Comments_icon from "../../assets/comment_icon.png"
import Views_icon from "../../assets/views_icon.webp"
import Avatar from "../../assets/avatar_icon.png"
const Post = (props) => {
	return (
		<div className="post">
			<img src={Photo}></img>
			<h2>{props.title}</h2>
			<ul className='post__info'>
				<li className="post__date">Январь 31, 2001</li>
				<li className="post__comments">
					<img className="post__icon" src={Comments_icon} alt="" />
					
					{props.viewsCount}
				</li>
				<li className="post__views">
					<img className="post__icon" src={Views_icon} alt="" />
					{props.viewsCount || 0}
				</li>
			</ul>
			<div dangerouslySetInnerHTML={{ __html: props.body }} className="post__text" /> 
			<div className = 'post__bottom'>
				<button className = ''>Читать далее</button>
				<div className="post__author">
					<img src={props.authorAvatar || Avatar} alt="" />
					<span>{props.authorName}</span>
				</div>
			</div>
		</div>
	);
}
export default Post;
