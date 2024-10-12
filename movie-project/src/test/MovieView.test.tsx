import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi, describe, it, expect } from 'vitest'
import MovieView from '../Pages/MovieView'
import { movies } from '../mocks/movieData'
import '../test/setup'

// Mock the import of movies.json
vi.mock('../data/movies.json', () => ({
  default: movies,
}))

const mockToggleBookmark = vi.fn()

describe('MovieView', () => {
  const renderMovieView = (movieIndex = 0, isBookmarked = false) => {
    const bookmarkedMovies = isBookmarked ? [movies[movieIndex].title] : []
    render(
      <MemoryRouter initialEntries={[`/movie/${movieIndex + 1}`]}>
        <Routes>
          <Route
            path='/movie/:id'
            element={
              <MovieView
                bookmarkedMovies={bookmarkedMovies}
                toggleBookmark={mockToggleBookmark}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    )
    return movies[movieIndex]
  }

  it('renders movie details correctly', async () => {
    const movie = renderMovieView()

    await waitFor(() => {
      expect(screen.getByText(`Title: ${movie.title}`)).toBeInTheDocument()
      expect(screen.getByText(`Year: ${movie.year}`)).toBeInTheDocument()
      expect(screen.getByText(`Rating: ${movie.rating}`)).toBeInTheDocument()
      expect(screen.getByText(`Genre: ${movie.genre}`)).toBeInTheDocument()
      expect(
        screen.getByText(`Actors: ${movie.actors.join(', ')}`),
      ).toBeInTheDocument()
      expect(screen.getByText(movie.synopsis)).toBeInTheDocument()
    })
  })

  it('displays the correct bookmark button when not bookmarked', async () => {
    renderMovieView()

    await waitFor(() => {
      const bookmarkButton = screen.getByTestId('bookmark-button')
      expect(bookmarkButton).toBeInTheDocument()
      expect(bookmarkButton).not.toHaveClass('bookmarked')
    })
  })

  it('displays the correct bookmark button when bookmarked', async () => {
    renderMovieView(0, true)

    await waitFor(() => {
      const bookmarkButton = screen.getByTestId('bookmark-button')
      expect(bookmarkButton).toBeInTheDocument()
      expect(bookmarkButton).toHaveClass('bookmarked')
    })
  })

  it('calls toggleBookmark when bookmark button is clicked', async () => {
    const movie = renderMovieView()

    await waitFor(() => {
      const bookmarkButton = screen.getByTestId('bookmark-button')
      fireEvent.click(bookmarkButton)
      expect(mockToggleBookmark).toHaveBeenCalledWith(movie.title)
    })
  })

  it('displays a fallback image when the movie poster fails to load', async () => {
    renderMovieView()

    await waitFor(() => {
      const img = screen.getByAltText(movies[0].title)
      expect(img).toBeInTheDocument()
      fireEvent.error(img)
      expect((img as HTMLImageElement).src).toContain('placeholder.png')
    })
  })

  it('renders details for a different movie correctly', async () => {
    const movie = renderMovieView(1)

    await waitFor(() => {
      expect(screen.getByText(`Title: ${movie.title}`)).toBeInTheDocument()
      expect(screen.getByText(`Year: ${movie.year}`)).toBeInTheDocument()
      expect(screen.getByText(`Rating: ${movie.rating}`)).toBeInTheDocument()
      expect(screen.getByText(`Genre: ${movie.genre}`)).toBeInTheDocument()
      expect(
        screen.getByText(`Actors: ${movie.actors.join(', ')}`),
      ).toBeInTheDocument()
      expect(screen.getByText(movie.synopsis)).toBeInTheDocument()
    })
  })

  it('displays loading state initially', () => {
    renderMovieView()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
