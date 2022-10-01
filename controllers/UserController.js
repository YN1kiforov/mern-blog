const User = require("../models/User");

exports.register = async (req, res) => {
	try {
		const { email, password } = req.body
		const user = new User({ email, password })
		await user.save()
		res.json({ message: 'norm' })
	} catch (e) {
		res.json({ message: `error ${e}` })
	}
}
exports.login = async (req, res) => {
	try {
		const { email } = req.body
		const user = await User.findOne({ email })
		if (user) {
			res.json({ message: 'norm' })
		}
		res.json({ message: 'norm' })

	} catch (e) {
		res.json({ message: `error ${e}` })
	}
}

