import "./AuthorBlock.scss"
import Avatar from "../../assets/avatar_icon.png"
import { Link } from "react-router-dom"
import { Menu, MenuItem } from "../../components/Menu/Menu"
import Button from "../../components/Button/Button"
import Input from "../Input/Input"
import * as React from 'react'
import { UserType } from "../../types"
import { useAuthorBlock } from "../../hooks/useAuthorBlock"
type Props = {
	author: UserType,
	options: Boolean,
}
const AuthorBlock = ({ author, options }: Props) => {
	const {
		currentUser, inputFileRef, avatarUrl, isEditing, setIsEditing,
		aboutInput, setAboutInput, nameInput, setNameInput, isSubscribed,
		editUserData, editHandler, subscribeUser, unSubscribeUser, handleChangeFile, deleteUser, isYou
	} = useAuthorBlock(author)
	return (
		<div className='author'>
			{(options && isYou)
				&& <div className='author__options'>
					<Menu >
						<div className='author__options-icon'>
							<span></span>
						</div>
						<MenuItem onClick={editHandler}>Редактировать</MenuItem>
						<MenuItem onClick={deleteUser}>Удалить</MenuItem>
					</Menu>
				</div>
			}

			<div className='author__info'>
				{isEditing
					? <>
						<div className='author__image'>
							<input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
							<img className="author__avatar" src={avatarUrl ? `${process.env.REACT_APP_URL}${avatarUrl}` : Avatar} alt="" />
							<button onClick={() => inputFileRef.current && inputFileRef.current.click()}>+</button>
						</div>
						<Input value={nameInput} onChange={(e: React.FormEvent<HTMLInputElement>) => setNameInput(e.currentTarget.value)} />
						<Input value={aboutInput} onChange={(e: React.FormEvent<HTMLInputElement>) => setAboutInput(e.currentTarget.value)} />
					</>
					: <>
						<img className="author__avatar" src={author.avatarUrl ? `${author.avatarUrl}` : Avatar} alt="" />
						<Link to={`/user/${author?._id}`}>{author?.name}</Link>
						<div className='author__about'>{author?.about}</div>
					</>
				}
			</div>

			{!isYou && (isSubscribed
				? <Button variant="cancel" disabled={!currentUser} onClick={unSubscribeUser} className='author__sub'>Отписаться</Button>
				: <Button variant="save" disabled={!currentUser} onClick={subscribeUser} className='author__sub'>Подисаться</Button>)

			}
			{
				isEditing &&
				<div className='author__buttons'>
					<Button variant="cancel" onClick={() => setIsEditing(false)} >Отмена</Button>
					<Button disabled={!((aboutInput || "").length && nameInput)} variant="save" onClick={editUserData}>Сохранить</Button>
				</div>
			}
		</div>
	);
}
export default AuthorBlock;