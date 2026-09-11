import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import {Box, Button, Chip, Container, Paper, Stack, Typography} from '@mui/material';
import {ArrowBack, AccessTime, CalendarMonth, Star, PlayArrow} from '@mui/icons-material';
import { useMovieDetail, useMovieTrailer } from '../hooks/useMovies'
import TrailerModal from '../components/TrailerModal'

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: movie, isLoading, error } = useMovieDetail(id)
  const [watchOpen, setWatchOpen] = useState(false)
  const { data: videoKey, isLoading: isVideoLoading, error: videoError } = useMovieTrailer(
    id,
    watchOpen,
  )

  if (isLoading) {
    return (
      // <main className="detail-page"><div className="loading-state">Loading movie details...</div></main>
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
        <Typography
          variant="h6"
          sx={{ color: 'white' }}
        >
          Loading movie details...
        </Typography>
      </Box>

    )
  }

  if (error || !movie) {
    return (
      // <main className="detail-page"><div className="error-state">Movie not found.</div></main>
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
        <Typography
          variant="h6"
          color="error"
        >
          Movie not found.
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
        pb: 6,
      }}
    >
      {/* Back Button */}
      <Container maxWidth="xl">
        <Box sx={{ py: 3 }}>
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
            Back to movies
          </Box>
        </Box>
      </Container>

      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          minHeight: {
            xs: 600,
            md: 650,
          },
          display: 'flex',
          alignItems: 'center',
          backgroundImage: `
            linear-gradient(
              rgba(9, 11, 20, 0.45),
              rgba(9, 11, 20, 0.95)
            ),
            url(${movie.backdrop ?? movie.poster})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(9,11,20,0.95), rgba(9,11,20,0.4), rgba(9,11,20,0.9))',
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Stack
            direction={{
              xs: 'column',
              md: 'row',
            }}
            spacing={{
              xs: 4,
              md: 6,
            }}
           
            sx={{alignItems:{xs:'center', md:'center'},}}
          >
            {/* Poster */}
            <Paper
              elevation={8}
              sx={{
                width: {
                  xs: 220,
                  sm: 260,
                  md: 300,
                },
                flexShrink: 0,
                overflow: 'hidden',
                borderRadius: 3,
                bgcolor: '#151515',
              }}
            >
              <Box
                component="img"
                src={movie.poster}
                alt={movie.title}
                sx={{
                  width: '100%',
                  display: 'block',
                  aspectRatio: '2 / 3',
                  objectFit: 'cover',
                }}
              />
            </Paper>

            {/* Movie Information */}
            <Box
              sx={{
                maxWidth: 700,
                textAlign: {
                  xs: 'center',
                  md: 'left',
                },
              }}
            >
              {/* Genre */}
              <Chip
                label={movie.genre}
                color="success"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                }}
              />

              {/* Title */}
              <Typography
                component="h1"
                variant="h2"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 2,
                  fontSize: {
                    xs: '2.5rem',
                    sm: '3.5rem',
                    md: '4.5rem',
                  },
                }}
              >
                {movie.title}
              </Typography>

              {/* Metadata */}
              <Stack
                direction="row"
                spacing={2.5}
                useFlexGap
                sx={{
                  justifyContent:{
                    xs:'center',
                    md:'flex-start',
                  },
                  flexWrap:'wrap',
                  mb: 3,
                  color: 'grey.300',
                }}
              >
                <Stack
                  direction="row"
                  sx={{spacing:0.7, alignItems:'center',}}
                >
                  <CalendarMonth fontSize="small" />
                  <Typography variant="body1">
                    {movie.year}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  sx={{spacing:0.7, alignItems:'center',}}
                >
                  <AccessTime fontSize="small" />
                  <Typography variant="body1">
                    {movie.duration}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  sx={{alignItems:'center',spacing:0.7,}}
                >
                  <Star
                    fontSize="small"
                    sx={{ color: 'warning.main' }}
                  />
                  <Typography
                    variant="body1"
                    
                    sx={{fontWeight:700}}
                  >
                    {movie.rating.toFixed(1)}
                  </Typography>
                </Stack>
              </Stack>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  color: 'grey.300',
                  lineHeight: 1.8,
                  fontSize: {
                    xs: '1rem',
                    md: '1.1rem',
                  },
                }}
              >
                {movie.description}
              </Typography>

              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrow />}
                onClick={() => setWatchOpen(true)}
                sx={{
                  mt: 4,
                  px: 4,
                  py: 1.3,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 700,
                }}
              >
                Watch Now
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>

      <TrailerModal
        open={watchOpen}
        title={movie.title}
        videoKey={videoKey}
        isLoading={isVideoLoading}
        error={videoError instanceof Error ? videoError.message : null}
        onClose={() => setWatchOpen(false)}
      />
    </Box>

  )
}

