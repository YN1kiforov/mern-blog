import "./Header.scss"
import Logo from "../../assets/logo2.png"
import search from "../../assets/search_icon.jpg"
import notification from "../../assets/notification.png"
import avatar from "../../assets/avatar_icon.png"
import { Menu, MenuItem } from "../Menu/Menu"
import React from "react"
import { Link } from "react-router-dom"

import { useHeader } from "../../hooks/useHeader"
const Header = React.memo(function () {
	const { currentUser, searchInput, setSearchInput, notifications, logoutHandler, searchHandler } = useHeader()
	return (
		<div className="header">
			<Link to="/"><img src={Logo} alt="logo" className="header__logo"></img></Link>
			<ul className="header__menu">
				<li className="header__search">
					<div className='header__search-container'>
						<input value={searchInput} onChange={e => { setSearchInput(e.target.value) }} type="text" placeholder="Поиск"></input>
						<button onClick={searchHandler}>
							<img alt="search" src={search} className="material-icons"></img>
						</button>
					</div>
				</li>
				{currentUser
					&& <>
						<li className="header__notifications">
							<Menu>
								<img alt="kartinka" src={notification}></img>
								{notifications?.length
									? (notifications.map((post, index) => <MenuItem key={`${post.title}_${index}`} ><Link to={`/post/${post._id}`}>{post.title}</Link></MenuItem>))
									: <MenuItem>Не удалось найти</MenuItem>
								}
							</Menu>
						</li>
					</>}
				<li className="header__avatar">
					{currentUser
						? <>
							<Menu>
								<img alt="kartinka" src={currentUser?.avatarUrl ? `https://infinite-tundra-41570.herokuapp.com${currentUser?.avatarUrl}` : avatar} />
								<Link to={`/user/${currentUser._id}`}><MenuItem>Профиль</MenuItem></Link>
								<Link to="/create-post"><MenuItem>Написать блог</MenuItem></Link>
								<MenuItem onClick={logoutHandler}>Выйти</MenuItem>
							</Menu>
						</>
						: <>
							<Menu>
								<img alt="kartinka" src={avatar}></img>
								<Link to="/login"><MenuItem>Войти</MenuItem></Link>
								<Link to="/register"><MenuItem>Зарегистрироваться</MenuItem></Link>
							</Menu>
						</>}
				</li>
			</ul>
		</div>
	);
})
export default Header;
