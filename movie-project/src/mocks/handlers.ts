import { http, HttpResponse } from 'msw'
import { movies } from './movieData.ts'

export const handlers = [
  http.get('/api/movies', () => {
    return HttpResponse.json(movies)
  }),
  http.get('/api/search', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('q')
    const filteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes((query ?? '').toLowerCase()),
    )
    return HttpResponse.json(filteredMovies)
  }),
]
