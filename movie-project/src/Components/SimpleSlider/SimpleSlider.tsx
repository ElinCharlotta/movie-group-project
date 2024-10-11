import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './SimpleSlider.css'
import MovieCard, { MovieCardProps } from '../MovieCard/MovieCard'

interface SimpleSliderProps {
  movies: (Omit<MovieCardProps, 'onBookmark'> & { onBookmark: (title: string) => void })[]
  ariaLabel?: string; 
}

const SimpleSlider: React.FC<SimpleSliderProps> = ({ movies, ariaLabel }) => {
  const uniqueMovies = movies.filter((movie, index, self) =>
    index === self.findIndex((t) => t.id === movie.id)
  )

  const settings = {
    dots: true,
    infinite: uniqueMovies.length > 4,
    speed: 400,
    slidesToShow: Math.min(4, uniqueMovies.length),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, uniqueMovies.length),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  if (uniqueMovies.length === 1) {
    return (
      <div className='single-movie-container'>
        <MovieCard
          {...uniqueMovies[0]}
          isBookmarked={uniqueMovies[0].isBookmarked}
          onBookmark={uniqueMovies[0].onBookmark}
          aria-label={ariaLabel}
        />
      </div>
    )
  }

  return (
    <div className='slider' aria-label={ariaLabel}>
      <Slider {...settings}>
        {uniqueMovies.map((movie) => (
          <div className='slide' key={movie.id}>
            <MovieCard
              {...movie}
              isBookmarked={movie.isBookmarked}
              onBookmark={movie.onBookmark}
              aria-label={ariaLabel}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default SimpleSlider
