import "./Post.scss"
import Photo from "../../assets/random_photo.jpg"
import Comments_icon from "../../assets/comment_icon.png"
import Views_icon from "../../assets/views_icon.webp"
import Avatar from "../../assets/avatar_icon.png"
//<div dangerouslySetInnerHTML={{ __html: value }} />
const Post = () => {
	return (
		<div className="post">
			<img src={Photo}></img>
			<h2>Название самой лучшей статьи в мире</h2>
			<ul className='post__info'>
				<li className="post__date">Январь 31, 2001</li>
				<li className="post__comments">
					<img className="post__icon" src={Comments_icon} alt="" />
					0
				</li>
				<li className="post__views">
					<img className="post__icon" src={Views_icon} alt="" />
					777
				</li>
			</ul>
			<h3 className="post__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste error dolorem aperiam deleniti obcaecati reiciendis ullam aliquam id totam sed corrupti, repellat ipsum accusamus et tenetur vero recusandae nesciunt consequuntur?</h3>
			<div className = 'post__bottom'>
				<button className = ''>Читать далее</button>
				<div className="post__author">
					<img src={Avatar} alt="" />
					<span>Никифоров Яков</span>
				</div>
			</div>
		</div>
	);
}
export default Post;
