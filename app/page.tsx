"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  useTheme,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SpeedIcon from "@mui/icons-material/Speed";
import { useTranslation } from "../hooks/useTranslation";
import { useRouter } from "next/navigation";

export default function Home() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/features");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.palette.background.default,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            {t("app.name")}
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            {t("app.description")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 4 }}
            onClick={handleGetStarted}
          >
            {t("common.getStarted")}
          </Button>
        </Box>

        {/* Features Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
            mt: 4,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
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
            <WorkIcon
              sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
            />
            <Typography
              variant="h5"
              sx={{ mb: 2, color: theme.palette.secondary.main }}
            >
              {t("features.smartMatching.title")}
            </Typography>
            <Typography color="text.secondary">
              {t("features.smartMatching.description")}
            </Typography>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              p: 3,
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
            <AutoAwesomeIcon
              sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
            />
            <Typography
              variant="h5"
              sx={{ mb: 2, color: theme.palette.secondary.main }}
            >
              {t("features.aiInsights.title")}
            </Typography>
            <Typography color="text.secondary">
              {t("features.aiInsights.description")}
            </Typography>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              p: 3,
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
            <SpeedIcon
              sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
            />
            <Typography
              variant="h5"
              sx={{ mb: 2, color: theme.palette.secondary.main }}
            >
              {t("features.streamlinedProcess.title")}
            </Typography>
            <Typography color="text.secondary">
              {t("features.streamlinedProcess.description")}
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
