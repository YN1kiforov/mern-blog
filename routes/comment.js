const express = require('express')
const router = express.Router()
const Comment = require("../controllers/CommentController")

router.get('/getComments', Comment.getComments)
router.post('/comment', Comment.postComment)
router.patch('/comment', Comment.patchComment)
router.delete('/comment', Comment.deleteComment)
	
module.exports = router