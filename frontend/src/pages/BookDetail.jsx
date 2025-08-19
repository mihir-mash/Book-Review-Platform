import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './BookDetail.css'; // Create this new CSS file

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const token = localStorage.getItem('token');

  const fetchBookAndReviews = useCallback(async () => {
    try {
      const bookRes = await axios.get(`http://localhost:5000/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBook(bookRes.data);

      const reviewsRes = await axios.get(`http://localhost:5000/reviews/${id}/reviews`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(reviewsRes.data);
    } catch (err) {
      setError('Failed to load book details. Please go back and try again.');
    }
  }, [id, token]);

  useEffect(() => {
    fetchBookAndReviews();
  }, [fetchBookAndReviews]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    try {
      await axios.post(`http://localhost:5000/reviews/${id}/reviews`, {
        review_text: reviewText,
        rating: Number(rating)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviewText('');
      setRating(5);
      fetchBookAndReviews(); // Refetch everything to show the new review
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Error submitting review.');
    }
  };

  if (error) return <p className="error-message">{error}</p>;
  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="book-detail-container">
      <div className="book-info-card">
        <h2 className="book-detail-title">{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
      </div>

      <div className="reviews-section">
        <h3>Community Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to share your thoughts!</p>
        ) : (
          <div className="reviews-list">
            {reviews.map((r) => (
              <div key={r._id} className="review-card">
                <div className="review-rating">{'⭐'.repeat(r.rating)}</div>
                <p className="review-text">"{r.review_text}"</p>
                <p className="review-author">- {r.reviewer?.username || 'Anonymous'}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="add-review-section">
        <h4>Add Your Review</h4>
        <form onSubmit={handleReviewSubmit} className="review-form">
          <div className="input-group">
            <label htmlFor="reviewText">Review</label>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
              placeholder="What did you think of the book?"
            />
          </div>
          <div className="input-group">
            <label htmlFor="rating">Rating (1-5)</label>
            <input
              id="rating"
              className="input"
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">Submit Review</button>
          {submitError && <p className="error-message">{submitError}</p>}
        </form>
      </div>
    </div>
  );
}

export default BookDetail;