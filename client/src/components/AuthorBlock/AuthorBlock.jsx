import "./AuthorBlock.scss"
import Avatar from "../../assets/avatar_icon.png"
import { Link } from "react-router-dom"
import { useState, useContext, useRef } from "react"
import { AuthContext } from "../../AuthContext"
import { Menu, MenuItem } from "../../components/Menu/Menu"
import axios from "../../axios"
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button"
import Input from "../Input/Input"


const AuthorBlock = (props) => {
	const { currentUser, logout, setCurrentUser } = useContext(AuthContext)
	let author = props.author || {};
	const navigate = useNavigate();
	const [avatarUrl, setAvatarUrl] = useState(null);
	const inputFileRef = useRef(null);

	const [isEditing, setIsEditing] = useState(false);
	const [aboutInput, setAboutInput] = useState("");
	const [nameInput, setNameInput] = useState("");
	const [isSubscribed, setIsSubscribed] = useState(author.subscribersList ? author.subscribersList.includes(currentUser?._id) : false);
	async function editUserData() {
		try {
			if (!currentUser && aboutInput.length && nameInput) {
				return
			}
			await axios.patch(`/user`, { id: currentUser?._id, about: aboutInput, name: nameInput, avatarUrl })
			author.name = nameInput;
			author.about = aboutInput;
			author.avatarUrl = avatarUrl;
			setCurrentUser(prev => ({...prev,avatarUrl,}))
			setIsEditing(false)
		} catch (error) {
			console.log(error)
		}
	}
	function editHandler() {
		try {
			setAboutInput(author.about)
			setNameInput(author.name)
			setAvatarUrl(author.avatarUrl)
			setIsEditing(true)
		} catch (error) {
			console.log(error)
		}
	}
	async function subscribeUser() {
		try {
			if (currentUser) {
				await axios.post('/subscribe', { id: currentUser?._id, receiverId: author?._id })
				setIsSubscribed(true)
			}
		} catch (error) {
			console.log(error)
		}
	}
	async function unSubscribeUser() {
		try {
			if (currentUser) {
				await axios.post('/unsubscribe', { id: currentUser?._id, receiverId: author?._id })
				setIsSubscribed(false)
			}

		} catch (error) {
			console.log(error)
		}
	}

	const handleChangeFile = async (event) => {
		try {
			const formData = new FormData();
			const file = event.target.files[0];
			formData.append('image', file);
			const { data } = await axios.post('/upload', formData);
			setAvatarUrl(data.url);
		} catch (err) {
			console.warn(err);
			alert('Ошибка при загрузке файла!');
		}
	};
	async function deleteUser() {
		try {
			await axios.delete(`/user?id=${currentUser?._id}`)
			navigate('/')
			logout()
		} catch (error) {
			console.log(error)
		}
	}
	const isYou = author?._id === currentUser?._id

	return (
		<div className='author'>
			{(props.options && isYou)
				? <div className='author__options'>
					<Menu >
						<div className='author__options-icon'>
							<span></span>
						</div>
						<MenuItem onClick={editHandler}>Редактировать</MenuItem>
						<MenuItem onClick={deleteUser}>Удалить</MenuItem>
					</Menu>
				</div>
				: <></>}

			<div className='author__info'>
				{isEditing
					? <>
						<div className='author__image'>
							<input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
							<img className="author__avatar" src={avatarUrl ? `http://localhost:3001${avatarUrl}` : Avatar} alt="" />
							<button onClick={() => inputFileRef.current.click()}>+</button>
						</div>
						<Input value={nameInput} onChange={e => setNameInput(e.target.value)} />
						<Input value={aboutInput} onChange={e => setAboutInput(e.target.value)} />
					</>
					: <>
						<img className="author__avatar" src={author.avatarUrl ? `http://localhost:3001${author.avatarUrl}` : Avatar} alt="" />
						<Link to={`/user/${author?._id}`}>{author?.name}</Link>
						<div className='author__about'>{author?.about}</div>
					</>
				}
			</div>

			{isYou ? <></> : (isSubscribed
				? <Button variant="cancel" disabled={!currentUser} onClick={unSubscribeUser} className='author__sub'>Отписаться</Button>
				: <Button variant="save" disabled={!currentUser} onClick={subscribeUser} className='author__sub'>Подисаться</Button>)

			}
			{
				isEditing ?
					<div className='author__buttons'>
						<Button variant="cancel" onClick={() => setIsEditing(false)} >Отмена</Button>
						<Button disabled={!((aboutInput || "").length && nameInput)} variant="save" onClick={editUserData}>Сохранить</Button>
					</div> : <></>
			}

		</div>
	);
}
export default AuthorBlock;