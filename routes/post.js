const express = require('express')
const router = express.Router()
const Post = require("../controllers/PostController")

router.get('/getAll', Post.getAll)
router.get('/post', Post.getPost)
router.post('/post', Post.postPost)
router.patch('/post', Post.patchPost)
router.delete('/post', Post.deletePost)
	
module.exports = router