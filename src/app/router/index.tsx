import { Navigate, Route, Routes } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import HomePage from '../../features/home/pages/HomePage'
import MovieDetailPage from '../../features/movies/pages/MovieDetailPage'
import MoviesPage from '../../features/movies/pages/MoviesPage'

function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRouter
