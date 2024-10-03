import { useNavigate } from 'react-router-dom'
import './MovieCard.css'

export interface MovieCardProps {
  id: number
  title: string
  year: number
  rating: string
  actors?: string[]
  genre?: string
  synopsis?: string
  thumbnail: string
  isTrending?: boolean
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  year,
  rating,
  genre,
  thumbnail,
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/movie/${id}`)
  }

  return (
    <div className='card-container' onClick={handleClick}>
      <div className='thumbnail-wrapper'>
        <img src={thumbnail} alt={`${title} thumbnail`} />
        <h3>{title}</h3>
        <p className='year'>{year}</p>
        <div className='rating-overlay'>
          <p className='rating'>{rating}</p>
        </div>
      </div>
      <p className='movie-genre'>{genre}</p>
    </div>
  )
}

export default MovieCard