import "./CreatePost.scss"
import Editor from "../../components/Editor/MyEditor";
import { useLocation } from "react-router-dom"
import { useState, useContext } from "react";
import axios from "../../axios"
import { AuthContext } from "../../AuthContext"
const CreatePost = () => {
	const { currentUser } = useContext(AuthContext)
	const state = useLocation().state;
	const [body, setBody] = useState(state?.title || "");
	const [title, setTitle] = useState(state?.desc || "");
	const submitHandler = async () => {
		const res = await axios.post('/post', { title, author: currentUser._id, body })
		console.log(res)
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
