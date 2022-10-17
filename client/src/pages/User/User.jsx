import "./User.scss"
import AuthorBlock from "../../components/AuthorBlock/AuthorBlock"
import Post from "../../components/Post/Post"
import { useLocation } from 'react-router-dom';
import axios from "../../axios"


import { useEffect, useState } from "react"

const User = () => {
	const [posts, setPosts] = useState([]);
	const location = useLocation()
	const userId = location.pathname.split('/')[2];
	const [user, setUser] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const [user, posts] = await Promise.all([
					axios.get(`/user?id=${userId}`),
					axios.get(`/getAll?limit=10&user=${userId}`)
				]);
				setUser(user.data.user)
				setPosts(posts.data.posts)

			} catch (error) {
				console.log(error)
			}
		})()
	}, []);

	return (
		<div className="user">
			<AuthorBlock author={user} options={true} />
			<ul className='user__posts-list'>
				<h1>Последние статьи автора</h1>
				{posts ? posts.map((post,index) => {
					return <li key={`${post.title}_${index}`}>
						<Post
							title={post.title}
							viewsCount={post.viewsCount}
							commentsCount={post.commentsCount}
							authorAvatar={post.author.avatarUrl}
							authorName={post.author.name}
							body={post.body}
							link={post._id}
							date={post.createdAt}
							imageUrl={post.imageUrl}
						/>
					</li>
				})
					: <div>Не удалось найти посты пользователя</div>}
			</ul>

		</div>
	);
}
export default User;
