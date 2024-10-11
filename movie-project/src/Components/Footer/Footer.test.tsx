import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Footer from './Footer';

describe('Footer', () => {
  test('renderar länkar och kontrollerar att de fungerar', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Kontrollera att länkarna renderas
    const homeLink = screen.getByText(/Hem/i);
    const categoriesLink = screen.getByText(/Kategorier/i);
    const bookmarkedLink = screen.getByText(/Bokmärkta/i);

    // Kontrollera att länkarna är i dokumentet
    expect(homeLink).toBeInTheDocument();
    expect(categoriesLink).toBeInTheDocument();
    expect(bookmarkedLink).toBeInTheDocument();

    // Kontrollera att länkarna har rätt href
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    expect(categoriesLink.closest('a')).toHaveAttribute('href', '/categories');
    expect(bookmarkedLink.closest('a')).toHaveAttribute('href', '/bookmarked');
  });
});
