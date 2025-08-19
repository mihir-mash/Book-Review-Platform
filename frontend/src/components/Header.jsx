import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to={token ? "/books" : "/"} className="logo">
          Book Club
        </Link>
        <nav>
          {token ? (
            <>
              <Link to="/books" className="nav-link">Books</Link>
              <Link to="/add-book" className="nav-link">Add Book</Link>
              <button onClick={handleLogout} className="nav-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Log In</Link>
              <Link to="/register" className="nav-button">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;