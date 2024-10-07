import React from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './Navbar'
import '../test/setup'

describe('Navbar Component - Desktop View', () => {
  beforeEach(() => {
    render(
      <Router>
        <Navbar />
      </Router>,
    )
  })

  it('renders all navigation links directly without needing to toggle a menu', () => {
    const homeLink = screen.getByRole('link', { name: /home/i })
    const bookmarkedLink = screen.getByRole('link', { name: /bookmarked/i })
    const categoriesLink = screen.getByRole('link', { name: /categories/i })

    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
    expect(bookmarkedLink).toBeInTheDocument()
    expect(bookmarkedLink).toHaveAttribute('href', '/bookmarked')
    expect(categoriesLink).toBeInTheDocument()
    expect(categoriesLink).toHaveAttribute('href', '/categories')
  })

  it('checks for the presence of the search functionality', async () => {
    const searchInput = screen.getByRole('searchbox', {
      name: /search movies/i,
    })
    expect(searchInput).toBeInTheDocument()

    const searchButton = screen.getByRole('button', { name: /search/i })
    expect(searchButton).toBeInTheDocument()

    const user = userEvent.setup()
    await user.type(searchInput, 'Shawshank')
    await user.click(searchButton)

    expect(
      await screen.findByText('The Shawshank Redemption'),
    ).toBeInTheDocument()
    expect(screen.queryByText('The Godfather')).not.toBeInTheDocument()

    await user.clear(searchInput)
    await user.type(searchInput, 'Godfather')
    await user.click(searchButton)

    expect(await screen.findByText('The Godfather')).toBeInTheDocument()
    expect(
      screen.queryByText('The Shawshank Redemption'),
    ).not.toBeInTheDocument()
  })

  it('displays the app logo', () => {
    const logo = screen.getByTestId('app-logo')
    expect(logo).toBeInTheDocument()
  })

  it('does not display the mobile menu toggle button', () => {
    const menuToggle = screen.getByTestId('mobile-menu-toggle')
    expect(menuToggle).toBeInTheDocument()
  })
})
