import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Categories from './Pages/Categories'
import Bookmarked from './Pages/Bookmarked'
import Navbar from './Components/Navbar'
import { useBookmarks } from './hooks/useBookmark'
import './App.css'

export default function App() {
  const { bookmarked, toggleBookmark } = useBookmarks()

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              bookmarkedMovies={bookmarkedMovies}
              toggleBookmark={toggleBookmark}
            />
          }
        />
        <Route path='/categories' element={<Categories />} />
        <Route
          path='/bookmarked'
          element={
            <Bookmarked
              bookmarkedMovies={bookmarkedMovies}
              toggleBookmark={toggleBookmark}
            />
          }
        />
      </Routes>
    </div>
  )
}
