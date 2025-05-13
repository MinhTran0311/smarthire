"use client";

import { Box, Container, Typography, Paper } from "@mui/material";
import { useTranslation } from "../../hooks/useTranslation";

export default function About() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          {t("navigation.about")}
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 800,
            mx: "auto",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" gutterBottom color="primary">
            {t("about.mission.title")}
          </Typography>
          <Typography paragraph>{t("about.mission.description")}</Typography>

          <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
            {t("about.vision.title")}
          </Typography>
          <Typography paragraph>{t("about.vision.description")}</Typography>

          <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
            {t("about.team.title")}
          </Typography>
          <Typography paragraph>{t("about.team.description")}</Typography>
        </Paper>
      </Container>
    </Box>
  );
}
