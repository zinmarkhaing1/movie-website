import { Link } from 'react-router-dom'
import { useAllMovies } from '../hooks/useMovies'
import MovieCard from '../components/MovieCard'
import { ArrowBack } from '@mui/icons-material'
import { Box, Container, Grid, Stack, Typography } from '@mui/material'

export default function MoviesPage() {
  const { data, isLoading, error } = useAllMovies()
  const movies = data?.movies ?? []

  if (isLoading) {
    return (
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          bgcolor: '#0b0b0b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" sx={{ color: 'white' }}>
          Loading movies...
        </Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          bgcolor: '#0b0b0b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" color="error">
          Error: {error instanceof Error ? error.message : 'Failed to load movies.'}
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        bgcolor: '#0b0b0b',
        color: 'white',
        py: 5,
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          spacing={2}
          sx={{ mb: 4, alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              color: 'grey.400',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'white',
              },
            }}
          >
            <ArrowBack fontSize="small" />
            Back to home
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            {movies.length} Movies
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid
              key={movie.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}