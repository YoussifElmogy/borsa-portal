import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import missionimg from "../assets/why.jpg";

const MissionVisionSection = () => {
  return (
    <Box id="mission" sx={{ py: 11, bgcolor: "white" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h2"
            s
            gutterBottom
            color="primary"
            sx={{
              fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" },
              fontWeight: 700,
            }}
          >
            Mission & Vision
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
              src={missionimg}
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

        {/* Mission & Vision Cards */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", p: { xs: 2, md: 3 } }}>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  color="#1a3741 "
                  sx={{
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
                  }}
                >
                  Our Mission
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "0.85rem", sm: "1rem" },
                    lineHeight: { xs: 1.5, sm: 1.6, md: 1.7 },
                    color: "#366771",
                    textAlign: "left",
                  }}
                >
             To elevate the standards of aesthetic medicine through education, innovation, and collaboration.
NextFace unites global experts and passionate professionals to exchange knowledge, promote safety, and inspire the future of aesthetic excellence, all in a setting where science meets serenity by the Red Sea.

                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", p: { xs: 2, md: 3 } }}>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  color="#1a3741 "
                  sx={{
                    mb: { xs: 2, md: 3 },
                    fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
                  }}
                >
                  Our Vision
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "0.85rem", sm: "1rem" },
                    lineHeight: { xs: 1.5, sm: 1.6, md: 1.7 },
                    color: "#366771",
                    textAlign: "left",
                  }}
                >
                  To make NextFace a global meeting point for aesthetic professionals, connecting experts and societies from around the world to share knowledge and promote safe, effective, and ethical practice.
We aim to lead a new era in aesthetic medicine where innovation, education, and collaboration shape the future of beauty.

                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MissionVisionSection;
