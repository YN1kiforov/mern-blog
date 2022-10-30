import { Link } from "react-router-dom";
import "./Tag.scss"
import styled from 'styled-components';
import React from 'react'
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
type Props = {
	link: string,
	color: string,
	name: string,
}
const Tag = ({ link, color, name }: Props) => {
	return (
		<Link to={`/posts?category=${link}`}>
			<Li color={color} className="tag">
				<HastTag color={color}>#</HastTag>
				<span>{name}</span>
			</Li>
		</Link>
	);
}
export default Tag;