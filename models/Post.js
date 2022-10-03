const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, require: true },
  author: String,
  body: String,
  //comments: [{ body: String, date: Date }],

});

module.exports = mongoose.model("Post", PostSchema)