import { fireEvent, render, screen } from '@testing-library/react'
import '../test/setup.ts'
import MovieView from '../Pages/MovieView.tsx'
import { it, expect } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

test('Should render MovieView-view', () => {
  render(<MovieView bookmarkedMovies={[]} toggleBookmark={() => ''} />)
  expect(screen.getByText('Loading..')).toBeInTheDocument()
})

it.only('Should display a no image available if poster does not exist', async () => {
  render(
    <MemoryRouter initialEntries={['/movie/10']}>
      <Routes>
        <Route
          path='/movie/:id'
          element={
            <MovieView bookmarkedMovies={[]} toggleBookmark={() => ''} />
          }
        />
      </Routes>
    </MemoryRouter>,
  )

  const img = await screen.findByAltText('Fight Club')
  expect(img).toBeInTheDocument()
  fireEvent.error(img)
  expect(img).toContain("placeholder")
  
})

/*const imgElement = screen.getByAltText("Movie poster");
  // Kolla om fallback-bilden visas när originalet saknas
  expect(imgElement).toHaveAttribute('src', );
})*/