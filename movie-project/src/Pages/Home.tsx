// Home.tsx
import React, { useState, useEffect } from 'react';
import SimpleSlider from '../Components/SimpleSlider';	

interface MovieProps {
  title: string;
  thumbnail: string;
  isTrending?: boolean;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      const res = await import('../../public/movies.json');
      setMovies(res.default);
      setLoading(false);
    };
    loadMovies();
  }, []);

  if (loading) return <div>Loading...</div>;

  const trendingMovies = movies.filter((movie) => movie.isTrending);

  const recommendedMovies = movies.filter((movie) => !movie.isTrending).slice(4,10);


  return (
    <div>
      <section>
        {trendingMovies.length > 0 ? (<>
        <h2>Trending</h2>
          <SimpleSlider movies={trendingMovies} />
          <h2>Recommended</h2>
          <SimpleSlider movies={recommendedMovies} />
          </>

        ) : (
          <p>No trending movies available.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
