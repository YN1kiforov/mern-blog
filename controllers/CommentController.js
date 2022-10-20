const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.getComments = async (req, res) => {
	try {
		const { limit, part, postId } = req.query
		const comments = await Comment.find({ postId: postId }).populate({
			path: 'author',
			select:
				'name avatarUrl',
		})
		//const filteredcomments = posts.slice(posts.length - (limit || 0))
		res.json({ message: `norm :))`, comments })

	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}

exports.postComment = async (req, res) => {
	try {
		const { postId, author, body } = req.body

		const comment = new Comment({ postId, author, body })
		await comment.save()
		const newComment = await Comment.findOne({ _id: comment._id }).populate({
			path: 'author',
			select:
				'name avatarUrl',
		})
		const post = await Post.findById(postId)
		await Post.updateOne({ _id: postId }, {$set:{commentsCount: post.commentsCount + 1}})
		res.json({ message: 'norm', comment: newComment })

	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
exports.patchComment = async (req, res) => {
	try {
		const { body, id } = req.body
		await Comment.updateOne({ _id: id }, { $set: { body } })
		res.json({ message: 'norm' })
	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
exports.deleteComment = async (req, res) => {
	try {
		const { id } = req.query;
		await Comment.deleteOne({ _id: id })
		res.json({ message: 'norm' })
	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
