import { useState, useRef, useEffect } from "react";
import "./Menu.scss"

export const Menu = (props) => {
	const [menuActive, setMenuActive] = useState(false);
	const toggleContainer = useRef();
	const listItem = []
	const body = []

	useEffect(() => {
		
		const onClickOutsideHandler = (event) => {
			if (menuActive && !toggleContainer.current.contains(event.target)) {
				setMenuActive(false);
			}
		}
		document.addEventListener('click', onClickOutsideHandler);
		return () => {
			document.removeEventListener('click', onClickOutsideHandler);
		};
	}, [menuActive]);

	props.children.forEach(element => {
		(Array.isArray(element) || (element.type !== "div" && element.type !== "img") || element?.props?.to) ? listItem.push(element) : body.push(element)
	});
	return (
		<div ref={toggleContainer} className={menuActive ? `list-container active` : `list-container`}>
			<button onClick={() => { setMenuActive(!menuActive) }} className="more-button" aria-label="Menu Button">
				<div className="menu-icon-wrapper">
					{body}
				</div>
			</button>
			<ul className="more-button-list">{listItem}</ul>
		</div>
	);
}
export const MenuItem = (props) => {

	return (
		<li onClick={props.onClick} className="more-button-list-item">
			{props.children}
		</li>
	);
}
