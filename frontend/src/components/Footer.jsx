import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Book Club. All rights reserved.</p>
        <p className="footer-made-by">
          Made by Mihir Mashruwala
        </p>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/mihir-mashruwala/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/mihir-mash" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;