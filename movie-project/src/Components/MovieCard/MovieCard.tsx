import React from 'react'
import { Bookmark } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './MovieCard.css'

export interface MovieCardProps {
  id: number
  title: string
  year: number
  rating: string
  thumbnail: string
  isBookmarked: boolean
  onBookmark: (title: string) => void
  actors?: string[]
  genre?: string
  synopsis?: string
  isTrending?: boolean
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  year,
  rating,
  thumbnail,
  isBookmarked,
  onBookmark,
  genre,
}) => {
  const navigate = useNavigate()
  const fallbackThumbnail =
    'https://www.shutterstock.com/image-vector/illustration-35mm-film-frame-broken-600nw-293386859.jpg'

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onBookmark(title)
  }

  const handleClick = () => {
    navigate(`/movie/${id}`)
  }

  return (
    <div className='card-container' onClick={handleClick}>
      <div className='thumbnail-wrapper'>
        <img
          src={thumbnail}
          alt={`${title} thumbnail`}
          className='thumbnail'
          onError={e => (e.currentTarget.src = fallbackThumbnail)}
        />
        <div className='rating-overlay'>
          <p className='rating'>{rating}</p>
        </div>
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
      </div>
      <h3 className='movie-title'>{title}</h3>
      <p className='year'>{year}</p>
      {genre && <p className='movie-genre'>{genre}</p>}
    </div>
  )
}

export default MovieCard
