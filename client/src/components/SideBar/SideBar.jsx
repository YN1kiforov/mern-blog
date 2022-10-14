import "./SideBar.scss"
import SideBarPost from "../SideBarPost/SideBarPost"
import Tag from "../Tag/Tag"
import { useState, useEffect } from "react"
import axios from "../../axios"

const SideBar = () => {
	const tags = [
		{
			name: "Путешествия",
			link: "puteshestviya",

		},
		{
			name: "еда",
			link: "eda",

		},
		{
			name: "Жизнь",
			link: "jizn",

		},
		{
			name: "Программирование",
			link: "programmirovanie",
		},
	]
	const [posts, setPosts] = useState(null);
	useEffect(() => {
		(async () => {
			try {
				let { data } = await axios.get('/getAll?limit=3')
				setPosts(data.posts)
			} catch (error) {
				console.log(error)
			}
		})()
	}, []);
	return (
		<div className="side-bar">
			<ul>
				<li className="side-bar__recent-post">
					Последние посты
					{posts ? <ul>
						{posts.map(post => {
							return <SideBarPost
								title={post.title}
								link={post._id}
								date={post.createdAt}
							/>
						})}
					</ul> :
						<div className=''>...</div>}

				</li>
				<li className="side-bar__tags">
					Тэги
					<ul className="side-bar__list-tags">
						{tags.map(tag => {
							return <Tag link={tag.link} name={tag.name} />
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
