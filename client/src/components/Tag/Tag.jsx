import { Link } from "react-router-dom";
import "./Tag.scss"

const Footer = (props) => {

	return (
		<Link to={`/posts?category=${props.link}`}><li className="tag">{props.name}</li></Link>
	);
}
export default Footer;
