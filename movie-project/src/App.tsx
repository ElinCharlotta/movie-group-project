import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Categories from './Pages/Categories'
import Bookmarked from './Pages/Bookmarked'
import Navbar from './Components/Navbar'
import { useBookmarks } from './hooks/useBookmarks'
import MovieView from './Pages/MovieView'
import './App.css'

export default function App() {
  const { bookmarkedMovies, toggleBookmark } = useBookmarks()

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
        <Route
          path='/movie/:id'
          element={
            <MovieView
              bookmarkedMovies={bookmarkedMovies}
              toggleBookmark={toggleBookmark}
            />
          }
        />
      </Routes>
    </div>
  )
}
