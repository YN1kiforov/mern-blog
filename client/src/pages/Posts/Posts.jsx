import "./Posts.scss"
import Post from "../../components/Post/Post"
import { useState, useEffect } from "react"
import axios from "../../axios"
import { useSearchParams, useLocation, } from "react-router-dom";
const Posts = () => {
	const [posts, setPosts] = useState(null);
	const [lastPostNumber, setLastPostNumber] = useState(null);
	const [searchParams] = useSearchParams();
	const location = useLocation()
	const [fetching, setFetching] = useState(false);
	const [stopFetching, setStopFetching] = useState(false);

	const limit = 8;

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)
		return () => {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, []);

	useEffect(() => {
		try {
			if (fetching && !stopFetching) {
				(async () => {
					let { data } = await axios.get(`/getAll?limit=${limit}
					&category=${searchParams.get("category")}
					&search=${searchParams.get("search")}
					&lastPostNumber=${lastPostNumber}`)
					setPosts((prev) => (prev ? prev.concat(data.posts) : data.posts))
					if (data.posts.length < limit) {
						return setStopFetching(true)
					}
					setLastPostNumber(data.posts[data.posts.length - 1].number)
					setFetching(false)
				})()

			}

		} catch (error) {
			console.log(error)
		}
	}, [fetching, location, searchParams, lastPostNumber, stopFetching]);

	const scrollHandler = (e) => {
		if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 300) {
			setFetching(true)
		}
	}
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
