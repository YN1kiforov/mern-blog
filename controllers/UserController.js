const User = require("../models/User");

exports.register = async (req, res) => {
	try {
		console.log(req.body)
		const { name, email, password } = req.body
		const user = new User({ email, password, name })
		await user.save()
		res.status(200).json({ message: 'vse norm', user })
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
		}else {
			res.status(500).json({ message: 'ne norm' })

		}

	} catch (e) {
		res.status(500).json({ message: `error ${e}` })
	}
}

