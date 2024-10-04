import './MovieCard.css'
//Vid varje thumbnail ska årtal och åldersgräns visas på filmen.

export interface MovieCardProps {
  title: string
  year: number
  rating: string
  actors?: string[]
  genre?: string
  thumbnail: string
  index?: number
  isTrending?: boolean
  synopsis?: string
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  year,
  rating,
  genre,
  thumbnail,
}) => {
  const fallbackThumbnail =
    'https://www.shutterstock.com/image-vector/illustration-35mm-film-frame-broken-600nw-293386859.jpg'

  return (
    <div className='card-container'>
      <div className='thumbnail-wrapper'>
        <img
          src={thumbnail}
          alt={`${title} thumbnail`}
          onError={e => (e.currentTarget.src = fallbackThumbnail)}
        />
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

//  Har med de sakerna ifrån "db.en" jag tänkte var användbart.
// har tagit med index, ifall man vill göra en delete eller liknande längre fram
//
