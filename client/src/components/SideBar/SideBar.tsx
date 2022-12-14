import "./SideBar.scss"
import React from 'react'
import SideBarPost from "../SideBarPost/SideBarPost"
import Tag from "../Tag/Tag"
import { useState, useEffect } from "react"
import axios from "../../axios"
import telegram from "../../assets/telegram_icon.png"
import Loader from "../Loader/Loader";
import { useSelector } from 'react-redux'
import { RootState } from "../../redux/store"
import { PostType } from "../../types"
const SideBar = () => {
	const [isLoading, setIsLoading] = useState(true);
	const tags = useSelector((state: RootState) => state.tags.tags)
	const [posts, setPosts] = useState<PostType[]>([]);

	useEffect(() => {
		(async () => {
			try {
				let { data } = await axios.get('/getAll?limit=3')
				setPosts(data.posts)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		})()
	}, []);
	return (
		<>
			{isLoading
				? <Loader />
				: <div className="side-bar">
					<ul>
						<li className="side-bar__recent-post">
							Последние посты
							{posts.length
								? <ul>
									{posts.map((post, index) => {
										return <SideBarPost
											key={`${post.title}_${index}`}
											title={post.title}
											link={post._id}
											date={post.createdAt}
											imageUrl={post.imageUrl}
										/>
									})}
								</ul>
								: <h5>Не удалось найти посты</h5>}
						</li>
						<li className="side-bar__tags">
							Категории
							<ul className="side-bar__list-tags">
								{tags.map((tag, index) => {
									return <Tag key={`${tag.value}_${index}`} color={tag.color} link={tag.value} name={tag.label} />
								})}
							</ul>
						</li>
						<li className="side-bar__social">
							<ul className="side-bar__list-social">
								Написать создателю
								<li>
									<a href="https://t.me/yakovBlind">
										<img src={telegram} alt="telegram" />
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			}
		</>
	);
}
export default SideBar;
