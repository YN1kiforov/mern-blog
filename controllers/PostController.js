const User = require("../models/User");
const Post = require("../models/Post");
const mongoose = require("mongoose")
exports.getAll = async (req, res) => {
	try {
		const { limit, category, search, user, lastPostNumber } = req.query
		let match = {};
		if (category && (category !== "null")) {
			match = { tags: category }
		} else if (search && (search !== "null")) {
			match = { $text: { $search: search } }
		} else if (user && (user !== "null")) {
			match = { author: mongoose.Types.ObjectId(user) }
		}
		if (lastPostNumber && (lastPostNumber !== "null")) {
			match = { ...match, number: { $lt: lastPostNumber } }
		}
		pipeline = [
			{ $match: match },
			{ $sort: { 'number': -1 } }
		]

		const posts = await Post.aggregate(pipeline).limit(Number(limit) || 3);
		await Post.populate(posts, { path: "author", select: 'name avatarUrl' })

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
		await Post.updateOne({ _id: postId }, { $set: { viewsCount: post.viewsCount + 1 } });
		res.json({ message: `norm post`, post })

	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
exports.postPost = async (req, res) => {
	try {
		const { title, author, body, imageUrl, tags } = req.body
		const lastPost = (await Post.find().sort({ 'number': -1 }))[0]
		const post = await new Post({ title, author, body, imageUrl, tags, number: lastPost.number + 1 })
		await post.save();
		(async function sendNotification() {
			const Author = await User.findById(author)
			Author.subscribersList.forEach(async userId => {
				const user = await User.findById(userId);
				newNotificationsList = [post._id, ...user.notificationsList]
				newNotificationsList.length = 10
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
		const { postId, title, body, imageUrl, tags } = req.body
		await Post.updateOne({ _id: postId }, { $set: { title, body, imageUrl, tags } })
		res.json({ message: 'norm' })
	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
exports.deletePost = async (req, res) => {
	try {
		const { authorId, id } = req.query;
		console.log(req.query)
		await Post.deleteOne({ _id: id });
		(async function deleteNotification() {
			const Author = await User.findById(authorId)
			Author.subscribersList.forEach(async userId => {
				const user = await User.findById(userId);
				newNotificationsList = user.notificationsList.filter(post => post._id != id)
				await User.updateOne({ _id: userId }, { $set: { notificationsList: newNotificationsList } })
			})
		})()
		res.json({ message: 'norm' })
	} catch (e) {
		res.status(200).json({ message: `error ${e}` })
	}
}
