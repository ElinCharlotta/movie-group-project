import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React from 'react'
import Slider from 'react-slick'
import './SimpleSlider.css'
import MovieCard, { MovieCardProps } from '../MovieCard/MovieCard'

interface SimpleSliderProps {
  movies: (Omit<MovieCardProps, 'onBookmark'> & { onBookmark: (title: string) => void })[]
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
        {movies.map((movie, index) => (
          <div className='slide' key={`${movie.title}-${movie.year}-${index}`}>
            <MovieCard {...movie} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default SimpleSlider