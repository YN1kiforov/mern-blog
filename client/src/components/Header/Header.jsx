import "./Header.scss"
import Logo from "../../assets/logo2.png"
import search from "../../assets/search_icon.jpg"
import notification from "../../assets/notification.png"
import avatar from "../../assets/avatar_icon.png"
import { Menu, MenuItem } from "../Menu/Menu"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../AuthContext"
import { Link, useNavigate } from "react-router-dom"
import axios from "../../axios"

const Header = () => {
	const { currentUser, logout } = useContext(AuthContext)
	const [searchInput, setSearchInput] = useState("");
	const [notifications, setNotifications] = useState(null);
	const navigate = useNavigate();

	function searchHandler() {
		if (!searchInput) {
			return
		}
		navigate(`/posts?search=${searchInput}`)
	}
	useEffect(() => {

		try {

			if (currentUser._id) {

				(async () => {
					const { data } = await axios.get(`/user?id=${currentUser?._id}`)
					setNotifications(data?.user?.notificationsList)
				})()
			}
		} catch (error) {
			console.log(error)
		}
	}, []);
	return (
		<div className="header">
			<Link to="/"><img src={Logo} alt="logo" className="header__logo"></img></Link>

			<ul className="header__menu">
				<li className="header__search">
					<div className='header__search-container'>
						<input value={searchInput} onChange={e => { setSearchInput(e.target.value) }} type="text" placeholder="Поиск"></input>
						<button onClick={searchHandler}>
							<img src={search} className="material-icons"></img>
						</button>
					</div>
				</li>
				{currentUser ? <>
					<li className="header__notifications">
						<Menu>
							<img src={notification}></img>
							{notifications
								? (notifications.map((post,index) => {
									return <MenuItem key={`${post.title}_${index}`} ><Link to={`/post/${post._id}`}>{post.title}</Link></MenuItem>
								}))
								: <MenuItem>Не удалось найти</MenuItem>
							}
						</Menu>
					</li>
				</> : null}
				<li className="header__avatar">
					{currentUser ? <>
						<Menu>
							<img src={currentUser?.avatarUrl || avatar}></img>
							<Link to={`/user/${currentUser._id}`}><MenuItem>Профиль</MenuItem></Link>
							<Link to="/create-post"><MenuItem>Написать блог</MenuItem></Link>
							<MenuItem onClick={logout}>Выйти</MenuItem>
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
