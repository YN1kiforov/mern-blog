const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, require: true },
  author: { type: Schema.Types.ObjectId, ref: 'BlogUser', },
  body: String,
  imageUrl: String,
  viewsCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  tags: { type: [String], default: [] },
  comments: { type: [Schema.Types.ObjectId], ref: 'Comment', }
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema)