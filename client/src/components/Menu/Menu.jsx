import { useState } from "react";
import "./Menu.scss"
export const Menu = (props) => {
	const [menuActive, setMenuActive] = useState(false);
	const listItem = []
	// function windowCloseMenu() {
	// 	if (screen, { once: true }) {
	// 		return
	// 	}

	// }
	if (menuActive) {
		setTimeout(() => {
			const node = document.querySelector('.list-container')
			window.addEventListener("click", (e) => {
				//if (e.target.contains(node)) {
					setMenuActive(false)
				//}
			}, { once: true })
		})
	}
	const body = []
	props.children.forEach(element => {
		element.type.name === "MenuItem" ? listItem.push(element) : body.push(element)
	});
	return (
		<div className={menuActive ? `list-container active` : `list-container`}>
			<button onClick={() => { setMenuActive(!menuActive) }} class="more-button" aria-label="Menu Button">
				<div class="menu-icon-wrapper">
					{body}
				</div>
			</button>
			<ul class="more-button-list">{listItem}</ul>
		</div>
	);
}
export const MenuItem = (props) => {

	return (
		<li class="more-button-list-item">
			{props.children}
		</li>
	);
}
