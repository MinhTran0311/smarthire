"use client";

import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  CircularProgress,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "../../../hooks/useTranslation";
import FeatureNavigation from "../../../components/navigation/FeatureNavigation";
import { useData } from "@/app/contexts/DataContext";
import CandidateCard from "@/components/candidates/CandidateCard";

export default function Candidates() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { profiles, loading, error } = useData();

  const handleShowMore = (profileId: string) => {
    // TODO: Implement show more functionality
    console.log("Show more for profile:", profileId);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

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
          {t("features.candidates.title")}
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
            <TextField
              fullWidth
              placeholder={t("features.candidates.searchPlaceholder")}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            />
            <TextField
              select
              label={t("features.candidates.experienceFilter")}
              variant="outlined"
              sx={{ minWidth: 200 }}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">{t("features.candidates.anyExperience")}</option>
              <option value="0-2">
                {t("features.candidates.experienceRange.0-2")}
              </option>
              <option value="3-5">
                {t("features.candidates.experienceRange.3-5")}
              </option>
              <option value="5+">
                {t("features.candidates.experienceRange.5+")}
              </option>
            </TextField>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {profiles.map((profile) => (
              <CandidateCard
                key={profile.name}
                profile={profile}
                onShowMore={() => handleShowMore(profile.name)}
              />
            ))}
          </Box>
        </Paper>
      </Container>
      <FeatureNavigation />
    </Box>
  );
}
