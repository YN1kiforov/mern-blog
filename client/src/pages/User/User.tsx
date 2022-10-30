import "./User.scss"
import AuthorBlock from "../../components/AuthorBlock/AuthorBlock"
import Post from "../../components/Post/Post"
import { useLocation } from 'react-router-dom'
import axios from "../../axios"
import Loader from "../../components/Loader/Loader"
import React, { useEffect, useState } from "react"
import { PostType, UserType } from "../../types"
const User = () => {
	const location = useLocation()
	const userId = location.pathname.split('/')[2];

	const [posts, setPosts] = useState<PostType[] | null>(null);
	const [user, setUser] = useState<UserType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			try {
				const [user, posts] = await Promise.all([
					axios.get(`/user?id=${userId}`),
					axios.get(`/getAll?limit=4&user=${userId}`)
				]);
				setUser(user.data.user)
				setPosts(posts.data.posts)
				setIsLoading(false)
			} catch (error) {
				console.log(error)
			}
		})()
	}, [userId]);

	return (
		<>
			{isLoading
				? <Loader />
				: <div className="user">
					{user && <AuthorBlock author={user} options={true} />}
					<ul className='user__posts-list'>
						<h1>Последние статьи автора</h1>
						{posts
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
									/>
								</li>
							})
							: <div>Не удалось найти посты пользователя</div>}
					</ul>

				</div>}
		</>

	);
}
export default User;
