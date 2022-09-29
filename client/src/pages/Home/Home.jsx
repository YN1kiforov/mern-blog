import "./Home.scss"
import Post from "../../components/Post/Post"

const Home = () => {
	return (
		<div className="home">
			<ul className="home__list">
				{[1, 2, 3].map(post => {
					return <li>
						<Post className="home__post"></Post>
					</li>
				})}

				<li><button className=''>Смотреть все посты</button></li>

			</ul>
		</div>
	);
}
export default Home;
