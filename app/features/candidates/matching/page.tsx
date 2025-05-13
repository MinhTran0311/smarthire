"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useData } from "../../../contexts/DataContext";
import { useTranslation } from "@/hooks/useTranslation";
import JobDescriptionCard from "@/components/jobs/JobDescriptionCard";
import { ProfileSelection } from "@/components/profile/ProfileSelection";

export default function MatchingCandidates() {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { state, dispatch } = useData();
  const [showConfirmDialog, setShowConfirmDialog] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentJobPost = state.jobPosts[0]; // Assuming we're working with the first job post
  const matchedCandidates = currentJobPost?.matchedCandidates || [];
  const currentCandidate = state.profiles.find(
    (profile) => profile.id === matchedCandidates[currentIndex]
  );

  const handleStart = () => {
    setShowConfirmDialog(false);
  };

  const handleReject = () => {
    if (currentIndex < matchedCandidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleAccept = () => {
    if (currentIndex < matchedCandidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleViewProfile = () => {
    if (currentCandidate) {
      router.push(`/features/candidates/matching/${currentCandidate.id}`);
    }
  };

  const handleSaveMatches = () => {
    // if (currentJobPost) {
    //   dispatch({
    //     type: "UPDATE_JOB_POST_MATCHES",
    //     payload: {
    //       jobId: currentJobPost.id,
    //       candidateIds: state.profiles.map((profile) => profile.id),
    //     },
    //   });
    //   router.push("/features/job-posts");
    // }
  };

  if (!currentCandidate) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography>{t("matching.noCandidates")}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: theme.palette.background.default,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 2fr" },
            gap: 4,
          }}
        >
          {currentJobPost && <JobDescriptionCard jobPost={currentJobPost} />}

          <ProfileSelection candidate={currentCandidate} onViewProfile={handleViewProfile} onAccept={handleAccept} onReject={handleReject}/>

        </Box>
      </Container>
    </Box>
    
  );
}
