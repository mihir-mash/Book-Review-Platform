import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

function BookDetail() {
  const {id} = useParams()
  const [book, setBook] = useState(null)
  const [reviews, setReviews] = useState([])
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(5)
  const [error, setError] = useState('')

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchData = async() => {
      try {
        const resBook = await axios.get(`http://localhost:5000/books/${id}`, {
          headers: {Authorization: `Bearer ${token}`}
        })
        setBook(resBook.data)

        const resReviews = await axios.get(`http://localhost:5000/reviews/${id}/reviews`, {
          headers: {Authorization: `Bearer ${token}`}
        })
        setReviews(resReviews.data)
      } 
      catch (err) {
        setError('Failed to load book or reviews')
      }
    }

    fetchData()
  }, [id])

  const handleReviewSubmit = async(e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:5000/reviews/${id}/reviews`, {
        review_text: reviewText,
        rating: Number(rating)
      }, {
        headers: {Authorization: `Bearer ${token}`}
      })

      setReviewText('')
      setRating(5)

      const resUpdated = await axios.get(`http://localhost:5000/reviews/${id}/reviews`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      setReviews(resUpdated.data)
    } 
    catch (err) {
      setError('Error submitting review')
    }
  }

  if (error) 
    return <p>{error}</p>
  if (!book) 
    return <p>Loading...</p>

  return (
    <div>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>

      <h3>Reviews</h3>
      {reviews.length === 0 ? <p>No reviews yet.</p> : (
        <ul>
          {reviews.map((r) => (
            <li key={r._id}>
              {r.review_text} - <strong>{r.rating}/5</strong> by {r.reviewer?.username || 'Anonymous'}
            </li>
          ))}
        </ul>
      )}

      <h4>Add Review</h4>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          placeholder="Write your review"
        /><br/>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        /><br/>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  )
}

export default BookDetail