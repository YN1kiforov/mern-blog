import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./MyEditor.scss"
import Input from "../Input/Input"
import React from 'react'
type Props = {
	title: string,
	setTitle: any,
	body: string,
	setBody: any,
}
const Editor = ({ title, setTitle, body, setBody }: Props) => {
	return (
		<div className="editor">
			<div className="editor__content">
				<label className="">Название статьи:</label>
				<Input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
				/>
				<div className="">
					<ReactQuill
						theme="snow"
						value={body}
						onChange={setBody}
					/>
				</div>
			</div>
		</div>
	);
};

export default Editor;