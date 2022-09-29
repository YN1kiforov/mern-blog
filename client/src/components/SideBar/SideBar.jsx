import "./SideBar.scss"
import SideBarPost from "../SideBarPost/SideBarPost"
import Tag from "../Tag/Tag"

const SideBar = () => {
	return (
		<div className="side-bar">
			<ul>
				<li className="side-bar__recent-post">
					Последние посты
					<ul>
						{[1, 2, 3].map(post => {
							return <SideBarPost />
						})}
					</ul>
				</li>
				<li className="side-bar__tags">
					Тэги
					<ul className="side-bar__list-tags">
						{[1, 2, 3, 4].map(tag => {
							return <Tag />
						})}
					</ul>
				</li>
				<li className="side-bar__social">
					<ul className="side-bar__list-social">
						Написать создателю
						<li>telegram</li>
					</ul>
				</li>
			</ul>
		</div>
	);
}
export default SideBar;
