import { Link } from 'react-router-dom';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <p className='footer-text'>© 2024 MovieBuff. Alla rättigheter förbehållna.</p>
      <nav aria-label="Footer navigation">
        <Link to="/">Hem</Link>
        <Link to="/categories">Kategorier</Link>
        <Link to="/bookmarked">Bokmärkta</Link>
      </nav>
    </footer>
  );
};

export default Footer;
