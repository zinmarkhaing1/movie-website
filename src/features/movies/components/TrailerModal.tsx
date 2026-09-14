import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'

interface TrailerModalProps {
  open: boolean
  title?: string
  videoKey: string | undefined
  isLoading: boolean
  error: string | null
  onClose: () => void
}

export default function TrailerModal({ open, title, videoKey, isLoading, error, onClose }: TrailerModalProps) {
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper:{
          sx:{
          bgcolor: '#0b0b0b',
          color: 'white',
          borderRadius: 3,
          overflow: 'hidden',
          }
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
          px: 3,
        }}
      >
        <Typography variant="h6" component="span" sx={{ fontWeight: 700, pr: 2 }}>
          {title ?? 'Now Playing'}
        </Typography>

        <IconButton
          onClick={handleClose}
          size="small"
          sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}
          aria-label="Close player"
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            bgcolor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isLoading && <CircularProgress sx={{ color: 'success.main' }} />}

          {!isLoading && !error && videoKey && (
            <Box
              component="iframe"
              title={title ?? 'Movie player'}
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
            />
          )}

          {!isLoading && error && (
            <Typography color="error">Failed to load video. Please try again.</Typography>
          )}

          {!isLoading && !error && !videoKey && (
            <Typography sx={{ color: 'grey.400' }}>No video available for this movie.</Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}