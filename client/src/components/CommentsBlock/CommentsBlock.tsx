import "./CommentsBlock.scss"
import Comment from "../Comment/Comment"
import Button from "../Button/Button"
import * as React from 'react';

import { useCommentsBlock } from "../../hooks/useCommentsBlock"
type Props = {
	postId: string,
}
const CommentsBlock = ({ postId }: Props) => {
	const {
		currentUser, commentValue, setCommentValue, comments,
		 sendComment, editComment, deleteComment
	} = useCommentsBlock(postId)
	return (
		<div className="comments">
			<div>
				<h4>Напишите коментарий</h4>
				<textarea disabled={!currentUser?._id} onChange={(e) => { setCommentValue(e.target.value) }} value={commentValue} placeholder="Напишите комментарий"></textarea>
				<Button onClick={sendComment}>Отправить</Button>
			</div>
			{
				(comments
					&& (comments.length !== 0))
					? <ul className="comments__list">
						<h4>Коментарии</h4>
						{comments.map((comment, index) => {
							return <li key={`${comment.body}_${index}`} ><Comment edit={editComment} deleteComment={deleteComment} id={comment._id} body={comment.body} date={comment.createdAt} author={comment.author} /></li>
						})}
					</ul>
					: <h4 className='comments__list'>Коментарии не найдены</h4>
			}
		</div>
	);
}
export default CommentsBlock;