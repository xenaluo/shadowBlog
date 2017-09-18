let mongoose = require('mongoose')

const Schema = mongoose.Schema

const ClassifySchema = new Schema({
    name: String,
  }
}, {collection: 'classify'})
const User = mongoose.model('Classify', ClassifySchema)
module.exports = Classify
