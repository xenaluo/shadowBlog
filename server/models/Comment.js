let mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  atricle_id: String,
  username: String,
  comment: String,
}
}, {collection: 'classify'})
const Comment = mongoose.model('Classify', CommentSchema)
module.exports = Comment