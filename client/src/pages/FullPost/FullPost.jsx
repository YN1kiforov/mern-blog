import "./FullPost.scss"
import Photo from "../../assets/random_photo.jpg"
import Comments_icon from "../../assets/comment_icon.png"
import Views_icon from "../../assets/views_icon.webp"
import Avatar from "../../assets/avatar_icon.png"
import AuthorBlock from "../../components/AuthorBlock/AuthorBlock"
import Comment from "../../components/Comment/Comment"

const FullPost = () => {
	return (
		<ul className="full-post">
			<li className="post">
				<img src={Photo} alt="" />
				<ul className='post__info'>
					<li className="post__date">Январь 31, 2001</li>
					<li className="post__comments">
						<img className="post__icon" src={Comments_icon} alt="" />
						0
					</li>
					<li className="post__views">
						<img className="post__icon" src={Views_icon} alt="" />
						777
					</li>
				</ul>
				<div className='full-post__content'>

					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti officiis recusandae reiciendis minus praesentium, suscipit eligendi eaque at corrupti fugit architecto quis necessitatibus repellendus laborum omnis ipsam laboriosam? Maxime, minus.</p>
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat tempore nesciunt fuga hic! Commodi nihil consectetur odio tempore voluptatibus incidunt quos? Dolores aspernatur consequatur ratione rem doloribus perspiciatis nihil voluptate!</p>

				</div>
			</li>
			<li className='full-post__author'>
			<AuthorBlock/>
				{/* <div className='author__info'>
					<img src={Avatar} alt="" />
					<span className="author__name">Никифоров Яков</span>
				</div>
				<div className='author__about'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, facilis.</div>
				<button className='author__sub'>Подисаться</button> */}
			</li>
			<li className='full-post__comments comments'>
				<div className=''>
					<h4 htmlFor="Ваш коментарий">Напишите коментарий</h4>
					<textarea name="" id="" cols="30" rows="10" placeholder="Напишите комментарий"></textarea>
					<button className=''>Отправить</button>
				</div>
				<ul className="comments__list">
					<h4>Коментарии</h4>
					{[1, 2, 3].map(comment => {
						return <Comment />
					})}
				</ul>
			</li>
		</ul>

	);
}
export default FullPost;
