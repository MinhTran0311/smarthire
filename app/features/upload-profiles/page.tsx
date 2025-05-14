"use client";

import { useData } from "@/app/contexts/DataContext";
import CandidateProfileDetail from "@/components/candidates/CandidateProfileDetail";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import FeatureNavigation from "../../../components/navigation/FeatureNavigation";
import { useTranslation } from "../../../hooks/useTranslation";

export default function UploadCV() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { dispatch } = useData();
  const [uploadedProfile, setUploadedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsLoading(false);
        const result = await response.json();
        console.log("result", result);
        if (result.profile) {
          console.log("result.profile", result.profile);
          dispatch({ type: "ADD_PROFILE", payload: result.profile });
          setUploadedProfile(result.profile);
        }
        alert(`Upload successful: ${result.profile?.name || file.name}`);
      } else {
        console.error("Upload failed");
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.palette.background.default,
        py: 8,
      }}
    >
      {!uploadedProfile && (
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            {t("features.uploadCV.title")}
          </Typography>

          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <CloudUploadIcon
              sx={{ fontSize: 80, color: theme.palette.primary.main, mb: 3 }}
            />
            <Typography
              variant="h5"
              sx={{ mb: 2, color: theme.palette.secondary.main }}
            >
              {t("features.uploadCV.description")}
            </Typography>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{ mt: 2 }}
              >
                Choose File
                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
              </Button>
            )}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Supported formats: PDF, DOC, DOCX
            </Typography>
          </Paper>
        </Container>
      )}
      {uploadedProfile && (
        <Box mt={6} display="flex" justifyContent="center">
          <CandidateProfileDetail candidate={uploadedProfile} />
        </Box>
      )}
      <FeatureNavigation />
    </Box>
  );
}
