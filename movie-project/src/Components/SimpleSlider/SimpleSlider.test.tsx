import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SimpleSlider from './SimpleSlider'
import { BrowserRouter } from 'react-router-dom'

const mockMovies = [
  {
    id: 1,
    title: 'The Matrix',
    year: 1999,
    rating: 'R',
    thumbnail:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
    isBookmarked: false,
    onBookmark: (title: string) => console.log(title),
  },
  {
    id: 2,
    title: 'Inception',
    year: 2010,
    rating: 'PG-13',
    thumbnail: 'https://example.com/inception-thumbnail.jpg',
    isBookmarked: false,
    onBookmark: (title: string) => console.log(title),
  },
  {
    id: 3,
    title: 'The Godfather',
    year: 1972,
    rating: 'R',
    thumbnail: 'https://example.com/godfather-thumbnail.jpg',
    isBookmarked: false,
    onBookmark: (title: string) => console.log(title),
  },
  {
    id: 4,
    title: 'City of God',
    year: 2002,
    rating: 'R',
    thumbnail: 'https://example.com/city-of-god-thumbnail.jpg',
    isBookmarked: false,
    onBookmark: (title: string) => console.log(title),
  },
  {
    id: 5,
    title: 'Fight Club',
    year: 1999,
    rating: 'R',
    thumbnail: 'https://example.com/fight-club-thumbnail.jpg',
    isBookmarked: false,
    onBookmark: (title: string) => console.log(title),
  },
]

describe('SimpleSlider', () => {
  it('renders movies correctly', () => {
    render(
      <BrowserRouter>
        <SimpleSlider movies={mockMovies} />
      </BrowserRouter>,
    )
    // Kontrollera att "The Matrix" är synlig
    expect(screen.getByRole('heading', { name: 'The Matrix' })).toBeVisible()

    // Kontrollera att "Inception" är synlig
    expect(screen.getByRole('heading', { name: 'Inception' })).toBeVisible()

    // Kontrollera att "The Godfather" är synlig
    expect(screen.getByRole('heading', { name: 'The Godfather' })).toBeVisible()

    // Kontrollera att "City of God" är synlig
    expect(screen.getByRole('heading', { name: 'City of God' })).toBeVisible()

    //Kontrollera att "Fight Club" inte är synlig
    expect(
      screen.queryByRole('heading', { name: 'Fight Club' }),
    ).not.toBeInTheDocument()
    // })
  })

  it('renders the correct number of movies', () => {
    render(
      <BrowserRouter>
        <SimpleSlider movies={mockMovies} />
      </BrowserRouter>,
    )

    const visibleMovies = screen.getAllByRole('img')
    expect(visibleMovies).toHaveLength(4)
  })

  it('shows Fight Club after clicking next and hides first movie', async () => {
    render(
      <BrowserRouter>
        <SimpleSlider movies={mockMovies} />
      </BrowserRouter>,
    )

    expect(screen.getByRole('heading', { name: 'The Matrix' })).toBeVisible()

    const nextButton = screen.getByRole('button', { name: /next/i })
    await userEvent.click(nextButton)

    expect(screen.getByRole('heading', { name: 'Fight Club' })).toBeVisible()
    expect(
      screen.queryByRole('heading', { name: 'The Matrix' }),
    ).not.toBeInTheDocument()
  })
})

// Detta ska vi egentligen inte behöva testa då det är ett bibliotek.
//Har förskt med hjälp av Kristian att testa previous knappen men SimpleSlider uppdatar sig inte som den ska.
// Den uppdaterar sig i DOM på hemsidan men inte i react. 

