import { useState, useEffect } from 'react'

export const useBookmarks = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<string[]>([])

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarkedMovies')
    if (storedBookmarks) {
      const parsedBookmarks = JSON.parse(storedBookmarks)
      setBookmarkedMovies(parsedBookmarks)
      console.log('Loaded bookmarks from localStorage:', parsedBookmarks)
    } else {
      console.log('No bookmarks found in localStorage')
    }
  }, [])

  const toggleBookmark = (movieTitle: string) => {
    setBookmarkedMovies(prev => {
      const newBookmarks = prev.includes(movieTitle)
        ? prev.filter(title => title !== movieTitle)
        : [...prev, movieTitle]

      console.log(`Movie "${movieTitle}" ${prev.includes(movieTitle) ? 'removed from' : 'added to'} bookmarks`)

      localStorage.setItem('bookmarkedMovies', JSON.stringify(newBookmarks))
      
      console.log('Updated bookmarks in localStorage:', newBookmarks)

      return newBookmarks
    })
  }

  return { bookmarkedMovies, toggleBookmark }
}