"use client";

import { Box, Container, Typography, Paper } from "@mui/material";
import { useTranslation } from "../../hooks/useTranslation";
import WorkIcon from "@mui/icons-material/Work";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SpeedIcon from "@mui/icons-material/Speed";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <WorkIcon sx={{ fontSize: 60, color: "#3498db", mb: 2 }} />,
      title: t("features.smartMatching.title"),
      description: t("features.smartMatching.description"),
    },
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 60, color: "#3498db", mb: 2 }} />,
      title: t("features.aiInsights.title"),
      description: t("features.aiInsights.description"),
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 60, color: "#3498db", mb: 2 }} />,
      title: t("features.streamlinedProcess.title"),
      description: t("features.streamlinedProcess.description"),
    },
  ];

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
          {t("navigation.features")}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          {features.map((feature, index) => (
            <Box key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                }}
              >
                {feature.icon}
                <Typography variant="h5" sx={{ mb: 2, color: "#2c3e50" }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
