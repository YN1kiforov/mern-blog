import { useState } from "react";
import "./Menu.scss"

export const Menu = (props) => {
	const [menuActive, setMenuActive] = useState(false);
	const listItem = []
	const body = []
	props.children.forEach(element => {
		(Array.isArray(element) || element?.type?.name === "MenuItem" || element?.props?.to) ? listItem.push(element) : body.push(element)
	});
	return (
		<div className={menuActive ? `list-container active` : `list-container`}>
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
