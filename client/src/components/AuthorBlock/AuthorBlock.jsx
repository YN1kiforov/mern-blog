import "./AuthorBlock.scss"
import Avatar from "../../assets/avatar_icon.png"

const AuthorBlock = () => {
	return (
		<div className='author'>
			<div className='author__info'>
				<img src={Avatar} alt="" />
				<span className="author__name">Никифоров Яков</span>
			</div>
			<div className='author__about'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, facilis.</div>
			<button className='author__sub'>Подисаться</button>
		</div>
	);
}
export default AuthorBlock;
