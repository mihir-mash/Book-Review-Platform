import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Books.css';

function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [genreFilter, setGenreFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const limit = 6;

  // This useEffect hook will now only run when 'page', 'authorFilter', or 'genreFilter' changes.
  // This prevents the infinite loop.
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const query = new URLSearchParams();
        if (authorFilter) query.append('author', authorFilter);
        if (genreFilter) query.append('genre', genreFilter);
        query.append('page', page);
        query.append('limit', limit);

        const res = await axios.get(`http://localhost:5000/books?${query.toString()}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setBooks(res.data);
      } catch (err) {
        setError('Failed to fetch books. The server might be down or you may need to log in again.');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page, authorFilter, genreFilter]); 

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // Setting the page to 1 here will trigger the useEffect to refetch the data.
    // We also need to check if filters are empty to avoid refetching with old values.
    if (page !== 1) {
      setPage(1);
    }
  };

  if (loading) {
    return <div className="centered-message"><h2>Loading books...</h2></div>;
  }

  if (error) {
    return <div className="centered-message error-message"><h2>Oops!</h2><p>{error}</p></div>;
  }

  return (
    <div>
      <div className="books-header">
        <h1>Explore the Library</h1>
        <form onSubmit={handleFilterSubmit} className="filter-form">
          <input
            className="input"
            type="text"
            placeholder="Filter by author"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          />
          <input
            className="input"
            type="text"
            placeholder="Filter by genre"
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.get.value)}
          />
          <button type="submit" className="button">Apply</button>
        </form>
      </div>

      {books.length > 0 ? (
        <div className="books-grid">
          {books.map((book) => (
            <Link to={`/books/${book._id}`} key={book._id} className="book-card">
              <div className="book-card-content">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <p className="book-genre">{book.genre}</p>
                <div className="book-rating">
                ⭐ {book.averageRating ? Number(book.averageRating).toFixed(1) : 'Not Rated'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="centered-message">
          <h3>No books found.</h3>
          <p>Try adjusting your filters or <Link to="/add-book">add a new book</Link> to the library!</p>
        </div>
      )}

      <div className="pagination">
        <button className="button" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>Page {page}</span>
        <button className="button" disabled={books.length < limit} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Books;