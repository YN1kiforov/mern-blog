import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./MyEditor.scss"
import Input from "../../components/Input/Input"

const Editor = (props) => {
	return (
		<div className="editor">
			<div className="editor__content">
				<label className="">Название статьи:</label>
				<Input
					type="text"
					placeholder="Title"
					value={props.title}
					onChange={(e) => props.setTitle(e.target.value)}
				/>
				<div className="">
					<ReactQuill
						theme="snow"
						value={props.body}
						onChange={props.setBody}
					/>
				</div>
			</div>
		</div>
	);
};

export default Editor;