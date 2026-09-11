import { create } from 'zustand'
import type { Movie } from '../../features/movies/types/movie'

interface MovieStoreState {
  selectedMovieId: string | null
  setSelectedMovieId: (id: string | null) => void
  favorites: Movie[]
  toggleFavorite: (movie: Movie) => void
  isFavorite: (movieId: string) => boolean
}

export const useMovieStore = create<MovieStoreState>((set, get) => ({
  selectedMovieId: null,
  favorites: [],
  setSelectedMovieId: (id) => set({ selectedMovieId: id }),
  toggleFavorite: (movie) => {
    const { favorites } = get()
    const exists = favorites.some((item) => item.id === movie.id)

    set({
      favorites: exists ? favorites.filter((item) => item.id !== movie.id) : [...favorites, movie],
    })
  },
  isFavorite: (movieId) => get().favorites.some((movie) => movie.id === movieId),
}))
