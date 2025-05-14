"use client";

import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  CircularProgress,
  useTheme,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "../../../hooks/useTranslation";
import FeatureNavigation from "../../../components/navigation/FeatureNavigation";
import { useData } from "@/app/contexts/DataContext";
import CandidateCard from "@/components/candidates/CandidateCard";
import { Profile } from "../../../backend/models/profile";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Candidates() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    state: { profiles, isLoading: loading, error, jobPosts },
  } = useData();

  const [search, setSearch] = useState("");
  const [yoe, setYoe] = useState("");
  const [matchedJobId, setMatchedJobId] = useState("");

  useEffect(() => {
    const jobPostId = searchParams.get("jobPostId");
    if (jobPostId) setMatchedJobId(jobPostId);
  }, [searchParams]);

  const handleShowMore = (profileId: string) => {
    router.push(`/features/candidates/${profileId}`);
  };

  // Filtering logic
  let filteredProfiles = profiles.filter((profile: Profile) => {
    // Search filter
    const matchesSearch =
      profile.name.toLowerCase().includes(search.toLowerCase()) ||
      profile.title.toLowerCase().includes(search.toLowerCase());
    // YOE filter
    let matchesYoe = true;
    if (yoe === "0-2")
      matchesYoe =
        profile.yearsOfExperience >= 0 && profile.yearsOfExperience <= 2;
    else if (yoe === "3-5")
      matchesYoe =
        profile.yearsOfExperience >= 3 && profile.yearsOfExperience <= 5;
    else if (yoe === "5+") matchesYoe = profile.yearsOfExperience > 5;
    // Matched job filter
    let matchesJob = true;
    if (matchedJobId)
      matchesJob = profile.selectedJobPostIds?.includes(matchedJobId);
    return matchesSearch && matchesYoe && matchesJob;
  });

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
          <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
            <TextField
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("features.candidates.searchPlaceholder")}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
              sx={{ minWidth: 220 }}
            />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>
                {t("features.candidates.experienceFilter")}
              </InputLabel>
              <Select
                value={yoe}
                label={t("features.candidates.experienceFilter")}
                onChange={(e) => setYoe(e.target.value)}
              >
                <MenuItem value="">
                  {t("features.candidates.anyExperience")}
                </MenuItem>
                <MenuItem value="0-2">
                  {t("features.candidates.experienceRange.0-2")}
                </MenuItem>
                <MenuItem value="3-5">
                  {t("features.candidates.experienceRange.3-5")}
                </MenuItem>
                <MenuItem value="5+">
                  {t("features.candidates.experienceRange.5+")}
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 220 }}>
              <InputLabel>{t("features.uploadJob.title")}</InputLabel>
              <Select
                value={matchedJobId}
                label={t("features.uploadJob.title")}
                onChange={(e) => setMatchedJobId(e.target.value)}
              >
                <MenuItem value="">
                  {t("features.candidates.anyExperience")}
                </MenuItem>
                {jobPosts.map((job) => (
                  <MenuItem key={job.id} value={job.id}>
                    {job.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {filteredProfiles.map((profile: Profile) => (
              <CandidateCard
                key={profile.id}
                profile={profile}
                onShowMore={() => handleShowMore(profile.id)}
              />
            ))}
          </Box>
        </Paper>
      </Container>
      <FeatureNavigation />
    </Box>
  );
}
