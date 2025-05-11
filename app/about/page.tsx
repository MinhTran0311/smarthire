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
            Our Mission
          </Typography>
          <Typography paragraph>
            At Smart Hire, we're revolutionizing the hiring process by
            leveraging the power of artificial intelligence. Our mission is to
            make hiring more efficient, fair, and effective for both employers
            and job seekers.
          </Typography>

          <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
            Our Vision
          </Typography>
          <Typography paragraph>
            We envision a future where AI-powered tools help create better
            matches between companies and candidates, leading to more successful
            and fulfilling careers.
          </Typography>

          <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
            Our Team
          </Typography>
          <Typography paragraph>
            Our team consists of experts in AI, HR, and software development,
            working together to create innovative solutions for modern hiring
            challenges.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
