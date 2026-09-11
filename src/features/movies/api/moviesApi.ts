import type { Movie, MoviesResponse, TmdbMovieDetails, TmdbMovieResult, TmdbVideoResult } from '../types/movie'

const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL ?? 'https://api.themoviedb.org/3'
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY

if (!TMDB_API_KEY) {
  throw new Error('TMDB API key is missing. Add VITE_TMDB_API_KEY to your .env file.')
}

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'

const mapTmdbMovie = (movie: TmdbMovieResult): Movie => ({
  id: String(movie.id),
  title: movie.title,
  genre: (movie.genre_ids && movie.genre_ids.length > 0 ? 'Action' : 'Drama') as Movie['genre'],
  year: Number(movie.release_date?.slice(0, 4) ?? new Date().getFullYear()),
  rating: Number(movie.vote_average ?? 0),
  duration: '2h 10m',
  description: movie.overview || 'No description available.',
  poster: movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : 'https://placehold.co/500x750/0b1020/f5f7fb?text=Movie',
  backdrop: movie.backdrop_path ? `${imageBaseUrl}${movie.backdrop_path}` : undefined,
  featured: false,
})

const mapTmdbDetails = (movie: TmdbMovieDetails): Movie => ({
  id: String(movie.id),
  title: movie.title,
  genre: (movie.genres[0]?.name as Movie['genre']) ?? 'Drama',
  year: Number(movie.release_date?.slice(0, 4) ?? new Date().getFullYear()),
  rating: Number(movie.vote_average ?? 0),
  duration: movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : '2h 10m',
  description: movie.overview || 'No description available.',
  poster: movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : 'https://placehold.co/500x750/0b1020/f5f7fb?text=Movie',
  backdrop: movie.backdrop_path ? `${imageBaseUrl}${movie.backdrop_path}` : undefined,
  featured: false,
})

const getTmdbUrl = (path: string, params: Record<string, string | number> = {}) => {
  const url = new URL(`${TMDB_BASE_URL}${path}`)

  url.searchParams.set('api_key', TMDB_API_KEY)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value))
  })

  return url.toString()
}

export const moviesApi = {
  getMovies: async (options: { page?: number; limit?: number } = {}): Promise<MoviesResponse> => {
    const { page = 1, limit = 8 } = options
    const response = await fetch(getTmdbUrl('/movie/popular', { language: 'en-US', page }))

    if (!response.ok) {
      throw new Error('Failed to fetch movies from TMDB')
    }

    const data = (await response.json()) as { results: TmdbMovieResult[]; total_results?: number }

    const movies = (data.results ?? []).slice(0, limit).map(mapTmdbMovie)

    return {
      movies,
      total: data.total_results ?? movies.length,
    }
  },

  getAllMovies: async (pages = 4): Promise<MoviesResponse> => {
    const responses = await Promise.all(
      Array.from({ length: pages }, (_, i) =>
        moviesApi.getMovies({ page: i + 1, limit: 20 }),
      ),
    )

    return {
      movies: responses.flatMap((response) => response.movies),
      total: responses[0]?.total ?? responses.length * 20,
    }
  },

  getFeaturedMovie: async (): Promise<Movie | undefined> => {
    const movies = await moviesApi.getMovies()
    return movies.movies[0]
  },

  getMovieById: async (id: string): Promise<Movie> => {
    const response = await fetch(getTmdbUrl(`/movie/${id}`, { language: 'en-US' }))

    if (!response.ok) {
      throw new Error('Failed to fetch movie details from TMDB')
    }

    const data = (await response.json()) as TmdbMovieDetails
    return mapTmdbDetails(data)
  },

  getMovieTrailer: async (id: string): Promise<string | undefined> => {
    const response = await fetch(getTmdbUrl(`/movie/${id}/videos`, { language: 'en-US' }))

    if (!response.ok) {
      throw new Error('Failed to fetch movie trailer from TMDB')
    }

    const data = (await response.json()) as { results: TmdbVideoResult[] }

    const trailer = (data.results ?? []).find(
      (video) =>
        video.site === 'YouTube' &&
        video.type === 'Trailer' &&
        video.official !== false,
    )

    return trailer?.key
  },
}
