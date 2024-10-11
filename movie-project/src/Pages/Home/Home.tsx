import React, { useState, useEffect, useMemo, useCallback } from 'react'
import SimpleSlider from '../../Components/SimpleSlider/SimpleSlider'
import Hero from '../../Components/Hero/Hero'
import './Home.css'

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

  const trendingMovies = useMemo(() => movies.filter(movie => movie.isTrending), [movies])
  const nonTrendingMovies = useMemo(() => movies.filter(movie => !movie.isTrending), [movies])

  const recommendedMovies = useMemo(() => {
    const shuffledMovies = [...nonTrendingMovies].sort(() => Math.random() - 0.5)
    return shuffledMovies.slice(0, 10)
  }, [nonTrendingMovies])
  
  const heroMovie = useMemo(() => 
    nonTrendingMovies.length > 0
      ? nonTrendingMovies[Math.floor(Math.random() * nonTrendingMovies.length)]
      : null,
    [nonTrendingMovies]
  )

  const handleBookmark = useCallback((movieTitle: string) => {
    toggleBookmark(movieTitle)
  }, [toggleBookmark])

  if (loading) {
    return <div>Loading...</div>
  }

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
  {/* Visa Trending Movies */}
  {trendingMovies.length > 0 ? (
    <>
      <h2 className='trending-header'>Trending</h2>
      <SimpleSlider
     
        movies={trendingMovies.map(movie => ({
          ...movie,
          isBookmarked: bookmarkedMovies.includes(movie.title),
          onBookmark: handleBookmark,
          ariaLabel: 'Trending',
        }))}
      />
    </>
  ) : (
    <p>No trending movies available.</p>
  )}

  {/* Visa Recommended Movies */}
  {recommendedMovies.length > 0 ? (
    <>
      <h2 className='recommended-header'>Recommended</h2>
      <SimpleSlider
      
        movies={recommendedMovies.map(movie => ({
          ...movie,
          isBookmarked: bookmarkedMovies.includes(movie.title),
          onBookmark: handleBookmark,
          ariaLabel: 'Recommended'
        }))}
      />
    </>
  ) : (
    <p>No recommended movies available.</p>
  )}
</section>
</div>
  )
}
export default Home