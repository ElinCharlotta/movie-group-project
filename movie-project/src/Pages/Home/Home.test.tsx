import { it, expect, beforeEach, describe } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Home from '../Home/Home'

beforeEach(() => {
  render(
    <Router>
      <Home bookmarkedMovies={[]} toggleBookmark={() => {}} />
    </Router>,
  )
})

describe('Home Component', () => {
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

  it('should render trending and recommended sections', async () => {
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /trending/i }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: /recommended/i }),
      ).toBeInTheDocument()
    })
    //Inte pålitligt test
    // Fetch all headings representing movies
//     const movieCards = screen.getAllByRole('heading')
//     const isTrending = 'Trending'
//     console.log(movieCards)

//     // Check that the 'Trending' section is rendered
//     console.log(movieCards.map(card => card.textContent))

//     expect(movieCards.map(card => card.textContent)).toContain(isTrending)

//     expect(movieCards.map(card => card.textContent)).toContain('Recommended')
//   })

  // testa att filmen syns i den rekommenderade sektionen
  // getByRole heading kolla längden i den rekommenderade sektionen
  // testa att första filmen i trending inte finns med i den rekommenderade

})
})
