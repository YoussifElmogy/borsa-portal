import { Typography, Container, Box, Grid, Chip } from "@mui/material";
import AboutImg from "../assets/about-us.jpg";

const AboutSection = () => {
  return (
    <Box
      id="about"
      sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.default" }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          {/* Left Side Image Box */}

          {/* Right Side Content */}
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
              <Typography
                variant="h2"
                gutterBottom
                color="primary"
                sx={{
                  fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
                  fontWeight: 700,
                }}
              >
                About Us
              </Typography>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.25)", // stronger shadow
                  border: "3px solid transparent",
                  background: "linear-gradient(135deg, #ffffff, #dfe9f3)", // soft gradient border
                  p: "3px", // spacing for gradient border
                }}
              >
                <Box
                  component="img"
                  src={AboutImg}
                  alt="Why Join Us"
                  sx={{
                    width: "100%",
                    height: { xs: 300, md: 600 },
                    borderRadius: 3,
                    transition: "transform 0.5s ease, filter 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      filter: "brightness(1.1)", // brightens image slightly
                    },
                  }}
                />

                {/* Subtle overlay on hover */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0))",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                />

                {/* Optional caption text */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    color: "white",
                    fontWeight: 500,
                    fontSize: "1rem",
                    textShadow: "0px 2px 6px rgba(0,0,0,0.6)",
                  }}
                ></Box>
              </Box>
            </Box>

            <Box
              sx={{
                mb: 3,
                fontSize: { xs: "0.85rem", sm: "1rem", md: "1.1rem" },
                fontWeight: 400,
                lineHeight: { xs: 1.5, sm: 1.6, md: 1.7 },
                color: "#366771",
                textAlign: "left",
              }}
            >
              <Box mb={1}>
              NextFace is a world-class event in aesthetic medicine, where science, innovation, and artistry come together by the sea.
              </Box>
              <Box mb={1}>
              Bringing together global pioneers of the modern aesthetics industry.
              </Box>
              <Box mb={1}>
              Our mission is to redefine beauty through evidence-based practice, technological advancement, and a deep respect for individuality and safety. 
              </Box>
              <Box mb={1}>
              Held in one of the most inspiring destinations, NextFace offers an immersive scientific and networking experience from world-class lectures and live injection demonstrations to hands-on masterclasses led by international experts.
              </Box>
              <Box mb={1}>
              Every session is designed to spark collaboration, challenge conventional thinking, and set new benchmarks in clinical excellence and safety.
              </Box>
              <Box mb={1}>
              Welcome to the future of aesthetics. Welcome to NextFace.
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;
