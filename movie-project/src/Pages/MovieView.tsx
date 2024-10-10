import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Bookmark } from 'lucide-react'

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
  const { id } = useParams<{ id: string }>()

  const [movie, setMovie] = useState<Movie | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
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
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='md:w-1/3'>
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
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className='w-full h-auto rounded-lg shadow-lg'
          />
        </div>
        <div className='md:w-2/3'>
          <h1 className='text-3xl font-bold mb-4'>{movie.title}</h1>
          <p className='text-xl mb-2'>Year: {movie.year}</p>
          <p className='text-xl mb-2'>Rating: {movie.rating}</p>
          <p className='text-xl mb-2'>Genre: {movie.genre}</p>
          <p className='text-xl mb-4'>Actors: {movie.actors.join(', ')}</p>
          <h2 className='text-2xl font-semibold mb-2'>Synopsis</h2>
          <p className='text-lg'>{movie.synopsis}</p>
        </div>
      </div>
    </div>
  )
}