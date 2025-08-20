const express = require('express')
const Review = require('../models/Review')
const Book = require('../models/Book')
const auth = require('../middleware/authMiddleware')

const router = express.Router()

//Add review to a book
router.post('/:bookId/reviews', auth, async(req, res) => {
  const {review_text, rating} = req.body
  const {bookId} = req.params

  console.log('Incoming review POST:', {bookId, review_text, rating, user: req.user});

  try {
    const review = new Review({
      book: bookId,
      reviewer: req.user,
      review_text,
      rating
    })
    await review.save()
    res.status(201).json(review)
  } 
  catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({message: 'Error adding review'})
  }
})

//Get all reviews for a book
router.get('/:bookId/reviews', async(req, res) => {
  try {
    const reviews = await Review.find({book: req.params.bookId})
      .populate('reviewer', 'username')
      .sort({createdAt: -1})
    res.json(reviews)
  } 
  catch (err) {
  console.error(err)
  res.status(500).json({message: 'Error adding review'})
}
})

module.exports = router