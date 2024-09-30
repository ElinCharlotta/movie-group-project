
import React, { useState, useEffect } from 'react'

interface MovieProps {
  title: string
  thumbnail: string
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('../../public/movies.json').then(res => {
      setMovies(res.default)
      setLoading(false)
    })
  }, []) // Add dependency array to run only once

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {movies.map((movie, index) => (
        <div key={index}>
          <h1>{movie.title}</h1>
          <img src={movie.thumbnail} alt={movie.title} />
        </div>
      ))}
    </div>

  )
}

export default Home
