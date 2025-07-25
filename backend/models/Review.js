const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  review_text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true })

module.exports = mongoose.model('Review', ReviewSchema)