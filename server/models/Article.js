let mongoose = require('mongoose')

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  id: String,
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

},{collection: 'comments'});

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article