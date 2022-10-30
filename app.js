const express = require('express')
const app = express()
const port = process.env.PORT || 3001;
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');

const user = require('./routes/user')
const comment = require('./routes/comment')
const post = require('./routes/post')

const cors = require('cors');

const mongoURI = "mongodb+srv://admin:admin@cluster0.xvhkn1b.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoURI).then((e) => { console.log(`DB has been connected`) }).catch((e) => { console.log(`DB Error ${e}`) })
const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		if (!fs.existsSync('uploads')) {
			fs.mkdirSync('uploads');
		}
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));
app.use(express.json())
app.use(cors({
	origin: '*'
}));

app.use('/', user)
app.use('/', comment)
app.use('/', post)

app.post('/upload', upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});
});


app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})