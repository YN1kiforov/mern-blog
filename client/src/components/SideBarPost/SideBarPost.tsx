import "./SideBarPost.scss"
import { dataFormatter } from "../../dateFormatter"
import { Link } from "react-router-dom"
import * as React from 'react';
type Props = {
	link: string,
	imageUrl: string,
	title: string,
	date: string,
}
const SideBarPost = ({ link, imageUrl, title, date }: Props) => {
	return (
		<li className="side-bar-post">
			<Link to={`/post/${link}`}><img src={`https://infinite-tundra-41570.herokuapp.com${imageUrl}`} alt="kartinka" /></Link>
			<Link to={`/post/${link}`}><h4 className="side-bar-post__title">{title}</h4></Link>

			<time className="side-bar-post__date">{dataFormatter(date)}</time>
		</li>
	);
}
export default SideBarPost;
