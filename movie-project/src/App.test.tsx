// App.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('Testing bookmark', () => {
  it('should add to bookmark, then remove from bookmark', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )

    await waitFor(() => {
      const buttons = document.getElementsByClassName('bookmark-button')
      return buttons.length > 0
    })

    const addButton = document.getElementsByClassName('bookmark-button')[0]

    expect(addButton).toBeInTheDocument()

    userEvent.click(addButton)

    const bookmarkedButton = screen.getByText('Bookmarked')
    userEvent.click(bookmarkedButton)

    await waitFor(() => {
      expect(
        screen.getByText('Star Wars: Episode V - The Empire Strikes Back'),
      ).toBeInTheDocument()
    })

    const deleteButton = document.getElementsByClassName('bookmark-button')[0]

    expect(deleteButton).toBeInTheDocument()
    userEvent.click(deleteButton)

    await waitFor(() => {
      expect(
        screen.queryByText('Star Wars: Episode V - The Empire Strikes Back'),
      ).not.toBeInTheDocument()
    })
  })
})
