import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import React from 'react'
import Slider from 'react-slick'
import './SimpleSlider.css'
import MovieCard from '../MovieCard/MovieCard'


interface MovieCardProps {
  title: string
  year: number
  actors?: string[]
  genre?: string
  synopsis?: string
  thumbnail: string
  rating: string
  isTrending?: boolean
}


interface SimpleSliderProps {
  movies: MovieCardProps[]
}


const SimpleSlider: React.FC<SimpleSliderProps> = ({ movies }) => {
  // Slider settings
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
          <div className='slide' key={index}>
            <MovieCard
              title={movie.title}
              year={movie.year}
              thumbnail={movie.thumbnail}
              rating={movie.rating}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default SimpleSlider