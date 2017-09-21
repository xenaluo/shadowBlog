import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  atricle_id: String,
  username: String,
  comment: String
}, {collection: 'comment'})

export default mongoose.model('Comment', CommentSchema)
