interface MovieCardProps {
  title: string
  year: number
  rating?: string
  actors?: string[]
  genre?: string
  thumbnail: string
  index: number
  synopsis?: string[]
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  year,
  genre,
  thumbnail,
  index,
}) => {
  return (
    <div className='card-container'>
      <h2>
        {index + 1}. {title} ({year})
      </h2>
      <img src={thumbnail} alt={`${title} thumbnail`} />
      <p>Genre: {genre}</p>
    </div>
  )
}

export default MovieCard

//  Har med de sakerna ifrån "db.en" jag tänkte var användbart.
// har tagit med index, ifall man vill göra en delete eller liknande längre fram
//
