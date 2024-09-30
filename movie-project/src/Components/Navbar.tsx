import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import './Styles/Navbar.css'

const Navbar: React.FC = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-header'>
        <h1>app</h1>
      </div>
      <ul>
        <Link to='/'>Home</Link>
        <Link to='/bookmarked'>Bookmarked</Link>
        <Link to='/categories'>Categories</Link>
      </ul>
    </nav>
  )
}

export default Navbar
