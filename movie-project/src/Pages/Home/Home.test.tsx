import { it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import '../../test/setup';

beforeEach(() => {
    render(
        <Router>
            <Home bookmarkedMovies={[]} toggleBookmark={() => {}} />
        </Router>
    );
});

it('renders loading state initially', () => {
    expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('renders the trending section', async () => {
    await waitFor(() => expect(screen.getByText('Trending')).toBeInTheDocument());
});

it('renders recommended movies section', async () => {
    await waitFor(() => expect(screen.getByText('Recommended')).toBeInTheDocument());
});


//testa att filmen syns i den rekommenderade sektionen
//getByRole heading kolla längden i den rekommenderade sektionen
//testa att första filmen i trending inte finns med i den rekommenderade sektionen


