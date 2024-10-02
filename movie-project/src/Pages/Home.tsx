import React, { useState, useEffect } from 'react'
import MovieCard from '../Components/MovieCard/MovieCard'

interface MovieProps {
  title: string
  thumbnail: string
  year: number
}

const getTrendingMovies = (movies: MovieProps[]) => {
  return movies.slice(0, 6)
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

  const trendingMovies = getTrendingMovies(movies)

  return (
    <div>
      {/* Trending Section */}
      <section>
        <h2>Trending Movies</h2>
        <div className='carousel'>
          {trendingMovies.map((movie, index) => (
            <div key={index}>
              <h3>{movie.title}</h3>
              <img src={movie.thumbnail} alt={movie.title} />
            </div>
          ))}
        </div>
      </section>

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
