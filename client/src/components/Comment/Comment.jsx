import "./Comment.scss"
import Avatar from "../../assets/avatar_icon.png"
import { dataFormatter } from "../../dateFormatter";
import { AuthContext } from "../../AuthContext"
import { useContext, useState } from "react"
import { Menu, MenuItem } from "../../components/Menu/Menu"
import Button from "../../components/Button/Button"


const Comment = (props) => {
	const { currentUser } = useContext(AuthContext)
	const [commentBody, setCommentBody] = useState(props.body);
	const [isEditing, setIsEditing] = useState(false);
	const [editInput, setEditInput] = useState(props.body);

	const isYourComment = currentUser._id == props.author._id
	return (
		<div className="comment">
			<img src={Avatar} alt="" />
			<div className='comment__content'>
				<div className='comment__top'>
					<h5 className="comment__name">{props.author?.name}</h5>
					<span className="comment__date">{dataFormatter(props.date)}</span>
				</div>
				{isEditing
					? <>
						<input className='comment__text' value={editInput} onChange={e => { setEditInput(e.target.value) }}></input>
						<div className='comment__edit-buttons'>
							<Button type="cancel" onClick={() => { setEditInput(props.body); setIsEditing(false) }}>Отмена</Button>
							<Button type="save" onClick={() => { props.edit(props.id, editInput); setIsEditing(false); setCommentBody(editInput) }} className=''>Подтвертить</Button>
						</div>
					</>
					: <>
						<div className='comment__text'>{commentBody}</div>
					</>}
			</div>
			{(isYourComment && !isEditing)
				? <div className="comment__icons">
					<Menu >
						<div className='comment__options-icon'>
							<span></span>
						</div>
						<MenuItem>
							<button onClick={() => { setIsEditing(true) }} className='comment__edit-icon'>
								Редактировать
							</button>
						</MenuItem>
						<MenuItem>
							<button onClick={() => { props.delete(props.id) }} className='comment__detele-icon'>
								Удалить
							</button>
						</MenuItem>
					</Menu>
				</div>
				: <></>}
		</div>
	);
}
export default Comment;
