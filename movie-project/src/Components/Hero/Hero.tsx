import React from 'react';
import './Hero.css';

interface HeroProps {
  title: string;
  year: number;
  synopsis?: string;
  backgroundImage: string;
  rating: string;
  actors?: string[];
}

const Hero: React.FC<HeroProps> = ({ title, year, synopsis, backgroundImage, rating, actors }) => {
  return (
    <div className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-actors">Actors: {actors}</p>
        <p className="hero-year">Released: {year}</p>
        <p className="hero-synopsis">{synopsis}</p>
        <p className="hero-rating">Rating: {rating}</p>
      </div>
    </div>
  );
};

export default Hero;
