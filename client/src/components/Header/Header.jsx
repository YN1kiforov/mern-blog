import "./Header.scss"
import Logo from "../../assets/logo2.png"
import search from "../../assets/search_icon.jpg"
import notification from "../../assets/notification.png"
import avatar from "../../assets/avatar_icon.png"
import { Menu, MenuItem } from "../Menu/Menu"
import { useContext } from "react"
import { AuthContext } from "../../AuthContext"
import { Link } from "react-router-dom"
const Header = () => {
	const { currentUser, logout } = useContext(AuthContext)

	return (
		<div className="header">
			<Link to="/"><img src={Logo} alt="logo" className="header__logo"></img></Link>

			<ul className="header__menu">
				<li className="header__search">
					<input type="text" name="" placeholder="Search"></input>
					<button>
						<img src={search} class="material-icons"></img>
					</button>
				</li>
				{currentUser ? <>
					<li className="header__notifications">
						<Menu>
							<img src={notification}></img>
							<MenuItem>000</MenuItem>
							<MenuItem>111</MenuItem>
							<MenuItem>2222</MenuItem>
							<MenuItem>3333</MenuItem>
						</Menu>
					</li>
				</> : null}
				<li className="header__avatar">

					{currentUser ? <>
						<Menu>
							<img src={currentUser?.avatarUrl || avatar}></img>
							<Link to={`/user/${currentUser._id}`}><MenuItem>Профиль</MenuItem></Link>
							<Link to="/create-post"><MenuItem>Написать блог</MenuItem></Link>
							<MenuItem onClick ={logout}>Выйти</MenuItem>
						</Menu>
					</> : <>
						<Menu>
							<img src={avatar}></img>
							<Link to="/login"><MenuItem>Войти</MenuItem></Link>
							<Link to="/register"><MenuItem>Зарегистрироваться</MenuItem></Link>
						</Menu>
					</>}

				</li>
			</ul>
		</div>
	);
}
export default Header;
