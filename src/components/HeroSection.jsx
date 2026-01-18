import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hero4 from "../assets/4.jpg";
import hero5 from "../assets/3.jpg";
import hero1 from "../assets/bg-3.jpg";
import hero2 from "../assets/bg-2.jpg";
import hero3 from "../assets/bg-1.jpg";
import {
  Typography,
  Container,
  Button,
  Box,
  Grid,
  Paper,
IconButton,
} from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [bgIndex, setBgIndex] = useState(0);
  const bgImages = [hero2, hero3, hero1, hero4, hero5];
  const navigate = useNavigate();
  // Countdown to December 3, 2025
  useEffect(() => {
    const targetDate = new Date("2025-12-03T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (difference < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Background slider - crossfade between images only, keep content static
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 6000); // 6s per slide
    return () => clearInterval(interval);
  }, [bgImages.length]);

  const handlePrev = () => {
    setBgIndex((prev) => (prev - 1 + bgImages.length) % bgImages.length);
  };

  const handleNext = () => {
    setBgIndex((prev) => (prev + 1) % bgImages.length);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        color: "white",
        pt: { xs: 10, md: 12 },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)", // Dark overlay
          zIndex: 1,
        },

       
      }}
    >
      {bgImages.map((src, idx) => (
        <Box
          key={idx}
          component="img"
          src={src}
          alt=""
          aria-hidden
          data-bg
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 0,
            opacity: idx === bgIndex ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
      {/* Carousel Controls - bottom center */}
      <Box
        sx={{
          position: "absolute",
          zIndex: 3,
          bottom: 20,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton
          onClick={handlePrev}
          aria-label="Previous slide"
          sx={{
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.25)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.4)" },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          {bgImages.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => setBgIndex(idx)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: idx === bgIndex ? "#dcd5cd" : "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.7)",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
        <IconButton
          onClick={handleNext}
          aria-label="Next slide"
          sx={{
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.25)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.4)" },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Container maxWidth="lg" sx={{ zIndex: 100 }}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                mb: { xs: 3, md: 4 },
                opacity: 0.9,
                color: "#dcd5cd",
                lineHeight: 1.6,
                textAlign: "center",
                fontSize: {
                  xs: "1.3rem",
                  sm: "2rem",
                },
              }}
            >
              The Next Era. The Next Innovation.
              <br />
              The NextFace of Aesthetics.
            </Typography>

            {/* Event Details */}
            <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", mb: 1, gap: { xs: 1, md: 4 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: { xs: 1, md: 2 },
                }}
              >
                <CalendarIcon sx={{ mr: 1, color: "#dcd5cd" }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1.1rem" },
                    color: "#dcd5cd",
                  }}
                >
                  3 - 6 December 2025
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: { xs: 1, md: 2 },
                }}
              >
                <LocationIcon sx={{ mr: 1, color: "#dcd5cd" }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "0.9rem", sm: "1.1rem" },
                    color: "#dcd5cd",
                  }}
                >
                  Soma Bay, Hurghada, Egypt
                </Typography>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#dcd5cd",
                  color: "#1a3741",
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1, sm: 1.25 },
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
                onClick={() => navigate("/register")}
              >
                Register Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<CalendarIcon />}
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Innovation+Summit+2025&dates=20251203T090000Z/20251203T170000Z&details=Join+us+for+an+extraordinary+event+that+will+shape+the+future+of+innovation+and+technology.&location=Innovation+Center,+Tech+District"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: "#dcd5cd",
                  borderColor: "#82b6b8",
                  color: "#1a3741",
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1, sm: 1.25 },
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Add to Calendar
              </Button>
            </Box>
          </Grid>

          {/* Countdown Timer */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  color: "#dcd5cd",
                  mb: { xs: 2, md: 3 },
                  fontSize: { xs: "1.25rem", sm: "1.34rem" },
                }}
              >
                Event Countdown
              </Typography>
              <Grid container spacing={2}>
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((item) => (
                  <Grid item xs={3} key={item.label}>
                    <Box
                      sx={{
                        p: { xs: 1, sm: 2 },
                        borderRadius: 2,
                        background: "rgba(130, 182, 184, 0.2)",
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 700,
                          color: "#dcd5cd",
                          fontSize: { xs: "1.25rem", sm: "1.5rem" },
                        }}
                      >
                        {item.value.toString().padStart(2, "0")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#dcd5cd",
                          textTransform: "uppercase",
                          fontSize: { xs: "0.6rem", sm: "0.55rem" },
                          fontWeight: 700,

                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
