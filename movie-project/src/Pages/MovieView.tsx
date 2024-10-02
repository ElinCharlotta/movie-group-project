import React from 'react';
import MovieCard from '../Components/MovieCard/MovieCard';

interface MovieCardProps {
  title: string;
  year: number;
  rating: string;
  actors: string[];
  genre: string;
  synopsis: string[];
  thumbnail: string;
  index: number

}

interface MovieViewProps {
  movies: MovieCardProps[];
}

const MovieView: React.FC<MovieViewProps> = ({ movies }) => {
  return (
    <article>
      <h1>Movies List</h1>
      {movies.map((movie) => (
        <div key={`${movie.title}-${movie.year}`}>
          <h2>
            {movie.title} ({movie.year})
          </h2>
          <MovieCard 
            title={movie.title} 
            year={movie.year}
            rating={movie.rating}
            actors={movie.actors}
            genre={movie.genre}
            synopsis={movie.synopsis}
            thumbnail={movie.thumbnail}
            index={movie.index}
          />
        </div>
      ))}
    </article>
  );
}

export default MovieView;
