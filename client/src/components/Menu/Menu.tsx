import { useState, useRef, useEffect } from "react";
import "./Menu.scss"
import React from 'react'
type Props = {
	children: any[]
}
export const Menu = ({ children }: Props) => {
	const [menuActive, setMenuActive] = useState<boolean>(false);
	const toggleContainer = useRef<HTMLDivElement>(null);
	const listItem: React.ReactElement[] = []
	const body: React.ReactElement[] = []

	useEffect(() => {
		const onClickOutsideHandler = (event: any) => {
			if (menuActive && toggleContainer.current && !toggleContainer.current.contains(event.target)) {
				setMenuActive(false);
			}
		}
		document.addEventListener('click', onClickOutsideHandler);
		return () => {
			document.removeEventListener('click', onClickOutsideHandler);
		};
	}, [menuActive]);
	children.forEach(element => {
		(element.type === "div" || element.type === "img") ? body.push(element) : listItem.push(element)
	});
	return (
		<div ref={toggleContainer} className={menuActive ? `list-container active` : `list-container`}>
			<button onClick={() => { setMenuActive(!menuActive) }} className="more-button" aria-label="Menu Button">
				<div className="menu-icon-wrapper">{body}</div>
			</button>
			<ul className="more-button-list">{listItem}</ul>
		</div>
	);
}
export const MenuItem = ({ ...props }) => {
	return (
		<div key={props.key} onClick={props.onClick} className="more-button-list-item">
			{props.children}
		</div>
	);
}
