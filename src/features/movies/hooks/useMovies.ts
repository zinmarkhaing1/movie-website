import { useQuery } from '@tanstack/react-query'
import { movieService } from '../services/movieService'

export function useMovies() {
  const moviesQuery = useQuery({
    queryKey: ['movies'],
    queryFn: movieService.getMovies,
  })

  const featuredMovieQuery = useQuery({
    queryKey: ['featuredMovie'],
    queryFn: movieService.getFeaturedMovie,
  })

  return {
    movies: moviesQuery.data?.movies ?? [],
    featuredMovie: featuredMovieQuery.data ?? null,
    isLoading: moviesQuery.isLoading || featuredMovieQuery.isLoading,
    error: moviesQuery.error instanceof Error ? moviesQuery.error.message : featuredMovieQuery.error instanceof Error ? featuredMovieQuery.error.message : null,
  }
}

export function useAllMovies() {
  return useQuery({
    queryKey: ['all-movies'],
    queryFn: movieService.getAllMovies,
  })
}

export function useMovieDetail(movieId: string | undefined) {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => movieService.getMovieById(movieId ?? ''),
    enabled: Boolean(movieId),
  })
}

export function useMovieTrailer(movieId: string | undefined, enabled: boolean) {
  return useQuery({
    queryKey: ['movie-trailer', movieId],
    queryFn: () => movieService.getMovieTrailer(movieId ?? ''),
    enabled: Boolean(movieId) && enabled,
  })
}
