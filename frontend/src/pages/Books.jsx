import {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function Books() {
  const [books, setBooks] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBooks = async() => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(`http://localhost:5000/books`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setBooks(res.data)
      } 
      catch (err) {
        setError('Failed to fetch books')
      }
    }

    fetchBooks()
  }, [])

  return (
    <div>
      <h2>📖 All Books</h2>
      {error && <p>{error}</p>}

      {books.map((book) => (
        <div key={book._id}>
        <Link to={`/books/${book._id}`}>
          <h3>{book.title}</h3>
        </Link>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        </div>
      ))}

      <Link to="/add-book">
        <button>Add New Book</button>
      </Link>
    </div>
  )
}

export default Books