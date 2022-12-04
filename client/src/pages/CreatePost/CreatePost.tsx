import "./CreatePost.scss"
import Editor from "../../components/Editor/MyEditor";
import MultipleSelect from "../../components/MultipleSelect/MultipleSelect"
import Button from "../../components/Button/Button"

import * as React from 'react';
import { useCreatePost } from "../../hooks/useCreatePost";
const CreatePost = () => {
	const {
		tags, optionSelected, setOptionSelected, body, setBody, title,
		setTitle, imageUrl, setImageUrl, inputFileRef, submitHandler, handleChangeFile,
	} = useCreatePost()
	return (
		<div className="create-post">
			<input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
			<Button variant="loader" onClick={() => inputFileRef.current && inputFileRef.current.click()} > Загрузить превью</Button>

			{imageUrl && (
				<>
					<Button variant="contained" color="error" onClick={() => { setImageUrl(null) }}>
						Удалить
					</Button>
					<div className="create-post__preview">
						<img
							src={`${imageUrl}`}
							alt="Uploaded"
						/>
					</div>
				</>
			)}
			<Editor setBody={setBody} setTitle={setTitle} body={body} title={title} />
			<h4>Выберите тэги статьи:</h4>
			<MultipleSelect setOptionSelected={setOptionSelected} optionSelected={optionSelected} options={tags}></MultipleSelect>
			<Button variant="save" onClick={submitHandler} className='create-post__button'>Отправить статью</Button>
		</div>
	);
}
export default CreatePost;
