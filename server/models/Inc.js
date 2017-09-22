import mongoose from 'mongoose'
const Schema = mongoose.Schema

const incSchema = new Schema({
  name: String,
  id: Number
}, {collection: 'incs'})

export default mongoose.model('Incs', incSchema)
