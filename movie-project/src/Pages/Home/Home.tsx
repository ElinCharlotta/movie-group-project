import React, { useState, useEffect } from 'react'
import SimpleSlider from '../../Components/SimpleSlider/SimpleSlider'
import Hero from '../../Components/Hero/Hero'
import './Home.css'
import { MovieCardProps } from '../../Components/MovieCard/MovieCard'

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

interface HomeProps {
  bookmarkedMovies: string[]
  toggleBookmark: (movieTitle: string) => void
}

const Home: React.FC<HomeProps> = ({ bookmarkedMovies, toggleBookmark }) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('../../data/movies.json').then(res => {
      const moviesWithId: Movie[] = res.default.map((movie: Omit<Movie, 'id'>, index: number) => ({
        ...movie,
        id: index + 1
      }))
      setMovies(moviesWithId)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>

  const trendingMovies = movies.filter(movie => movie.isTrending)


  const nonTrendingMovies = movies.filter(movie => !movie.isTrending);
  nonTrendingMovies.sort(() => Math.random() - 0.5); 
  const recommendedMovies: MovieCardProps[] = nonTrendingMovies.slice(0, 10).map(movie => ({
    ...movie,
    isBookmarked: bookmarkedMovies.includes(movie.title),
    onBookmark: () => toggleBookmark(movie.title)
  }));


  const heroMovie = nonTrendingMovies[Math.floor(Math.random() * nonTrendingMovies.length)];

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
            <SimpleSlider
              movies={trendingMovies.map(movie => ({
                ...movie,
                isBookmarked: bookmarkedMovies.includes(movie.title),
                onBookmark: () => toggleBookmark(movie.title),
              }))}
            />
            <h2 className='recommended-header'>Recommended</h2>
            <SimpleSlider
              movies={recommendedMovies.map(movie => ({
                ...movie,
                isBookmarked: bookmarkedMovies.includes(movie.title),
                onBookmark: () => toggleBookmark(movie.title),
              }))}
            />
          </>
        ) : (
          <p>No trending movies available.</p>
        )}
      </section>
    </div>
  )
}

export default Home