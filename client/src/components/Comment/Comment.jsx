import "./Comment.scss"
import Avatar from "../../assets/avatar_icon.png"
import { dataFormatter } from "../../dateFormatter";


const Comment = (props) => {
	return (
		<div className="comment">
			<img src={Avatar} alt="" />
			<div className='comment__content'>
				<div className='comment__top'>
					<h5 className="comment__name">{props.author?.name}</h5>
					<span className="comment__date">{dataFormatter(props.date)}</span>
				</div>
				<div className='comment__text'>
					{props.body}
				</div>
				<button className='comment__reply'>Ответить</button>
			</div>
		</div>
	);
}
export default Comment;
