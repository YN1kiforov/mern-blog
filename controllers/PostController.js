const User = require("../models/User");
const Post = require("../models/Post");

exports.getAll = async (req, res) => {
	try {
		const { limit, category, search, user } = req.query
		let findParameter = {};
		if (category && (category !== "null")) {
			findParameter = { tags: category }
		} else if (search && (search !== "null")) {
			findParameter = { $text: { $search: search } }
		} else if (user && (user !== "null")) {
			findParameter = { author: user }
		}

		const posts = await Post.find(findParameter).limit(limit || 3).sort({ 'createdAt': -1 }).populate({
			path: 'author',
			select:
				'name avatarUrl',
		})
		//const filteredPosts = posts.slice(posts.length - (limit || 0))
		res.json({ message: `norm`, posts })

	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
exports.getPost = async (req, res) => {
	try {

		const { postId } = req.query
		const post = await Post.findById(postId).populate({
			path: 'author',
			select:
				'name subscribersList avatarUrl',
		})

		res.json({ message: `norm post`, post })

	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
exports.postPost = async (req, res) => {
	try {
		const { title, author, body, imageUrl, tags } = req.body
		const post = await new Post({ title, author, body, imageUrl, tags })
		await post.save();
		(async function sendNotifications() {
			const author = await User.findById(author)
			author.subscribersList.forEach(async userId => {
				const user = await User.findById(user);
				newNotificationsList = [post._id, ...user.notificationsList].length = 10
				await User.updateOne({ _id: userId }, { $set: { notificationsList: newNotificationsList } })
			})
		})()
		res.json({ message: 'norm' })

	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
exports.patchPost = async (req, res) => {
	try {
		const { postId, title, body, imageUrl } = req.body
		await Post.updateOne({ _id: postId }, { $set: { title, body, imageUrl } })
		res.json({ message: 'norm' })
	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
exports.deletePost = async (req, res) => {
	try {
		const { id } = req.query;
		await Post.deleteOne({ _id: id })
		res.json({ message: 'norm' })
	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
