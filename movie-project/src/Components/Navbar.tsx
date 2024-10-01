import { Link } from 'react-router-dom'
import { Search, Projector, Menu } from 'lucide-react'
import { useState } from 'react'
import './Styles/Navbar.css'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className='navbar'>
      <div className='navbar-header'>
        <Projector color='white' size={40} />
        <button className='mobile-menu-toggle' onClick={toggleMenu}>
          <Menu size={12} />
        </button>
      </div>
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to='/' onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to='/bookmarked' onClick={() => setIsMenuOpen(false)}>
            Bookmarked
          </Link>
        </li>
        <li>
          <Link to='/categories' onClick={() => setIsMenuOpen(false)}>
            Categories
          </Link>
        </li>
      </ul>
      <div className='navbar-search'>
        <input type='text' placeholder='Search Movies...' />
        <button aria-label='Search'>
          <Search size={20} className='nav-icon' />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
