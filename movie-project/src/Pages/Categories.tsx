import React, { useState, useEffect } from 'react'
import './Catagories.css'
interface MovieProps {
  title: string
  thumbnail: string
  genre: string
  year: number
  rating: string
  synopsis: string
}

const Categories: React.FC = () => {
  //const [selectedCategoryData,setSelectedCategoryData ] = useState([]);
  // const [productData,setProductData ] = useState<string>(items);
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [filterCategory, setFilterCategory] = useState<MovieProps[]>([])
  const [totalMovies, setTotalMovies] = useState<MovieProps[]>([])
  

  useEffect(() => {
    import('../../public/movies.json').then(res => {
      setMovies(res.default)
      setFilterCategory(res.default)
      setTotalMovies(res.default)
      setLoading(false)
    })
  }, []) // Add dependency array to run only once
  if (loading) return <div>Loading...</div>
   //console.log(movies)
  const categoryItems = filterCategory.map(item => item.genre)
  //console.log(categoryItems)
  // Remove duplications from array
  const filterbarData = [...new Set(categoryItems)]
  console.log(filterbarData)
  //console.log(movies)
  const handleCategoryData = (value: string) => {
    const updateCategoryData: Array<string> = []
    updateCategoryData.push(value)
    console.log(value)
    const updatedProductData = totalMovies.filter(item =>
      updateCategoryData.includes(item.genre),
    )
    //console.log(updatedProductData)
    setMovies(updatedProductData)
    //console.log(updatedProductData)
  }

  return (
    <div>
      <div className='mx-auto  sm:container'>
        <div className=' border-primary pl-5'>
          <h2 className='mb-2 text-2xl font-semibold'>Movie Categories</h2>
          <p className='text-sm font-medium text-body-color'>
            ------------------------------------------------------
          </p>
        </div>
      </div>

      <div className='catagories'>
        {filterbarData.map((value, index) => (
          <button
            value={value}
            key={`filter-${index}`}
            onClick={() => handleCategoryData(value)}
            className='catagories_btn'
          >
            {value}
          </button>
        ))}
      </div>

      <div className='catagories-items flex flex-wrap justify-center mt-10'>
        {movies.map((value, index) => (
          <div key={index} className='movie-card'>
            <div className='movie-header manOfSteel'>
              <div className='header-icon-container'>
                <a href='#'>
                  <i className='material-icons header-icon'>
                    <img
                      src={value.thumbnail}
                      alt={value.title}
                      style={{
                        width: '100%',
                        maxWidth: '315px',
                        height: '360px',
                        borderRadius: '10px',
                      }}
                    />
                  </i>
                </a>
              </div>
            </div>
            {/* movie-header */}
            <div className='movie-content'>
              <div className='movie-content-header'>
                <a href='#'>
                  <h3 className='movie-title'>{value.synopsis}</h3>
                </a>
                <div className='imax-logo'></div>
              </div>
              <div className='movie-info'>
                <div className='info-section'>
                  <label>Title</label>
                  <span>{value.title}</span>
                </div>
                {/* date,time */}
                <div className='info-section'>
                  <label>Screen</label>
                  <span>03</span>
                </div>
                {/* screen */}
                <div className='info-section'>
                  <label>Row</label>
                  <span>F</span>
                </div>
                {/* row */}
                <div className='info-section'>
                  <label>Year</label>
                  <span>{value.year}</span>
                </div>
                {/* seat */}
              </div>
            </div>
            {/* movie-content */}
          </div>
        ))}
      </div>
    </div>
  )
}
export default Categories

/* import React from 'react'

function Categories() {
  return (
    <div>Categories</div>
  )
}

export default Categories
 */
