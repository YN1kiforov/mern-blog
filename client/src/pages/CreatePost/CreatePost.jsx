import "./CreatePost.scss"
import Editor from "../../components/Editor/MyEditor";
import { useState, useContext } from "react";
import axios from "../../axios"
import { AuthContext } from "../../AuthContext"
const CreatePost = () => {
	const { currentUser } = useContext(AuthContext)
	const [body, setBody] = useState("");
	const [title, setTitle] = useState("");
	const submitHandler = async () => {
		await axios.post('/post', { title, author: currentUser._id, body })
	}

	return (
		<div className="create-post">
			<button className=''>Загрузить превью</button>

			<img className="create-post__preview" src="" alt="" />
			<Editor setBody={setBody} setTitle={setTitle} body={body} title={title} />
			<button onClick={submitHandler} className=''>Отправить статью</button>
		</div>
	);
}
export default CreatePost;
