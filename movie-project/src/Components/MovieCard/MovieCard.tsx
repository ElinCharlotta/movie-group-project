import React from 'react'
import { Bookmark } from 'lucide-react'
import './MovieCard.css'

export interface MovieCardProps {
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
  title, 
  year, 
  rating, 
  thumbnail, 
  isBookmarked, 
  onBookmark,
  genre
}) => {
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onBookmark(title)
  }

  return (
    <div className="card-container">
      <div className="thumbnail-wrapper">
        <img src={thumbnail} alt={title} className="thumbnail" />
        <div className="rating-overlay">
          <p className="rating">{rating}</p>
        </div>
        <button 
          onClick={handleBookmark}
          className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
          aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        >
          <Bookmark className={`bookmark-icon ${isBookmarked ? 'filled' : ''}`} />
        </button>
      </div>
      <h3 className="movie-title">{title}</h3>
      <p className="year">{year}</p>
      {genre && <p className="movie-genre">{genre}</p>}
    </div>
  )
}

export default MovieCard
//  Har med de sakerna ifrån "db.en" jag tänkte var användbart.
// har tagit med index, ifall man vill göra en delete eller liknande längre fram
//
