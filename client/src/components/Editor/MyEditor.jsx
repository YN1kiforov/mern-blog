import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {useLocation} from "react-router-dom"
const Editor = () => {
	const state = useLocation().state;
	const [value, setValue] = useState(state?.title || "");
	const [title, setTitle] = useState(state?.desc || "");
	return (
		<div className="add">
			<div className="content">
				<input
					type="text"
					placeholder="Title"
					onChange={(e) => setTitle(e.target.value)}
				/>
				<div className="editorContainer">
					<ReactQuill
						className="editor"
						theme="snow"
						value={value}
						onChange={setValue}
					/>
				</div>
			</div>
		</div>
	);
};

export default Editor;