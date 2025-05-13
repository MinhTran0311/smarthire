"use client";

import { useData } from "@/app/contexts/DataContext";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { JobPost } from "../../../backend/models/jobPost";
import FeatureNavigation from "../../../components/navigation/FeatureNavigation";
import { useTranslation } from "../../../hooks/useTranslation";

export default function UploadJob() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { dispatch } = useData();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newJobPost: JobPost = {
      id: crypto.randomUUID(),
      title: formData.get("title") as string,
      department: formData.get("department") as string,
      location: formData.get("location") as string,
      description: formData.get("description") as string,
      requirements: formData.get("requirements") as string,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add the new job post to the context
    dispatch({ type: "ADD_JOB_POST", payload: newJobPost });

    // TODO: Implement API call to save the job post
    console.log("New job post:", newJobPost);
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
              name="title"
              label={t("features.uploadJob.form.title")}
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="department"
              label={t("features.uploadJob.form.department")}
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="location"
              label={t("features.uploadJob.form.location")}
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              name="description"
              label={t("features.uploadJob.form.description")}
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              fullWidth
              name="requirements"
              label={t("features.uploadJob.form.requirements")}
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
              {t("features.uploadJob.form.submit")}
            </Button>
          </Box>
        </Paper>
      </Container>
      <FeatureNavigation />
    </Box>
  );
}
