import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Projector, Menu, Film } from 'lucide-react'
import Fuse from 'fuse.js'
import './Styles/Navbar.css'
import moviesData from '../data/movies.json'

interface Movie {
  id: number
  title: string
  year: number
  rating: string
  actors: string[]
  genre: string
  synopsis: string
  thumbnail: string
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [movies] = useState<Movie[]>(moviesData.map((movie, index) => ({ ...movie, id: index + 1 })))
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([])
  const navigate = useNavigate()

  const fuse = useMemo(
    () =>
      new Fuse(movies, {
        keys: ['title', 'actors', 'genre'],
        threshold: 0.3,
        includeScore: true,
      }),
    [movies],
  )

  useEffect(() => {
    if (searchTerm) {
      const results = fuse.search(searchTerm)
      setFilteredMovies(results.map(result => result.item))
    } else {
      setFilteredMovies([])
    }
  }, [searchTerm, fuse])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.onerror = null
    e.currentTarget.style.display = 'none'
    e.currentTarget.nextElementSibling?.classList.remove('hidden')
  }

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`)
    setSearchTerm('')
  }

  return (
    <nav className='navbar'>
      <div className='navbar-header'>
        <Projector
          color='white'
          size={40}
          className='nav-icon'
          data-testid='app-logo'
        />
        <button
          className='mobile-menu-toggle'
          onClick={toggleMenu}
          aria-label='Toggle menu'
          data-testid='mobile-menu-toggle'
        >
          <Menu size={40} />
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
        <input
          type='search'
          placeholder='Search Movies...'
          value={searchTerm}
          onChange={handleSearch}
          aria-label='Search movies'
        />
        <button aria-label='Search'>
          <Search size={20} className='nav-icon' />
        </button>
      </div>
      {searchTerm && (
        <div className='search-results' role='listbox'>
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className='search-result-item'
              role='option'
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className='search-result-poster-container'>
                <img
                  src={movie.thumbnail}
                  alt={`${movie.title} poster`}
                  className='search-result-poster'
                  onError={handleImageError}
                />
                <div className='search-result-poster-fallback hidden'>
                  <Film size={40} />
                </div>
              </div>
              <div className='search-result-info'>
                <span className='search-result-title'>{movie.title}</span>
                <span className='search-result-year'>({movie.year})</span>
                <span className='search-result-genre'>{movie.genre}</span>
              </div>
            </div>
          ))}
          {filteredMovies.length === 0 && (
            <div className='no-results'>No movies found</div>
          )}
        </div>
      )}
    </nav>
  )
}