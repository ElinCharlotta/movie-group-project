import './MovieCard.css'

export interface MovieCardProps {
  title: string
  year: number
  rating?: string
  actors?: string[]
  genre?: string
  thumbnail: string
  index?: number
  isTrending?: boolean
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  year,
  genre,
  thumbnail,
}) => {
  return (
    <div className='card-container'>
      <h3>
        {title} ({year})
      </h3>
      <img src={thumbnail} alt={`${title} thumbnail`} />
      <p className='movie-genre'>Genre: {genre}</p>
    </div>
  )
}

export default MovieCard

//  Har med de sakerna ifrån "db.en" jag tänkte var användbart.
// har tagit med index, ifall man vill göra en delete eller liknande längre fram
//
