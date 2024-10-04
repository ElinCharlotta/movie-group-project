import React, { useState, useEffect } from 'react'
import SimpleSlider from '../../Components/SimpleSlider/SimpleSlider'
import Hero from '../../Components/Hero/Hero'
import './Home.css'

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

interface HomeProps {
  bookmarkedMovies: string[]
  toggleBookmark: (movieTitle: string) => void
}

const Home: React.FC<HomeProps> = ({ bookmarkedMovies, toggleBookmark }) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('../../../public/movies.json').then(res => {
      setMovies(res.default)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>

  const trendingMovies = movies.filter(movie => movie.isTrending)
  const recommendedMovies = movies
    .filter(movie => !movie.isTrending)
    .slice(0, 10)

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
            <SimpleSlider
              movies={trendingMovies.map(movie => ({
                ...movie,
                isBookmarked: bookmarkedMovies.includes(movie.title),
                onBookmark: toggleBookmark,
              }))}
            />
            <h2 className='recommended-header'>Recommended</h2>
            <SimpleSlider
              movies={recommendedMovies.map(movie => ({
                ...movie,
                isBookmarked: bookmarkedMovies.includes(movie.title),
                onBookmark: toggleBookmark,
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
