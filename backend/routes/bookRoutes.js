const express = require('express')
const Book = require('../models/book')
const auth = require('../middleware/authMiddleware')

const router = express.Router()

//Add a new book (protected)
router.post('/', auth, async (req, res) => {
  const { title, author, genre } = req.body
  try {
    const book = new Book({ title, author, genre, createdBy: req.user })
    await book.save()
    res.status(201).json(book)
  } catch (err) {
    res.status(500).json({ message: 'Error adding book' })
  }
})

//Get all books (with optional filters + pagination)
router.get('/', async (req, res) => {
  const { genre, author, page = 1, limit = 10 } = req.query

  const query = {}
  if (genre) query.genre = genre
  if (author) query.author = author

  try {
    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    res.json(books)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books' })
  }
})

//Get one book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) return res.status(404).json({ message: 'Book not found' })
    res.json(book)
  } catch (err) {
    res.status(500).json({ message: 'Error getting book' })
  }
})

module.exports = router