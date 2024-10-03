import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Categories from './Pages/Categories'
import Bookmarked from './Pages/Bookmarked'
import Navbar from './Components/Navbar'
import MovieView from './Pages/MovieView'
import './App.css'

export default function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/bookmarked' element={<Bookmarked />} />
        <Route path='/movie/:id' element={<MovieView />} />
      </Routes>
    </div>
  )
}
