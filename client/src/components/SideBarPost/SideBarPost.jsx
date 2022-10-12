import "./SideBarPost.scss"
import Photo from "./../../assets/random_photo.jpg"
import { dataFormatter } from "../../dateFormatter"
import { Link } from "react-router-dom"
const SideBarPost = (props) => {
	return (
		<li className="side-bar-post">
			<Link to={`/post/${props.link}`}><img src={Photo} alt="" /></Link>
			<Link to={`/post/${props.link}`}><h4 className="side-bar-post__title">{props.title}</h4></Link>


			<time className="side-bar-post__date">{dataFormatter(props.date)}</time>
		</li>
	);
}
export default SideBarPost;
