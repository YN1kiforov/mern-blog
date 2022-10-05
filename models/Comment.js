const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'BlogUser', },
  body: String,
  likesCount: { type: Number, default: 0 },
  postId: { type: Schema.Types.ObjectId },
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema)