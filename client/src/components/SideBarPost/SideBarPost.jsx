import "./SideBarPost.scss"
import Photo from "./../../assets/random_photo.jpg"
const SideBarPost = () => {
	return (
		<li className="side-bar-post">
			<img src={Photo} alt="" />
			<h4 className="side-bar-post__title">Что? Где? Когда? а главное зачем</h4>
			<time className="side-bar-post__date">13 января, 2004</time>
		</li>				
	);
}
export default SideBarPost;
