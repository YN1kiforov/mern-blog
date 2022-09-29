import "./Comment.scss"
import Avatar from "../../assets/avatar_icon.png"



const Comment = () => {
	return (
		<div className="comment">
			<img src={Avatar} alt="" />
			<div className='comment__content'>
				<div className='comment__top'>
					<h5 className="comment__name">Никифоров Яков</h5>
					<span className="comment__date">13 Января, 2004</span>
				</div>
				<div className='comment__text'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
				</div>
				<button className='comment__reply'>Ответить</button>
			</div>
		</div>
	);
}
export default Comment;
