import React, { useState, useEffect } from 'react'
import { MovieCardProps } from '../../Components/MovieCard/MovieCard'
import SimpleSlider from '../../Components/SimpleSlider/SimpleSlider'
import Hero from '../../Components/Hero/Hero'
import './Home.css'

interface Movie {
  title: string
  year: number
  rating: string
  actors: string[]
  genre: string
  synopsis: string
  thumbnail: string
  isTrending?: boolean
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<MovieCardProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('../../data/movies.json').then(res => {
      const moviesWithId: MovieCardProps[] = res.default.map((movie: Movie, index: number) => ({
        ...movie,
        id: index + 1 // Add an id starting from 1
      }))
      setMovies(moviesWithId)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>

  const trendingMovies = movies.filter(movie => movie.isTrending)
  const recommendedMovies = movies.filter(movie => !movie.isTrending).slice(0, 10)
  
  const heroMovie = movies.filter(movie => !movie.isTrending)[12] 

  return (
    <div>
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
