import { Link } from 'react-router-dom'

export default function Home() {
  return (
  <div>

    <div>
      <h1>Book Club</h1>
      <div>
        <Link to="/register">Register</Link>
        <Link to="/login">Log In</Link>
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem' }}>
      <div style={{ flex: 1, paddingRight: '2rem' }}>
        <p style={{ fontSize: '1.5rem', lineHeight: '1.75' }}>
          Welcome to Book Club, where stories come alive and readers connect!
          Dive into a world of curated reviews, recommendations, and lively discussions.
          Whether you're here to find your next favorite book or share your thoughts,
          you’re in the right place.
        </p>
      </div>
      <div style={{ flex: 1 }}>
        <img
          src="/book.jpg"
          alt="Reading setup"
          style={{ width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '8px' }}
        />
      </div>
    </div>

    {/* Footer */}
    <div>Made By Mihir Mashruwala</div>
  </div>
)
}