import "./Home.scss"
import Post from "../../components/Post/Post"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "../../axios"
const Home = () => {
	const [posts, setPosts] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				let { data } = await axios.get('/getAll')
				console.log(data)
				setPosts(data.posts)
			} catch (error) {
				console.log(error)
			}
		})()

	}, []);

	return (
		<div className="home">
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
							className="home__post">
						</Post>
					</li>
				}) : <div>Не удалось найти данные</div>}
				<li>
					<Link to="/posts"><button className=''>Смотреть все посты</button></Link>
				</li>


			</ul>
		</div>
	);
}
export default Home;
