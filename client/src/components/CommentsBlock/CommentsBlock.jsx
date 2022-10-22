import "./CommentsBlock.scss"
import Comment from "../../components/Comment/Comment"
import axios from "../../axios"
import { useEffect, useState, useContext } from "react"
import Button from "../../components/Button/Button"
import { AuthContext } from "../../AuthContext"



const CommentsBlock = (props) => {
	const { currentUser } = useContext(AuthContext)
	const [commentValue, setCommentValue] = useState("");
	const [comments, setComments] = useState(null);

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(`/getComments?postId=${props.postId}`)
			setComments(data.comments)

		})()
	}, [props.postId]);

	async function sendComment() {
		try {
			if (commentValue) {
				let { data } = await axios.post("/comment", { postId: props.postId, author: props.currentUser._id, body: commentValue })
				setComments((prev) => [data.comment, ...prev])
				setCommentValue("")
			}
		} catch (error) {
			console.log(error)
		}
	}

	async function editComment(id, body) {
		try {
			await axios.patch(`/comment`, { id, body })
		} catch (error) {
			console.log(error)
		}
	}

	async function deleteComment(id) {
		try {
			await axios.delete(`/comment?id=${id}`)
			setComments(prev => prev.filter(com => com._id !== id))
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className="comments">
			<div>
				<h4 htmlFor="Ваш коментарий">Напишите коментарий</h4>
				<textarea disabled={!currentUser?._id} onChange={(e) => { setCommentValue(e.target.value) }} value={commentValue} cols="30" rows="10" placeholder="Напишите комментарий"></textarea>
				<Button onClick={sendComment}>Отправить</Button>
			</div>
			{
				(comments && (comments.length !== 0)) ? <ul className="comments__list">
					<h4>Коментарии</h4>
					{comments.map((comment, index) => {
						return <li key={`${comment.body}_${index}`} ><Comment edit={editComment} delete={deleteComment} id={comment._id} body={comment.body} date={comment.createdAt} author={comment.author} /></li>
					})}
				</ul> : <h4 className='comments__list'>Коментарии не найдены</h4>
			}
		</div>
	);
}
export default CommentsBlock;