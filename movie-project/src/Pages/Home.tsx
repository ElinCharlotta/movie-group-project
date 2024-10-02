import React, { useState, useEffect } from 'react'
import { MovieCardProps } from '../Components/MovieCard/MovieCard'
import SimpleSlider from '../Components/SimpleSlider/SimpleSlider'

const Home: React.FC = () => {
  const [movies, setMovies] = useState<MovieCardProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('../../public/movies.json').then(res => {
      setMovies(res.default)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>

  const trendingMovies = movies.filter(movie => movie.isTrending)
  const recommendedMovies = movies
    .filter(movie => !movie.isTrending)
    .slice(4, 10)

  return (
    <div>
      <section>
        {trendingMovies.length > 0 ? (
          <>
            <h2>Trending</h2>
            <SimpleSlider movies={trendingMovies} />
            <h2>Recommended</h2>
            <SimpleSlider movies={recommendedMovies} />
          </>
        ) : (
          <p>No trending movies available.</p>
        )}
      </section>
    </div>
  )
}

export default Home
