"use client";

import { Box, Button, Paper, useTheme } from "@mui/material";
import { useTranslation } from "../../hooks/useTranslation";
import { usePathname, useRouter } from "next/navigation";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";

export default function FeatureNavigation() {
  const { t } = useTranslation();
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const features = [
    {
      path: "/features/upload-profiles",
      icon: <UploadFileIcon />,
      title: t("features.uploadCV.title"),
    },
    {
      path: "/features/upload-job",
      icon: <DescriptionIcon />,
      title: t("features.uploadJob.title"),
    },
    {
      path: "/features/candidates",
      icon: <PeopleIcon />,
      title: t("features.candidates.title"),
    },
  ];

  return (
    <Paper
      elevation={2}
      sx={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          p: 1,
          bgcolor: theme.palette.background.paper,
        }}
      >
        {features.map((feature) => (
          <Button
            key={feature.path}
            variant={pathname === feature.path ? "contained" : "text"}
            color="primary"
            startIcon={feature.icon}
            onClick={() => router.push(feature.path)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 2,
              py: 1,
              minWidth: "auto",
              "&:hover": {
                bgcolor:
                  pathname === feature.path
                    ? theme.palette.primary.dark
                    : theme.palette.action.hover,
              },
            }}
          >
            {feature.title}
          </Button>
        ))}
      </Box>
    </Paper>
  );
}
