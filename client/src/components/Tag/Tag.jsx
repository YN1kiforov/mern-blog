import { Link } from "react-router-dom";
import "./Tag.scss"
import styled from 'styled-components';


const Li = styled.h1.attrs(props => {
	return { color: props.color || "black", }
})`
	&:hover{
		 color: ${props => props.color};
	 }
 `;
const HastTag = styled.span.attrs(props => ({
	color: props.color || "black",
}))`
	margin: 0px 5px 0px 0px;
 color: ${props => props.color};
`;

const Tag = (props) => {
	return (
		<Link to={`/posts?category=${props.link}`}>
			<Li color={props.color} className="tag">
				<HastTag color={props.color}>#</HastTag>
				<span>{props.name}</span>
			</Li>
		</Link>
	);
}
export default Tag;