import React, { useState, useEffect } from 'react'
import SimpleSlider from '../Components/SimpleSlider/SimpleSlider'
import './Bookmarked.css'

interface Movie {
  id: number
  title: string
  year: number
  rating: string
  actors: string[]
  genre: string
  synopsis: string
  thumbnail: string
  isTrending?: boolean
}

interface BookmarkedProps {
  bookmarkedMovies: string[]
  toggleBookmark: (movieTitle: string) => void
}

const Bookmarked: React.FC<BookmarkedProps> = ({ bookmarkedMovies, toggleBookmark }) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('../data/movies.json').then(res => {
      const moviesWithId: Movie[] = res.default.map((movie: Omit<Movie, 'id'>, index: number) => ({
        ...movie,
        id: index + 1
      }))
      setMovies(moviesWithId)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="loading">Loading...</div>

  const filteredMovies = movies.filter(movie => bookmarkedMovies.includes(movie.title))

  return (
    <div className="bookmarked-container">
      <h1 className="bookmarked-title">Bookmarked Movies</h1>
      {filteredMovies.length > 0 ? (
        <div className="bookmarked-slider">
          <SimpleSlider
            movies={filteredMovies.map(movie => ({
              ...movie,
              isBookmarked: true,
              onBookmark: () => toggleBookmark(movie.title),
            }))}
          />
        </div>
      ) : (
        <p className="no-bookmarks">No bookmarked movies yet.</p>
      )}
    </div>
  )
}

export default Bookmarked