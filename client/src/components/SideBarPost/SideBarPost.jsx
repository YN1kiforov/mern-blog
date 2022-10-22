import "./SideBarPost.scss"
import { dataFormatter } from "../../dateFormatter"
import { Link } from "react-router-dom"
const SideBarPost = (props) => {
	return (
		<li className="side-bar-post">
			<Link to={`/post/${props.link}`}><img src={`http://localhost:3001${props.imageUrl}`} alt="" /></Link>
			<Link to={`/post/${props.link}`}><h4 className="side-bar-post__title">{props.title}</h4></Link>

			<time className="side-bar-post__date">{dataFormatter(props.date)}</time>
		</li>
	);
}
export default SideBarPost;
