import React, { useState, useEffect } from 'react'
import SimpleSlider from '../Components/SimpleSlider/SimpleSlider'
import './Bookmarked.css'

interface Movie {
  title: string
  year: number
  actors: string[]
  genre: string
  synopsis: string
  thumbnail: string
  rating: string
  isTrending: boolean
}

interface BookmarkedProps {
  bookmarkedMovies: string[]
  toggleBookmark: (movieTitle: string) => void
}

const Bookmarked: React.FC<BookmarkedProps> = ({
  bookmarkedMovies,
  toggleBookmark,
}) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('../data/movies.json').then(res => {
      setMovies(res.default)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className='loading'>Loading...</div>

  const filteredMovies = movies.filter(movie =>
    bookmarkedMovies.includes(movie.title),
  )

  return (
    <div className='bookmarked-container'>
      <h1 className='bookmarked-title'>Bookmarked Movies</h1>
      {filteredMovies.length > 0 ? (
        <SimpleSlider
          movies={filteredMovies.map(movie => ({
            ...movie,
            isBookmarked: true,
            onBookmark: () => toggleBookmark(movie.title),
          }))}
        />
      ) : (
        <p className='no-bookmarks'>No bookmarked movies yet.</p>
      )}
    </div>
  )
}

export default Bookmarked
