import "./Comment.scss"
import Avatar from "../../assets/avatar_icon.png"
import { dataFormatter } from "../../dateFormatter";
import { useState } from "react"
import { Menu, MenuItem } from "../Menu/Menu"
import Button from "../Button/Button"
import { useSelector } from 'react-redux'
import React from 'react'
import { RootState } from "../../redux/store"
import { UserType } from "../../types"

type Props = {
	author: UserType,
	id: string,
	edit: any,
	deleteComment: any,
	body: string,
	date: string,
}
const Comment = ({ author, id, edit, body, date, deleteComment }: Props) => {
	const currentUser = useSelector((state: RootState) => state.auth.currentUser)

	const [commentBody, setCommentBody] = useState<string>(body);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editInput, setEditInput] = useState<string>(body);

	const isYourComment = currentUser?._id === author._id
	return (
		<div className="comment">
			<img src={author.avatarUrl ? `${author.avatarUrl}` : Avatar} className="avatar" alt="avatarka" />
			<div className='comment__content'>
				<div className='comment__top'>
					<h5 className="comment__name">{author?.name}</h5>
					<span className="comment__date">{dataFormatter(date)}</span>
				</div>
				{isEditing
					? <>
						<input className='comment__text' value={editInput} onChange={e => { setEditInput(e.target.value) }}></input>
						<div className='comment__edit-buttons'>
							<Button variant="cancel" onClick={() => { setEditInput(body); setIsEditing(false) }}>Отмена</Button>
							<Button variant="save" onClick={() => { edit(id, editInput); setIsEditing(false); setCommentBody(editInput) }}>Подтвертить</Button>
						</div>
					</>
					: <>
						<div className='comment__text'>{commentBody}</div>
					</>}
			</div>
			{(isYourComment && !isEditing)
				&& <div className="comment__icons">
					<Menu >
						<div className='comment__options-icon'>
							<span></span>
						</div>
						<MenuItem onClick={() => { setIsEditing(true) }} className='comment__edit-icon'>
							Редактировать
						</MenuItem>
						<MenuItem onClick={() => { deleteComment(id) }}>
							Удалить
						</MenuItem>
					</Menu>
				</div>
			}
		</div>
	);
}
export default Comment;
