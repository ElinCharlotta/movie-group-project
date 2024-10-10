import { render, screen } from '@testing-library/react';

import MovieView from '../Pages/MovieView.tsx';
import { describe, it, expect, vi } from 'vitest';

describe('MovieView', () => {
  beforeEach(() => {
    render(<MovieView />);

test('renders Movieview with title', () => {
    const movieId = { title: 'The Shawshank Redemption', 
    synopsis: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.", 
    year: 1994,
    rating: "R",
    actors: "Tim Robbins", "Morgan Freeman": "Bob Gunton",  
    genre: "Drama",
    thumbnail: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX380_CR0,4,380,562_.jpg"
  
    render(<MovieView movie={Id} />);

    expect(screen.getByText('The Shawshank Redemption')).toBeInTheDocument();
    expect(screen.getByText('1994')).toBeInTheDocument();
  }
});



