const Post = require("../models/Post");

exports.getAll = async (req, res) => {
	try {
		const { limit, category } = req.query
		console.log(limit)
		const posts = await Post.find().populate({
			path: 'author',
			select:
				'name avatarUrl',
		})
		const filteredPosts = posts.slice(posts.length - (limit || 0))
		res.json({ message: `norm :))`, posts: filteredPosts })

	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
exports.getPost = async (req, res) => {
	try {

		const postId = req.query.postId
		const post = await Post.findById(postId).populate({
			path: 'author',
			select:
				'name avatarUrl',
		})

		res.json({ message: `norm post`, post })

	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
exports.postPost = async (req, res) => {
	try {
		const { title, author, body } = req.body
		const post = new Post({ title, author, body })
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
		await Post.deleteOne({ _id: id })
		res.json({ message: 'norm' })
	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
