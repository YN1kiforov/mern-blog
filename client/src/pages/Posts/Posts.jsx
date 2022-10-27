import "./Posts.scss"
import Post from "../../components/Post/Post"
import { useState, useEffect } from "react"
import axios from "../../axios"
import { useSearchParams, useLocation, } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Posts = () => {
	const [posts, setPosts] = useState(null);
	const [lastPostNumber, setLastPostNumber] = useState(null);
	const [searchParams] = useSearchParams();
	const location = useLocation()
	const [category, setCategory] = useState(null);
	const [fetching, setFetching] = useState(true);
	const [stopFetching, setStopFetching] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const limit = 8;

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)
		return () => {
			document.removeEventListener('scroll', scrollHandler)
		}
	}, []);

	useEffect(() => {
		let isNewCategory = category !== searchParams.get("category");
		try {
			if ((fetching && !stopFetching) || isNewCategory) {
				(async () => {
					isNewCategory && setIsLoading(true)
					let { data } = await axios.get(`/getAll?limit=${limit}				
					&category=${searchParams.get("category")}
					&search=${searchParams.get("search")}
					&lastPostNumber=${isNewCategory ? null : lastPostNumber}`)
					if (isNewCategory) {
						setStopFetching(false)
						setPosts(data.posts)
						setCategory(searchParams.get("category"))
						setIsLoading(false)
					} else {
						setPosts((prev) => (prev ? prev.concat(data.posts) : data.posts))
					}
					if (data.posts.length < limit) {
						return setStopFetching(true)
					}
					setLastPostNumber(data.posts[data.posts.length - 1].number)
					setFetching(false)
					setIsLoading(false)
				})()
			}
		} catch (error) {
			console.log(error)
		}
	}, [fetching, location, searchParams, lastPostNumber, stopFetching, category]);
	const scrollHandler = (e) => {
		if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 300) {
			setFetching(true)
		}
	}
	return (
		<>
			{isLoading
				? <Loader />
				: <div className="posts">
					<ul className="posts__list">
						{posts
							? posts.length
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
				</div>}
		</>

	);
}
export default Posts;
