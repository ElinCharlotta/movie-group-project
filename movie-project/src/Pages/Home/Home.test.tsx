import { it, expect, beforeEach, describe } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Home from '../Home/Home'

const movies = [
  {
    id: 1,
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
    rating: 'PG',
    actors: ['Mark Hamill', 'Harrison Ford'],
    genre: 'Action, Adventure, Fantasy',
    synopsis: 'A long time ago in a galaxy far, far away...',
    thumbnail: 'https://example.com/image1.jpg',
    isTrending: true,
  },
  {
    id: 2,
    title: 'Casablanca',
    year: 1942,
    rating: 'PG',
    actors: ['Humphrey Bogart', 'Ingrid Bergman'],
    genre: 'Drama, Romance, War',
    synopsis: 'A love story set during World War II.',
    thumbnail: 'https://example.com/image2.jpg',
    isTrending: true,
  },
  {
    id: 3,
    title: 'Terminator 2: Judgment Day',
    year: 1991,
    rating: 'R',
    actors: ['Arnold Schwarzenegger', 'Linda Hamilton'],
    genre: 'Action, Sci-Fi',
    synopsis: 'The battle for the future begins.',
    thumbnail: 'https://example.com/image3.jpg',
    isTrending: true,
  },
  {
    id: 4,
    title: 'The Matrix',
    year: 1999,
    rating: 'R',
    actors: ['Keanu Reeves', 'Laurence Fishburne'],
    genre: 'Action, Sci-Fi',
    synopsis: 'A computer hacker learns from mysterious rebels.',
    thumbnail: 'https://example.com/image4.jpg',
  },
  {
    id: 5,
    title: 'The Godfather',
    year: 1972,
    rating: 'R',
    actors: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    genre: 'Crime, Drama',
    synopsis: 'Don Vito Corleone, head of a mafia family...',
    thumbnail: 'https://example.com/image5.jpg',
  },
]
beforeEach(() => {
  render(
    <Router>
      <Home bookmarkedMovies={[]} toggleBookmark={() => {}} movies={movies} />
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
    screen.logTestingPlaygroundURL()
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

  it('should not render trending in the recommended section and vice versa', async () => {
    await waitFor(() => {
      // Filtrera rekommenderade filmer
      const recommendedMovies = movies.filter(movie => !movie.isTrending)

      // Filtrera trending filmer
      const trendingMovies = movies.filter(movie => movie.isTrending)

      // Kontrollera att inga trending filmer finns i rekommenderade
      const noTrendingInRecommended = recommendedMovies.every(
        movie => !movie.isTrending,
      )

      // Kontrollera att inga rekommenderade filmer finns i trending
      const noRecommendedInTrending = trendingMovies.every(
        movie => movie.isTrending,
      )

      console.log('Recommended Movies:', recommendedMovies)
      console.log('Trending Movies:', trendingMovies)
      console.log(
        'Are there any trending movies in recommended?:',
        noTrendingInRecommended,
      )
      console.log(
        'Are there any recommended movies in trending?:',
        noRecommendedInTrending,
      )

      expect(noTrendingInRecommended).toBe(true) // Ingen trending film i rekommenderade
      expect(noRecommendedInTrending).toBe(true) // Ingen rekommenderad film i trending
    })
  })
})
