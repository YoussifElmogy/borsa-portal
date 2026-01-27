import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "4rem", md: "6rem" },
            fontWeight: 700,
            color: "primary.main",
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontFamily: isRTL
              ? '"Cairo", "Century Gothic", "Arial", "Helvetica", sans-serif'
              : '"Century Gothic", "Arial", "Helvetica", sans-serif',
          }}
        >
          {isRTL ? "الصفحة غير موجودة" : "Page Not Found"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: "text.secondary",
            fontFamily: isRTL
              ? '"Cairo", "Century Gothic", "Arial", "Helvetica", sans-serif'
              : '"Century Gothic", "Arial", "Helvetica", sans-serif',
          }}
        >
          {isRTL
            ? "عذراً، الصفحة التي تبحث عنها غير موجودة."
            : "Sorry, the page you are looking for does not exist."}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: "#e5ae44",
            "&:hover": {
              backgroundColor: "#d49e33",
            },
            fontFamily: isRTL
              ? '"Cairo", "Century Gothic", "Arial", "Helvetica", sans-serif'
              : '"Century Gothic", "Arial", "Helvetica", sans-serif',
          }}
        >
          {isRTL ? "العودة إلى الصفحة الرئيسية" : "Go to Home Page"}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
