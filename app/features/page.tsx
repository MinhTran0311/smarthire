"use client";

import { Box, Container, Typography, Paper, useTheme } from "@mui/material";
import { useTranslation } from "../../hooks/useTranslation";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import { useRouter } from "next/navigation";

export default function Features() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const features = [
    {
      icon: (
        <UploadFileIcon
          sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
        />
      ),
      title: t("features.uploadCV.title"),
      description: t("features.uploadCV.description"),
      path: "/features/upload-cv",
    },
    {
      icon: (
        <DescriptionIcon
          sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
        />
      ),
      title: t("features.uploadJob.title"),
      description: t("features.uploadJob.description"),
      path: "/features/upload-job",
    },
    {
      icon: (
        <PeopleIcon
          sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }}
        />
      ),
      title: t("features.candidates.title"),
      description: t("features.candidates.description"),
      path: "/features/candidates",
    },
  ];

  const handleFeatureClick = (path: string) => {
    router.push(path);
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
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    backgroundColor: theme.palette.background.paper,
                  },
                }}
                onClick={() => handleFeatureClick(feature.path)}
              >
                {feature.icon}
                <Typography
                  variant="h5"
                  sx={{ mb: 2, color: theme.palette.secondary.main }}
                >
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
