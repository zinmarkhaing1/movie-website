export type MovieGenre = 'Sci-Fi' | 'Action' | 'Drama' | 'Mystery' | 'Thriller' | 'Comedy' | 'Adventure' | 'Animation'

export interface Movie {
  id: string
  title: string
  genre: MovieGenre
  year: number
  rating: number
  duration: string
  description: string
  poster: string
  backdrop?: string
  featured?: boolean
}

export interface MoviesResponse {
  movies: Movie[]
  total: number
}

export interface TmdbMovieResult {
  id: number
  title: string
  overview: string
  release_date: string
  vote_average: number
  poster_path: string | null
  backdrop_path: string | null
  genre_ids?: number[]
  adult?: boolean
}

export interface TmdbMovieDetails {
  id: number
  title: string
  overview: string
  release_date: string
  vote_average: number
  runtime: number | null
  genres: Array<{ id: number; name: string }>
  poster_path: string | null
  backdrop_path: string | null
}

export interface TmdbVideoResult {
  id: string
  key: string
  name: string
  site: string
  type: string
  official?: boolean
}
