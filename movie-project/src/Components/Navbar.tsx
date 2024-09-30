import { Link } from 'react-router-dom'
import { Search, Projector } from 'lucide-react'
import './Styles/Navbar.css'

const Navbar: React.FC = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-header'>
        <Projector color='white' size={40} />
      </div>
  
      <ul className='navbar-links'>
        <Link to='/'>Home</Link>
        <Link to='/bookmarked'>Bookmarked</Link>
        <Link to='/categories'>Categories</Link>
      </ul>
      <div className='navbar-search'>
            <input type="text" placeholder='Search Movies...' />
            <button aria-label='Search'>
                <Search className='h-4 w-4'/>
            </button>
      </div>
    </nav>
  )
}

export default Navbar
