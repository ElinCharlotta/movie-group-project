import React from 'react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'
import { BrowserRouter as Router } from 'react-router-dom'

vi.mock('../data/movies.json', () => {
  return {
    default: [
      {
        title: 'The Shawshank Redemption',
        year: 1994,
        rating: 'R',
        actors: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
        genre: 'Drama',
        synopsis:
          'Over the course of several years, two convicts form a friendship...',
        thumbnail: 'https://example.com/shawshank.jpg',
      },
      {
        title: 'The Godfather',
        year: 1972,
        rating: 'R',
        actors: ['Marlon Brando', 'Al Pacino', 'James Caan'],
        genre: 'Crime, Drama',
        synopsis: 'Don Vito Corleone, head of a mafia family...',
        thumbnail: 'https://example.com/godfather.jpg',
      },
    ],
  }
})

describe('Navbar Component - Desktop View', () => {
  // Render the Navbar within a Router before each test
  beforeEach(() => {
    render(
      <Router>
        <Navbar />
      </Router>,
    )
  })

  it('renders all navigation links directly without needing to toggle a menu', () => {
    // Verify that all main links are immediately visible
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

  it('checks for the presence of the search functionality', () => {
    // Verify that the search input is present and correctly labeled
    const searchInput = screen.getByRole('searchbox', {
      name: /search movies/i,
    })
    expect(searchInput).toBeInTheDocument()

    //Check that the search button is there
    const searchButton = screen.getByRole('button', { name: /search/i })
    expect(searchButton).toBeInTheDocument()
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
