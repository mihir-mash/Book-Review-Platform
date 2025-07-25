  import { useState } from 'react'
  import axios from 'axios'
  import { useNavigate } from 'react-router-dom'

  function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
      e.preventDefault()
      try {
        const res = await axios.post('http://localhost:5000/auth/login', {email, password})
        localStorage.setItem('token', res.data.token)
        navigate('/books')
      } catch (err) {
        setError('Invalid credentials')
      }
    }

    return (
      <div>
        <div>Book Club</div>

        <div>
          <form onSubmit={handleLogin}>
            <h2>Log In</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
            {error && <p>{error}</p>}
          </form>
        </div>

        <div>Made By Mihir Mashruwala</div>
      </div>
    )
  }

  export default Login