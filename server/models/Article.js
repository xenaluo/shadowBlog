import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  aid: String,
  title: String,
  state: Number,
  author: String,
  current_name: String,
  publish_time: String,
  images: [],
  classify: String,
  content: String,
  label: [],
  is_top: Boolean,
  can_comment: Boolean
}, {collection: 'article'})
export default mongoose.model('Article', ArticleSchema)
