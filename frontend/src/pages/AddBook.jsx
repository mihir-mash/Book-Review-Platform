import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await api.post('/books', {
        title, author, genre
      });

      setMessage('Book added successfully! Redirecting...');
      setTimeout(() => navigate('/books'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding book.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Add a New Book</h2>
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="input"
            type="text"
            placeholder="e.g., The Great Gatsby"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            className="input"
            type="text"
            placeholder="e.g., F. Scott Fitzgerald"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="genre">Genre</label>
          <input
            id="genre"
            className="input"
            type="text"
            placeholder="e.g., Fiction"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">Add Book</button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default AddBook;