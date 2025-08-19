import { Link } from 'react-router-dom';
import './Home.css'; // We'll create this CSS file

export default function Home() {
  return (
    <div className="home-hero">
      <div className="hero-content">
        <h1 className="hero-title">Where Stories Come Alive</h1>
        <p className="hero-subtitle">
          Welcome to Book Club, a community for readers to connect.
          Dive into a world of curated reviews, recommendations, and lively discussions.
          Find your next favorite book or share your own thoughts.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="hero-button primary">Get Started</Link>
          <Link to="/login" className="hero-button secondary">Log In</Link>
        </div>
      </div>
      <div className="hero-image-container">
        <img
          src="/book.jpg"
          alt="A cozy reading setup"
          className="hero-image"
        />
      </div>
    </div>
  );
}