import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import Slider from 'react-slick';
import './Styles/SimpleSlider.css';

// Define the interface for Movie props
interface MovieProps {
  title: string;
  thumbnail: string;
  isTrending?: boolean;
}

// Define the interface for SimpleSlider props
interface SimpleSliderProps {
  movies: MovieProps[];
}

// SimpleSlider component
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
  };

  return (
        <div className='slider'> 
          <Slider {...settings}>
            {movies.map((movie, index) => (
        <div className="slide" key={index}>
                <img src={movie.thumbnail} alt={movie.title} />
                <h3>{movie.title}</h3>
              </div>
            ))}
          </Slider>
        </div>
      );
    };
    
    export default SimpleSlider;