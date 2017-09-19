let mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

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
  can_comment: Boolean,
  is_draft: Boolean
}, {collection: 'comments'})

ArticleSchema.plugin(autoIncrement.plugin, {
  model: 'Article',
  field: 'aid',
  startAt: 1,
  incrementBy: 1
});
var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article
