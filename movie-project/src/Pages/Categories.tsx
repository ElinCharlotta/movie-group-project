import React, { useState, useEffect } from 'react'
import "./Catagories.css"

interface MovieProps {
  title: string
  thumbnail: string
  genre: string
  year: number
  rating: string
  synopsis: string
}

const Categories: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [filterCategory, setFilterCategory] = useState<MovieProps[]>([])
  const [totalMovies, setTotalMovies] = useState<MovieProps[]>([])

  useEffect(() => {
    import('../data/movies.json').then(res => {
      setMovies(res.default)
      setFilterCategory(res.default)
      setTotalMovies(res.default)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="loading">Loading...</div>

  const categoryItems = filterCategory.map(item => item.genre)
  const filterbarData = [...new Set(categoryItems)]

  const handleCategoryData = (value: string) => {
    const updatedProductData = totalMovies.filter(item => item.genre === value)
    setMovies(updatedProductData)
    
  }

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h2 className="categories-title">Movie Categories</h2>
        <p className="categories-subtitle">Explore movies by genre</p>
      </div>

      <div className="categories-filter">
        <button className="category-btn" onClick={() => setMovies(totalMovies)}>All</button>
        {filterbarData.map((value, index) => (
          <button
            key={`filter-${index}`}
            onClick={() => handleCategoryData(value)}
            className="category-btn"
          >
            {value}
          </button>
        ))}
      </div>

      <div className="categories-grid">
        {movies.map((movie, index) => (
          <div key={index} className="movie-card">
            <img src={movie.thumbnail} alt={movie.title} className="movie-thumbnail" />
            <div className="movie-content">
              <h3 className="movie-title">{movie.title}</h3>
              <div className="movie-info">
                <span>{movie.year}</span>
                <span>{movie.rating}</span>
              </div>
              <p className="movie-synopsis">{movie.synopsis}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories


