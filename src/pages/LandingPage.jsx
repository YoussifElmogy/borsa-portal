// src/pages/LandingPage.jsx
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import MissionVisionSection from '../components/MissionVisionSection'
import WhyJoinSection from '../components/WhyJoinSection'
import Footer from '../components/Footer'
import NewsletterSection from '../components/NewsletterSection'
import AccommodationSection from '../components/AccommodationSection'
import ScrollTopButton from '../components/ScrollTopButton'

const LandingPage = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MissionVisionSection />
      <WhyJoinSection />
      <AccommodationSection />
      <NewsletterSection />
      <Footer />
      <ScrollTopButton />
    </Box>
  )
}

export default LandingPage
