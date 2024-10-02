import React from 'react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
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
  it('renders all navigation links directly without needing to toggle a menu', () => {
    render(
      <Router>
        <Navbar />
      </Router>,
    )

    // Check that the primary navigation links are visible
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Bookmarked')).toBeInTheDocument()
    expect(screen.getByText('Categories')).toBeInTheDocument()

    // Check for presence of search functionality
    expect(screen.getByLabelText('Search movies')).toBeInTheDocument()
  })
})
