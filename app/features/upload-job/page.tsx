"use client";

import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import { useTranslation } from "../../../hooks/useTranslation";
import DescriptionIcon from "@mui/icons-material/Description";
import FeatureNavigation from "../../../components/navigation/FeatureNavigation";

export default function UploadJob() {
  const { t } = useTranslation();
  const theme = useTheme();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted");
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
          {t("features.uploadJob.title")}
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DescriptionIcon
            sx={{ fontSize: 80, color: theme.palette.primary.main, mb: 3 }}
          />
          <Typography
            variant="h5"
            sx={{ mb: 4, color: theme.palette.secondary.main }}
          >
            {t("features.uploadJob.description")}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="Job Title"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Department"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Job Description"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              fullWidth
              label="Requirements"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}
            >
              Submit Job Description
            </Button>
          </Box>
        </Paper>
      </Container>
      <FeatureNavigation />
    </Box>
  );
}
