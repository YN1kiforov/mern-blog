import "./Header.scss"
import Logo from "../../assets/logo2.png"
import search from "../../assets/search_icon.jpg"
import notification from "../../assets/notification.png"
import avatar from "../../assets/avatar_icon.png"
import { Menu, MenuItem } from "../Menu/Menu"

const Header = () => {
	return (
		<div className="header">
			<img src={Logo} alt="logo" className="header__logo"></img>
			<ul className="header__menu">
				<li className="header__search">
					<input type="text" name="" placeholder="Search"></input>
					<button>
						<img src={search} class="material-icons"></img>
					</button>
				</li>
				<li className="header__notifications">
					<img src={notification}></img>
				</li>
				<li className="header__avatar">
					<Menu>
						<img src={avatar}></img>
						<MenuItem>000</MenuItem>
						<MenuItem>111</MenuItem>
						<MenuItem>2222</MenuItem>
						<MenuItem>3333</MenuItem>
					</Menu>

				</li>

			</ul>
		</div>
	);
}
export default Header;
