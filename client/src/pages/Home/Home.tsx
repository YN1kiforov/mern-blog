import "./Home.scss"
import Post from "../../components/Post/Post"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "../../axios"
import Button from "../../components/Button/Button"
import Loader from "../../components/Loader/Loader";
import * as React from 'react';
import { PostType } from "../../types"
const Home = () => {
	const [posts, setPosts] = useState<PostType[] | null>(null);
	const [isLoading, setIsLoading] = useState<Boolean>(true);

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
				: <div className="home">
					<ul className="home__list">
						{posts ? posts.map((post, index) => {
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
						}) : <div>Не удалось найти данные</div>}
						<li>
							<Link to="/posts"><Button>Смотреть все посты</Button></Link>
						</li>
					</ul>
				</div>}
		</>

	);
}
export default Home;
