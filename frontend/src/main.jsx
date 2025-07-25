import './index.css'
import Home from './pages/Home'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AddBook from './pages/AddBook'
import Register from './pages/Register'
import Login from './pages/Login'
import Books from './pages/Books'
import BookDetail from './pages/BookDetail'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetail />} />
    </Routes>
  </BrowserRouter>
)
