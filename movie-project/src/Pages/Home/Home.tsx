import React, { useState, useEffect } from 'react'
import { MovieCardProps } from '../../Components/MovieCard/MovieCard'
import SimpleSlider from '../../Components/SimpleSlider/SimpleSlider'
import Hero from '../../Components/Hero/Hero'
import './Home.css'

const Home: React.FC = () => {
  const [movies, setMovies] = useState<MovieCardProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('../../../public/movies.json').then(res => {
      setMovies(res.default)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>

  const trendingMovies = movies.filter(movie => movie.isTrending)

  const nonTrendingMovies = movies.filter(movie => !movie.isTrending)
  nonTrendingMovies.sort(() => Math.random() - 0.5) 
  const recommendedMovies: MovieCardProps[] = nonTrendingMovies.slice(0, 10)

  const heroMovie = nonTrendingMovies[Math.floor(Math.random() * nonTrendingMovies.length)];

  return (
    <div>
      {/* Hero-sektion */}
      {heroMovie && (
        <Hero
          title={heroMovie.title}
          actors={heroMovie.actors}
          year={heroMovie.year}
          synopsis={heroMovie.synopsis}
          backgroundImage={heroMovie.thumbnail}
          rating={heroMovie.rating}
        />
      )}

      {/* Sektion för trending och recommended movies */}
      <section>
        {trendingMovies.length > 0 ? (
          <>
            <h2 className='trending-header'>Trending</h2>
            <SimpleSlider movies={trendingMovies} />
            <h2 className='recommended-header'>Recommended</h2>
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
