let mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema

const ClassifySchema = new Schema({
  name: String
}, {collection: 'classify'})
ClassifySchema.plugin(autoIncrement.plugin, {
  model: 'Classif',
  field: 'classify_id',
  startAt: 1,
  incrementBy: 1
});

const Article = mongoose.model('classify', ClassifySchema);
module.exports = Classify
