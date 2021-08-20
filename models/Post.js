const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'A post must have a title'],
  },
  content: {
    type: String,
    required: [true, 'A post must have a content'],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Post', PostSchema)
