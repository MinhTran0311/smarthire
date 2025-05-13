"use client";

import CandidateCard from "@/components/candidates/CandidateCard";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useData } from "../../../app/contexts/DataContext";
import { JobPost } from "../../../backend/models/jobPost";
import FeatureNavigation from "../../../components/navigation/FeatureNavigation";
import { useTranslation } from "../../../hooks/useTranslation";

export default function UploadJob() {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    dispatch,
    state: { profiles, matchingCandidates },
  } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSubmittedJobId, setLastSubmittedJobId] = useState<string | null>(
    null
  );
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
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

      // Add job post to context
      dispatch({ type: "ADD_JOB_POST", payload: newJobPost });

      // Find matching candidates
      const response = await fetch("/api/jobs/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobPost: newJobPost, profiles }),
      });

      if (!response.ok) {
        throw new Error("Failed to find matching candidates");
      }

      const { matchingCandidateIds } = await response.json();
      dispatch({
        type: "SET_MATCHING_CANDIDATES",
        payload: { jobId: newJobPost.id, candidateIds: matchingCandidateIds },
      });

      setLastSubmittedJobId(newJobPost.id);
      // Wait at least 1 second to show loading spinner
      setTimeout(() => {
        setIsLoading(false);
        router.push("/features/candidates/matching");
        formRef.current?.reset();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const matchedProfiles = lastSubmittedJobId
    ? profiles.filter((profile) =>
        matchingCandidates[lastSubmittedJobId]?.includes(profile.id)
      )
    : [];

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
            mb: 4,
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

          <Box
            component="form"
            ref={formRef}
            onSubmit={handleSubmit}
            sx={{ width: "100%" }}
          >
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

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {isLoading
                  ? t("features.uploadJob.form.submitting")
                  : t("features.uploadJob.form.submit")}
              </Button>
            </Box>
          </Box>
        </Paper>

        {matchedProfiles.length > 0 && (
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              {t("features.uploadJob.matchedCandidates")}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {t("features.uploadJob.matchedCandidatesDescription")}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: 3,
              }}
            >
              {matchedProfiles.map((profile) => (
                <Box key={profile.id}>
                  <CandidateCard
                    profile={profile}
                    onShowMore={() => {
                      // TODO: Implement show more functionality
                      console.log("Show more for profile:", profile.id);
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        )}
      </Container>
      <FeatureNavigation />
    </Box>
  );
}
