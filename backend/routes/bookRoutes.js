const express = require('express')
const Book = require('../models/book')
const auth = require('../middleware/authMiddleware')
const Review = require('../models/Review')

const router = express.Router()

//Add a new book (protected)
router.post('/', auth, async(req, res) => {
  const {title, author, genre} = req.body
  try {
    const book = new Book({title, author, genre, createdBy: req.user})
    await book.save()
    res.status(201).json(book)
  } 
  catch (err) {
    res.status(500).json({message: 'Error adding book'})
  }
})

//Get all books (with optional filters + pagination)
router.get('/', async(req, res) => {
  const {genre, author, page = 1, limit = 10} = req.query

  const query = {}
  if(genre) 
    query.genre = genre
  if(author) 
    query.author = author

  try {
    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    const booksWithRating = await Promise.all(
      books.map(async(book) => {
        const reviews = await Review.find({book: book._id})
        const avgRating =
          reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : null

        return {
          ...book._doc,
          averageRating: avgRating
        }
      })
    )

    res.json(booksWithRating)
  } 
  catch(err) {
    res.status(500).json({message: 'Error fetching books'})
  }
})

//Get one book by ID
router.get('/:id', async(req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) 
      return res.status(404).json({message: 'Book not found'})

    const reviews = await Review.find({book: book._id}).populate('reviewer', 'username')

    const avgRating =
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : null

    res.json({
      ...book._doc,
      averageRating: avgRating,
      reviews
    })
  } 
  catch (err) {
    res.status(500).json({message: 'Error getting book'})
  }
})

module.exports = router