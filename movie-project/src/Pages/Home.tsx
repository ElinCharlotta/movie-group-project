import React, { useState, useEffect } from 'react'
import MovieCard from '../Components/MovieCard/MovieCard'

interface MovieProps {
  title: string
  thumbnail: string
  year: number
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('../../public/movies.json').then(res => {
      setMovies(res.default)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {movies.map((movie, index) => (
        <MovieCard
          key={index}
          title={movie.title}
          thumbnail={movie.thumbnail}
          year={movie.year}
          index={index}
        />
      ))}
    </div>
  )
}

export default Home
