let mongoose = require('mongoose')
// let autoIncrement = require('mongoose-auto-increment')

const Schema = mongoose.Schema

const ClassifySchema = new Schema({
  name: String
}, {collection: 'classify'})
// ClassifySchema.plugin(autoIncrement.plugin, {
//   model: 'Classify',
//   field: 'ClassifyID',
//   startAt: 100000,
//   incrementBy: 10
// })
const Classify = mongoose.model('classify', ClassifySchema)
module.exports = Classify
