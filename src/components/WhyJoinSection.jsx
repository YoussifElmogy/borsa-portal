import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import GrowthLabIcon from "../assets/nextface website icons-01.svg";
import CMEIcon from "../assets/nextface website icons-02.svg";
import TrendSettersIcon from "../assets/nextface website icons-03.svg";
import NetworkingIcon from "../assets/nextface website icons-04.svg";
import EliteEveningsIcon from "../assets/5.svg";
import whyJoinImg from "../assets/why-join.jpg";

const WhyJoinSection = () => {
  const reasons = [
    {
      icon: TrendSettersIcon,
      title: "Gala dinner",
      description:
        "Enjoy classy entertainment, elite evening events, and seaside gatherings designed for meaningful connections in a luxurious setting.",
    },
    {
      icon: NetworkingIcon,
      title: "Networking",
      description:
        "Engage in exclusive networking opportunities with top KOLs, brands, and societies from around the world.",
    },
    {
      icon: CMEIcon,
      title: "CME",
      description:
        "Earn internationally accredited CME credits while learning from world-renowned experts.",
    },
    {
      icon: GrowthLabIcon,
      title: "Workshop",
      description:
        "Experience live injection demos, advanced lectures, and hands-on workshops on the latest techniques and technologies.",
    },
  ];

  return (
   <Box id="join" sx={{ py: 10, bgcolor: "background.default" }}>
  <Container maxWidth="lg">
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
        Why Join Us
      </Typography>

      {/* ✅ Image Section */}
      <Box
        sx={{
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
          border: "3px solid transparent",
          background: "linear-gradient(135deg, #ffffff, #dfe9f3)",
          p: "3px",
          mb: 4, // 👈 add some margin below image
        }}
      >
        <Box
          component="img"
          src={whyJoinImg}
          alt="Why Join Us"
          sx={{
            width: "100%",
            height: { xs: 300, md: 600 },
            borderRadius: 3,
            transition: "transform 0.5s ease, filter 0.3s ease",
            "&:hover": {
              transform: "scale(1.03)",
              filter: "brightness(1.1)",
            },
          }}
        />

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
      </Box>

      {/* ✅ Centered Text Below Image */}
      <Typography
        variant="h5"
        sx={{
          color: "text.primary",
          maxWidth: "1000px",
          mx: "auto", // center horizontally
          mb: { xs: 4}, // space before cards
          fontSize: { xs: "1rem", sm: "1.25rem" },
          lineHeight: 1.6,
          fontFamily: 'Century Gothic, Arial, Helvetica, sans-serif',

        }}
      >
       Because NextFace is more than a symposium, it’s the beginning of a new era in aesthetic medicine.
      </Typography>
            <Typography
        variant="h5"
        sx={{
          color: "text.primary",
          maxWidth: "1000px",
          mx: "auto", // center horizontally
          mb: { xs: 4, md: 6 }, // space before cards
          fontSize: { xs: "1rem", sm: "1.25rem" },
          lineHeight: 1.6,
          fontFamily: 'Century Gothic, Arial, Helvetica, sans-serif',

        }}
      >
Join global leaders, innovators, and professionals by the beautiful Red Sea in Soma Bay, Egypt, for an unforgettable experience where science, elegance, and connection meet.

      </Typography>
    </Box>

    {/* ✅ Cards Grid */}
    <Grid container  spacing={{ xs: 4, md: 8 }} justifyContent="center">
      {reasons.map((item, idx) => (
        <Grid item key={idx} xs={12} sm={6} md={6}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              p: 2,
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                component="img"
                src={item.icon}
                alt={item.title}
                sx={{
                  width: { xs: 72, sm: 100, md: 160 },
                  height: "auto",
                  objectFit: "contain",
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  textAlign: "center",
                }}
              >
                {item.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.95rem", sm: "1.05rem" },
                  textAlign: "center",
                  maxWidth: 450,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                }}
              >
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>

  );
};

export default WhyJoinSection;
