import "./Posts.scss"
import Post from "../../components/Post/Post"
import { useState, useEffect } from "react"
import axios from "../../axios"
import { useSearchParams, useLocation, } from "react-router-dom";
const Posts = () => {
	const [posts, setPosts] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation()

	useEffect(() => {
		(async () => {
			try {
				let { data } = await axios.get(`/getAll?limit=8&category=${searchParams.get("category")}&search=${searchParams.get("search")}`)
				setPosts(data.posts)
			} catch (error) {
				console.log(error)
			}
		})()
	}, [location]);
	return (
		<div className="posts">
			<ul className="posts__list">
				{posts ? posts.length
					? posts.map((post, index) => {
						return <li key={`${post.title}_${index}`}>
							<Post
								title={post.title}
								viewsCount={post.viewsCount}
								commentsCount={post.commentsCount}
								author={post.author}
								body={post.body}
								link={post._id}
								date={post.createdAt}
								imageUrl={post.imageUrl}
								className="home__post">
							</Post>
						</li>
					})
					: <div className='posts__helper'> Нет постов такой категории. Станьте первым :) </div>
					: <div className='posts__helper'>Не удалось найти посты :(</div>}
			</ul>
		</div>
	);
}
export default Posts;
