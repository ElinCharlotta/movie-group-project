import { it, expect, beforeEach, describe } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Home from '../Home/Home'
import '../../test/setup.ts'

describe('Home Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Home bookmarkedMovies={[]} toggleBookmark={() => {}} />
      </Router>,
    )
  })

  it('should show loading state initially', () => {
    const loadingText = screen.getByText(/Loading.../i)
    expect(loadingText).toBeInTheDocument()
  })

  it('should display the hero movie after loading', async () => {
    await waitFor(() => {
      const loadingText = screen.queryByText(/Loading.../i)
      expect(loadingText).not.toBeInTheDocument()
    })
    const heroHeading = screen.getByRole('heading', { level: 1 })
    expect(heroHeading).toBeInTheDocument()
    expect(heroHeading).toHaveClass('hero-title')
  })

  it('should render trending and recommended heading', async () => {
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /trending/i }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: /recommended/i }),
      ).toBeInTheDocument()
    })
  })

  it('do not render trending movies in recommended section', async () => {
 
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../)).not.toBeInTheDocument()
    })

    // check that there are trending movies
    const trendingMovies = screen.getAllByLabelText(/Trending/i)
    expect(trendingMovies.length).toBeGreaterThan(0)

    const firstTrendingMovie = screen.getAllByAltText(
      'Star Wars: Episode V - The Empire Strikes Back thumbnail',
    )
    expect(firstTrendingMovie[0]).toBeInTheDocument()

    // check that the first trending movie is NOT in the "Recommended" section
    const recommendedMovies = screen.getAllByLabelText(/Recommended/i)

    recommendedMovies.forEach(movie => {
      expect(movie).not.toHaveTextContent(
        'Star Wars: Episode V - The Empire Strikes Back thumbnail',
      )
    })
  })

  it('should render movies in the recommended section', async () => {
    // Vänta på att sidan laddar klart
    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument()
    })

    // Testa att "Inception" finns i den rekommenderade sektionen
    const recommendedMovie = screen.getAllByText('Inception')
    expect(recommendedMovie[0]).toBeInTheDocument()
  })
})
