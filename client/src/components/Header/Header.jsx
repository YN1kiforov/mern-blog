import "./Header.scss"
import Logo from "../../assets/logo2.png"
import search from "../../assets/search_icon.jpg"
import notification from "../../assets/notification.png"
import avatar from "../../assets/avatar_icon.png"


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
					<img src={avatar}></img>
				</li>
			</ul>
		</div>
	);
}
export default Header;
