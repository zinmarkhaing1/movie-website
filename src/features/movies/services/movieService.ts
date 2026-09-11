import { moviesApi } from '../api/moviesApi'
import type { Movie, MoviesResponse } from '../types/movie'

export const movieService = {
  getMovies: async (): Promise<MoviesResponse> => moviesApi.getMovies(),
  getAllMovies: async (): Promise<MoviesResponse> => moviesApi.getAllMovies(),
  getFeaturedMovie: async (): Promise<Movie | undefined> => moviesApi.getFeaturedMovie(),
  getMovieById: async (id: string): Promise<Movie> => moviesApi.getMovieById(id),
  getMovieTrailer: async (id: string): Promise<string | undefined> => moviesApi.getMovieTrailer(id),
}
