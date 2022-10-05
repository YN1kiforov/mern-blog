const express = require('express')
const app = express()
const port = 3001;
const mongoose = require('mongoose');
const user = require('./routes/user')
const comment = require('./routes/comment')

const post = require('./routes/post')
const cors = require('cors');

const mongoURI = "mongodb+srv://admin:admin@cluster0.xvhkn1b.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoURI).then((e)=>{console.log(`DB has been connected`)}).catch((e)=>{console.log(`DB Error ${e}`)})

app.use(express.json())
app.use(cors({
    origin: '*'
}));
app.use('/', user)
app.use('/', comment)
app.use('/', post)


app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})