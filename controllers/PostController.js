const Post = require("../models/Post");

exports.getAll = async (req, res) => {
	try {
		const posts = await Post.find()
		res.json({ message: `norm :))`, posts })

	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
exports.getPost = async (req, res) => {
	try {
		const postId = req.query.id
		const post = await Post.findById(postId)

		res.json({ message: `norm post`, post })

	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
exports.postPost = async (req, res) => {
	try {
		const { title } = req.body
		const post = new Post({ title })
		await post.save()
		res.json({ message: 'norm' })

	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
exports.patchPost = async (req, res) => {
	try {
		const { title, id } = req.body
		await Post.updateOne({ _id: id }, { $set: { title } })
		res.json({ message: 'norm' })
	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
exports.deletePost = async (req, res) => {
	try {
		const { id } = req.body;
		await Post.deleteOne({_id:id})
		res.json({ message: 'norm' })
	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
