import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './SimpleSlider.css'
import MovieCard, { MovieCardProps } from '../MovieCard/MovieCard'

interface SimpleSliderProps {
  movies: MovieCardProps[]
}

const SimpleSlider: React.FC<SimpleSliderProps> = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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

  return (
    <div className='slider'>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div className='slide' key={movie.id}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              year={movie.year}
              thumbnail={movie.thumbnail}
              rating={movie.rating}
              genre={movie.genre}
              actors={movie.actors}
              synopsis={movie.synopsis}
              isTrending={movie.isTrending}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default SimpleSlider