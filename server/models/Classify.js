import mongoose from 'mongoose'
// let autoIncrement = require('mongoose-auto-increment')
const Schema = mongoose.Schema

const ClassifySchema = new Schema({
  name: String
}, {collection: 'classify'})

export default mongoose.model('Classify', ClassifySchema)
