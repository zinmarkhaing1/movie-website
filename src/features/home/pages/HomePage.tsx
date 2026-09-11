import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useMovieStore } from '../../../app/store/movieStore';
import { useMovies, useMovieTrailer } from '../../movies';
import TrailerModal from '../../movies/components/TrailerModal';
import {Box, Button, Card, CardContent, Chip, Container, Grid, IconButton, Rating, Stack, Typography,} from '@mui/material';
import {Favorite, FavoriteBorder, PlayArrow, ArrowForward, } from '@mui/icons-material';

export default function HomePage() {
  const { movies, featuredMovie, isLoading, error } = useMovies()
  const { isFavorite, toggleFavorite } = useMovieStore()
  const [watchOpen, setWatchOpen] = useState(false)
  const { data: videoKey, isLoading: isVideoLoading, error: videoError } = useMovieTrailer(
    featuredMovie?.id,
    watchOpen,
  )

  if (isLoading) {
    return (
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#0b0b0b',
          color: 'white',
        }}
      >
        <Typography variant="h6">
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#0b0b0b',
          color: 'white',
        }}
      >
        <Typography variant="h6">
          Error: {error}
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

        {/* Hero Section */}
        <Box
          component="section"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '1.2fr 0.8fr',
            },
            gap: 4,
            alignItems: 'center',
            mb: 8,
          }}
        >
          {/* Hero Text */}
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: 'success.main',
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              Now Streaming
            </Typography>

            <Typography
              component="h1"
              variant="h2"
              sx={{
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 2,
                maxWidth: 650,
                fontSize: {
                  xs: '2.5rem',
                  md: '4rem',
                },
              }}
            >
              Discover your next favorite movie.
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'grey.400',
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: 600,
                mb: 4,
              }}
            >
              Browse handpicked films, trending picks, and classics
              curated for every mood.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrow />}
                onClick={() => setWatchOpen(true)}
                sx={{
                  px: 3,
                  py: 1.3,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 700,
                }}
              >
                Watch Now
              </Button>

              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/movies"
                endIcon={<ArrowForward />}
                sx={{
                  px: 3,
                  py: 1.3,
                  borderRadius: 2,
                  color: 'white',
                  borderColor: 'grey.700',
                  textTransform: 'none',
                  fontWeight: 700,
                  '&:hover': {
                    borderColor: 'grey.400',
                  },
                }}
              >
                Browse Movies
              </Button>
            </Stack>
          </Box>

          {/* Featured Movie */}
          <Card
            sx={{
              bgcolor: '#151515',
              color: 'white',
              borderRadius: 4,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'grey.900',
            }}
          >
            <Box
              sx={{
                height: 320,
                backgroundImage: `
                  linear-gradient(
                    135deg,
                    rgba(34, 197, 94, 0.3),
                    rgba(59, 130, 246, 0.2)
                  ),
                  url(${featuredMovie?.poster ?? ''})
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            <CardContent sx={{ p: 3 }}>
              <Chip
                label="Featured"
                size="small"
                color="success"
                sx={{ mb: 1.5 }}
              />

              <Typography
                variant="h5"
                gutterBottom
                sx={{fontWeight:700, }}
              >
                {featuredMovie?.title ?? 'Featured Movie'}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'grey.400',
                  mb: 2,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {featuredMovie?.description ??
                  'A cinematic pick for tonight.'}
              </Typography>

              <Button
                component={Link}
                to={`/movie/${featuredMovie?.id ?? ''}`}
                variant="text"
                endIcon={<ArrowForward />}
                sx={{
                  p: 0,
                  textTransform: 'none',
                  fontWeight: 700,
                }}
              >
                View details
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* Popular Movies */}
        <Box component="section">
          <Stack
            direction="row"
            sx={{ mb: 3, justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography
              component="h2"
              variant="h4"
              sx={{fontWeight:800}}
            >
              Popular this week
            </Typography>

            <Button
              component={Link}
              to="/movies"
              endIcon={<ArrowForward />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              View all
            </Button>
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
                <Card
                  sx={{
                    height: '100%',
                    bgcolor: '#111111',
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
                  {/* Movie Poster */}
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
                    {/* Genre + Rating */}
                    <Stack
                      direction="row"
                      sx={{ mb: 1 , justifyContent:'space-between', alignItems:'center'}}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: 'grey.400' }}
                      >
                        {movie.genre}
                      </Typography>

                      <Stack
                        direction="row"
                        sx={{spacing:0.5, alignItems:'center'}}
                      >
                        <Rating
                          value={movie.rating}
                          readOnly
                          // size="small"
                          sx={{max:5, precision:0.1,}}
                        />

                        <Typography
                          variant="body2"
                          sx={{fontWeight:600}}
                        >
                          {movie.rating}
                        </Typography>
                      </Stack>
                    </Stack>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      sx={{ 
                        height:60,
                        mb: 1 ,
                         fontWeight:700,
                      //    display: '-webkit-box',
                      // WebkitLineClamp: 2,
                      // WebkitBoxOrient: 'horizontal',
                      // overflow:'hidden',
                      }}
                    >
                      {movie.title}
                    </Typography>

                    {/* Year + Duration */}
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ mb: 2 }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: 'grey.500' }}
                      >
                        {movie.year}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: 'grey.500' }}
                      >
                        {movie.duration}
                      </Typography>
                    </Stack>

                    {/* Actions */}
                    <Stack
                      direction="row"
                      sx={{justifyContent:'space-between',alignItems:'center'}}
                    >
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
                        color={
                          isFavorite(movie.id)
                            ? 'error'
                            : 'default'
                        }
                        aria-label={
                          isFavorite(movie.id)
                            ? 'Remove from favorites'
                            : 'Add to favorites'
                        }
                      >
                        {isFavorite(movie.id) ? (
                          <Favorite />
                        ) : (
                          <FavoriteBorder />
                        )}
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <TrailerModal
        open={watchOpen}
        title={featuredMovie?.title}
        videoKey={videoKey}
        isLoading={isVideoLoading}
        error={videoError instanceof Error ? videoError.message : null}
        onClose={() => setWatchOpen(false)}
      />
    </Box>

  )
}






