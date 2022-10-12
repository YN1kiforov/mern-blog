import "./Posts.scss"
import Post from "../../components/Post/Post"
import { useState, useEffect } from "react"
import axios from "../../axios"
import { useSearchParams } from "react-router-dom";
const Posts = () => {
	const [posts, setPosts] = useState(null);
	let [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		(async () => {
			try {
				let { data } = await axios.get(`/getAll?limit=10&category=${searchParams.get("category")}&search=${searchParams.get("search")}`)
				setPosts(data.posts)
			} catch (error) {
				console.log(error)
			}

		})()

	}, []);
	return (
		<div className="posts">
			<ul className="home__list">
				{posts ? posts.map(post => {
					return <li>
						<Post
							title={post.title}
							viewsCount={post.viewsCount}
							commentsCount={post.commentsCount}
							authorAvatar={post.author.avatarUrl}
							authorName={post.author.name}
							body={post.body}
							link={post._id}
							date={post.createdAt}
							className="home__post">
						</Post>
					</li>
				}) : <div>Не удалось найти данные</div>}
			</ul>
		</div>
	);
}
export default Posts;
