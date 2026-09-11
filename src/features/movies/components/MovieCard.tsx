import { Link } from 'react-router-dom'
import { useMovieStore } from '../../../app/store/movieStore'
import { Box, Button, Card, CardContent, IconButton, Rating, Stack, Typography } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import type { Movie } from '../types/movie'

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, toggleFavorite } = useMovieStore()

  return (
    <Card
      sx={{
        height: '100%',
        bgcolor: '#151515',
        color: 'white',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'grey.900',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box
        sx={{
          height: 330,
          backgroundImage: `
            linear-gradient(
              135deg,
              rgba(168, 85, 247, 0.3),
              rgba(251, 146, 60, 0.25)
            ),
            url(${movie.poster})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <CardContent>
        <Stack
          direction="row"
          sx={{ mb: 1, justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Typography variant="body2" sx={{ color: 'grey.400' }}>
            {movie.genre}
          </Typography>

          <Stack direction="row" sx={{ spacing: 0.5, alignItems: 'center' }}>
            <Rating
              value={movie.rating}
              precision={0.1}
              max={5}
              readOnly
              size="small"
            />

            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {movie.rating}
            </Typography>
          </Stack>
        </Stack>

        <Typography
          variant="h6"
          sx={{
            height: 60,
            mb: 1,
            fontWeight: 700,
          }}
        >
          {movie.title}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            {movie.year}
          </Typography>

          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            {movie.duration}
          </Typography>
        </Stack>

        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            component={Link}
            to={`/movie/${movie.id}`}
            variant="outlined"
            size="small"
            sx={{
              textTransform: 'none',
              borderRadius: 2,
            }}
          >
            Details
          </Button>

          <IconButton
            onClick={() => toggleFavorite(movie)}
            color={isFavorite(movie.id) ? 'error' : 'default'}
            aria-label={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite(movie.id) ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  )
}