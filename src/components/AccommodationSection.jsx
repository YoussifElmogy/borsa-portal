import { Box, Container, Grid, Typography } from '@mui/material'
import heroImg from '../assets/hotel1.jpg'
import aboutImg from '../assets/hotel2.jpg'
import whyJoinImg from '../assets/hotel3.jpg'
import registerImg from '../assets/hotel4.jpg'

const AccommodationSection = () => {
  const images = [heroImg, aboutImg, whyJoinImg, registerImg]

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          color="primary"
          gutterBottom
          sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem' }, fontWeight: 700, textAlign: 'center', mb: { xs: 4, md: 6 } }}
        >
          Accomodation
        </Typography>
        <Grid container spacing={3} alignItems="stretch" justifyContent="center">
          {images.map((src, idx) => (
            <Grid item key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                component="img"
                src={src}
                alt={`Accommodation ${idx + 1}`}
                sx={{
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: 3,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default AccommodationSection


