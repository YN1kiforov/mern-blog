import "./CreatePost.scss"
import Editor from "../../components/Editor/MyEditor";
import { useState, useContext, useRef } from "react";
import axios from "../../axios"
import { AuthContext } from "../../AuthContext"
import { useNavigate } from "react-router-dom";
import MultipleSelect from "../../components/MultipleSelect/MultipleSelect"

const tags = [
	{ value: "puteshestviya", label: "Путешествия" },
	{ value: "eda", label: "еда" },
	{ value: "jizn", label: "Жизнь" },
	{ value: "programmirovanie", label: "Программирование" },
]


const CreatePost = () => {
	const { currentUser, enqueueSnackbar } = useContext(AuthContext)
	const [optionSelected, setOptionSelected] = useState([]);

	const [body, setBody] = useState("");
	const [imageUrl, setImageUrl] = useState('');
	const navigate = useNavigate();
	const inputFileRef = useRef(null);
	const [title, setTitle] = useState("");
	const submitHandler = async () => {
		if (body & title & imageUrl) {
			const tags = optionSelected.map(item => item.label)
			await axios.post('/post', { title, author: currentUser._id, body, imageUrl, tags })
			navigate("/")
		} else {
			enqueueSnackbar('Заполните все поля', { autoHideDuration: 1000, variant: 'error', })
		}
	}

	const handleChangeFile = async (event) => {
		try {
			const formData = new FormData();
			const file = event.target.files[0];
			formData.append('image', file);
			const { data } = await axios.post('/upload', formData);
			setImageUrl(data.url);
		} catch (err) {
			console.warn(err);
			alert('Ошибка при загрузке файла!');
		}
	};
	return (
		<div className="create-post">
			<input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
			<button onClick={() => inputFileRef.current.click()} > Загрузить превью</button>

			{imageUrl && (
				<>
					<button variant="contained" color="error" onClick={() => { setImageUrl(null) }}>
						Удалить
					</button>
					<div className="create-post__preview">
						<img
							src={`http://localhost:3001${imageUrl}`}
							alt="Uploaded"
						/>
					</div>
				</>
			)}
			<Editor setBody={setBody} setTitle={setTitle} body={body} title={title} />
			<h4>Выберите тэги статьи:</h4>
			<MultipleSelect setOptionSelected={setOptionSelected} optionSelected={optionSelected} options={tags}></MultipleSelect>
			<button onClick={submitHandler} className='create-post__button'>Отправить статью</button>
		</div>
	);
}
export default CreatePost;
