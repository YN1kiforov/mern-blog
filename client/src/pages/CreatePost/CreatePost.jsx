import "./CreatePost.scss"
import Editor from "../../components/Editor/MyEditor";

const CreatePost = () => {
  
	return (
		<div className="create-post">
			<button className = ''>Загрузить превью</button>
			<img className="create-post__preview" src="" alt="" />
			<Editor/>
		</div>
	);
}
export default CreatePost;
