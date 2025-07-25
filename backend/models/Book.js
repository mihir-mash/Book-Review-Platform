const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  genre: {type: String, required: true},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

module.exports = mongoose.model('Book', BookSchema)