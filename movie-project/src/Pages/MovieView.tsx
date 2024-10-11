import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Bookmark } from 'lucide-react'
import fallbackImage from "/placeholder.png"
import './MovieView.css';

export interface Movie {
  id: number
  title: string
  year: number
  rating: string
  actors: string[]
  genre: string
  synopsis: string
  thumbnail: string
}

interface BookmarkedProps {
  bookmarkedMovies: string[]
  toggleBookmark: (movieTitle: string) => void
}

export default function MovieView({
  bookmarkedMovies,
  toggleBookmark,
}: BookmarkedProps) {
  console.log("hej")
  const { id } = useParams<{ id: string }>()
const location = useLocation()
console.log(location)
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    console.log(id)
    if (id) {
      import('../data/movies.json').then(res => {
        const movies: Movie[] = res.default.map(
          (m: Omit<Movie, 'id'>, index: number) => ({
            ...m,
            id: index + 1,
          }),
        )
        const selectedMovie = movies.find(m => m.id === Number(id))
        if (selectedMovie) {
          setMovie(selectedMovie)
          setIsBookmarked(bookmarkedMovies.includes(selectedMovie.title))
        }
      })
    }
  }, [id, bookmarkedMovies])

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (movie) {
      toggleBookmark(movie.title)
      setIsBookmarked(!isBookmarked)
    }
  }

  if (!movie) {
    return <div>Loading...</div>
  }

  return (
    <div className="container" >
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='bookmark-btn'>
          <button
            onClick={handleBookmark}
            data-testid='bookmark-button'
            className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
            aria-label={
              isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'
            }
          >
            <Bookmark
              className={`bookmark-icon ${isBookmarked ? 'filled' : ''}`}
            />
          </button>
          <div className='movie-container'>
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className='w-full h-auto rounded-lg shadow-lg'
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src=fallbackImage;
            }}
          />
        </div>
        </div>
        <div className='pop-up'>
          <h1 className='movie-title'>Title: {movie.title}</h1>
          <p className='year'>Year: {movie.year}</p>
          <p className='rating'>Rating: {movie.rating}</p>
          <p className='genre'>Genre: {movie.genre}</p>
          <p className='actors'>Actors: {movie.actors.join(', ')}</p>
          <h2 className='synopsis'>Synopsis</h2>
          <p className='text'>{movie.synopsis}</p>
        </div>
      </div>
    </div>
  )
}
