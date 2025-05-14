"use client";

import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  useTheme,
} from "@mui/material";
import { useTranslation } from "../../../hooks/useTranslation";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FeatureNavigation from "../../../components/navigation/FeatureNavigation";

export default function UploadCV() {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/files', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('File uploaded:', result);
        alert(`Upload successful: ${result.fileName}`);
      } else {
        console.error('Upload failed');
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
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
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Supported formats: PDF, DOC, DOCX
          </Typography>
        </Paper>
      </Container>
      <FeatureNavigation />
    </Box>
  );
}
