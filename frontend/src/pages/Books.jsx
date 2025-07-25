import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Books() {
  const [books, setBooks] = useState([])
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const limit = 5

  const [genreFilter, setGenreFilter] = useState('')
  const [authorFilter, setAuthorFilter] = useState('')

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token')
      const query = new URLSearchParams()
      if (authorFilter) query.append('author', authorFilter)
      if (genreFilter) query.append('genre', genreFilter)
      query.append('page', page)
      query.append('limit', limit)

      const res = await axios.get(`http://localhost:5000/books?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setBooks(res.data)
    } catch (err) {
      setError('Failed to fetch books')
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [page])

  const handleFilterSubmit = (e) => {
    e.preventDefault()
    setPage(1)
    fetchBooks()
  }

  return (
    <div>
      <div>
        <h1>Book Club</h1>
        <Link to="/books">Books</Link>
      </div>

      <div>
        <form onSubmit={handleFilterSubmit}>
          <input
            type="text"
            placeholder="Filter by author"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by genre"
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          />
          <button type="submit">Apply Filters</button>
        </form>

        {error && <p>{error}</p>}

        <div>
          {books.map((book) => (
            <div key={book._id}>
              <Link to={`/books/${book._id}`}>
                <h3>{book.title}</h3>
              </Link>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Average Rating:</strong> {book.averageRating || 'No ratings yet'}</p>
            </div>
          ))}
        </div>

        <div >
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span>Page {page}</span>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>

        <div>
          <Link to="/add-book">
            <button>Add New Book</button>
          </Link>
        </div>
      </div>

      <div>
        Made By Mihir Mashruwala
      </div>
    </div>
  )
}

export default Books