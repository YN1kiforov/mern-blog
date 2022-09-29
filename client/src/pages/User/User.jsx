import "./User.scss"
import AuthorBlock from "../../components/AuthorBlock/AuthorBlock"
import Post from "../../components/Post/Post"
const User = () => {
	return (
		<div className="user">
			<AuthorBlock />
			<ul className='user__posts-list'>
				<h1>Последние статьи автора</h1>
				{[1, 2, 3, 4].map(post => {
					return <li>
						<Post />
					</li>
				})}
			</ul>

		</div>
	);
}
export default User;
