const User = require("../models/User");
const Post = require("../models/Post");

exports.register = async (req, res) => {
	try {
		const { name, email, password } = req.body
		const user = new User({ email, password, name })
		await user.save()
		res.status(200).json({ message: 'vse norm', user })
	} catch (e) {
		res.status(500).json({ message: `error ${e}` })
	}
}
exports.subscribe = async (req, res) => {
	try {
		const { id, receiverId } = req.body
		const user = await User.findById(receiverId)
		await User.updateOne({ _id: receiverId }, { $set: { subscribersList: [id, ...user.subscribersList] } })
		res.status(200).json({ message: 'vse norm' })
	} catch (e) {
		res.status(500).json({ message: `error ${e}` })
	}
}
exports.unsubscribe = async (req, res) => {
	try {
		const { id, receiverId } = req.body
		const user = await User.findById(receiverId)
		const newSubscribersList = user.subscribersList.filter(userId => userId != id)
		await User.updateOne({ _id: receiverId }, { $set: { subscribersList: newSubscribersList } })
		res.status(200).json({ message: 'vse norm' })
	} catch (e) {
		res.status(500).json({ message: `error ${e}` })
	}
}
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		const isValidPassword = password === user.password
		if (user && isValidPassword) {
			res.status(200).json({ message: 'norm', user })
		} else {
			res.status(500).json({ message: 'ne norm' })

		}

	} catch (e) {
		res.status(500).json({ message: `error ${e}` })
	}
}



exports.getUser = async (req, res) => {
	try {
		const { id } = req.query
		//const user = await User.findById(id)

		const user = await User.findById(id).populate({
			path: 'notificationsList',
			select:
				'title',
		})
		res.json({ message: `norm post`, user })

	} catch (e) {
		res.status(500).json({ message: `error ${e}` })
	}
}

exports.patchUser = async (req, res) => {
	try {
		const { id, name, about } = req.body
		await User.updateOne({ _id: id }, { $set: { name, about } })
		res.json({ message: `norm post` })

	} catch (e) {
		res.status(500).json({ message: `error ${e}` })
	}
}

exports.deleteUser = async (req, res) => {
	try {
		const { id } = req.query;
		const userPosts = await Post.find({ author: id })
		userPosts.forEach(async (post) => {
			await Post.deleteOne({ _id: post._id })
		})
		await User.deleteOne({ _id: id })

		res.json({ message: `norm` })
	} catch (e) {
		res.status(500).json({ message: `error ${e}` })
	}
}
