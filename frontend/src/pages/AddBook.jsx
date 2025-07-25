import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function AddBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/books', {
        title, author, genre
      }, {
        headers: {Authorization: `Bearer ${token}`}
      })

      setMessage('Book added successfully!')
      setTimeout(() => navigate('/books'), 1500)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error adding book')
    }
  }

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br/>
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        /><br/>
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        /><br/>
        <button type="submit">Add Book</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default AddBook