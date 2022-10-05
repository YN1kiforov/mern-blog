import "./AuthorBlock.scss"
import Avatar from "../../assets/avatar_icon.png"

const AuthorBlock = (props) => {
	const author = props.author;
	return (
		<div className='author'>
			<div className='author__info'>
				<img src={Avatar} alt="" />
				<span className="author__name">{author.name}</span>
			</div>
			<div className='author__about'>{author.about}</div>
			<button className='author__sub'>Подисаться</button>
		</div>
	);
}
export default AuthorBlock;
