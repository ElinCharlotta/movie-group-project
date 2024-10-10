import React, { useState } from 'react'
import './Hero.css'

interface HeroProps {
  title: string
  year: number
  synopsis?: string
  backgroundImage: string
  rating: string
  actors?: string[]
}

const Hero: React.FC<HeroProps> = ({
  title,
  year,
  synopsis,
  backgroundImage,
  rating,
  actors,
}) => {
  const fallbackThumbnail =
    'https://www.shutterstock.com/image-vector/illustration-35mm-film-frame-broken-600nw-293386859.jpg'

  const [currentBackground, setCurrentBackground] = useState(backgroundImage)

  const handleThumbnailError = () => {
    setCurrentBackground(fallbackThumbnail)
  }

  return (
    <div className='hero' style={{ backgroundImage: `url(${currentBackground})` }}>
      <img
        src={backgroundImage}
        alt='hidden'
        style={{ display: 'none' }}
        onError={handleThumbnailError}
      />
      <div className='hero-content'>
        <h1 className='hero-title'>{title}</h1>
        {actors && <p className='hero-actors'>Actors: {actors.join(', ')}</p>}
        <p className='hero-year'>Released: {year}</p>
        <p className='hero-synopsis'>{synopsis}</p>
        <p className='hero-rating'>Rating: {rating}</p>
      </div>
    </div>
  )
}

export default Hero
