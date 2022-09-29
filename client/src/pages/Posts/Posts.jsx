import "./Posts.scss"
import Post from "../../components/Post/Post"

const Posts = () => {
	return (
		<div className="posts">
			<ul className="home__list">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(post => {
					return <li>
						<Post className="home__post"></Post>
					</li>
				})}
			</ul>
		</div>
	);
}
export default Posts;
