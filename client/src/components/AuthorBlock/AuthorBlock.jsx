import "./AuthorBlock.scss"
import Avatar from "../../assets/avatar_icon.png"
import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import { AuthContext } from "../../AuthContext"
import { Menu, MenuItem } from "../../components/Menu/Menu"
import axios from "../../axios"
import { useNavigate } from "react-router-dom";


const AuthorBlock = (props) => {
	const { currentUser, logout } = useContext(AuthContext)
	let author = props.author || {};
	const navigate = useNavigate();

	const [isEditing, setIsEditing] = useState(false);
	const [aboutInput, setAboutInput] = useState();
	const [nameInput, setNameInput] = useState();
	const [isSubscribed, setIsSubscribed] = useState(author.subscribersList ? author.subscribersList.includes(currentUser._id) : false);
	async function editUserData() {
		try {
			await axios.patch(`/user`, { id: currentUser._id, about: aboutInput, name: nameInput })
			author.name = nameInput;
			author.about = aboutInput;
			setIsEditing(false)
		} catch (error) {
			console.log(error)
		}
	}
	async function subscribeUser() {
		try {
			await axios.post('/subscribe', { id: currentUser?._id, receiverId: author._id })
			setIsSubscribed(true)
		} catch (error) {
			console.log(error)
		}
	}
	async function unSubscribeUser() {
		try {
			await axios.post('/unsubscribe', { id: currentUser?._id, receiverId: author._id })
			setIsSubscribed(false)
		} catch (error) {
			console.log(error)
		}
	}
	async function deleteUser() {
		try {
			await axios.delete(`/user?id=${currentUser._id}`)
			navigate('/')
			logout()
		} catch (error) {
			console.log(error)
		}
	}
	const isYou = author?._id == currentUser?._id

	return (
		<div className='author'>
			{(props.options && isYou)
				? <div className='author__options'>
					<Menu >
						<div className='author__options-icon'>
							<span></span>
						</div>
						<MenuItem>
							<button onClick={() => { setIsEditing(true); setAboutInput(author.about); setNameInput(author.name) }} className='author__edit-icon'>
								Редактировать
							</button>
						</MenuItem>
						<MenuItem>
							<button onClick={deleteUser} className='author__edit-icon'>
								Удалить
							</button>
						</MenuItem>
					</Menu>
				</div>
				: <></>}

			<div className='author__info'>
				<img src={Avatar} alt="" />
				{isEditing ? <input value={nameInput} onChange={e => setNameInput(e.target.value)} /> : <Link to={`/user/${author._id}`}><span className="author__name">{author?.name}</span></Link>}
			</div>

			{isEditing ? <input value={aboutInput} onChange={e => setAboutInput(e.target.value)} /> : <div className='author__about'>{author?.about}</div>}
			{isYou ? <></> : (isSubscribed
				? <button disabled={!currentUser} onClick={unSubscribeUser} className='author__sub'>Отписаться</button>
				: <button disabled={!currentUser} onClick={subscribeUser} className='author__sub'>Подисаться</button>)

			}
			{
				isEditing ?
					<div className='author__buttons'>
						<button onClick={() => setIsEditing(false)} className=''>Отмена</button>
						<button onClick={editUserData} className=''>Сохранить</button>
					</div> : <></>
			}

		</div>
	);
}
export default AuthorBlock;
