"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";
import { useData } from "../../../contexts/DataContext";
import { useTranslation } from "@/hooks/useTranslation";
import JobDescriptionCard from "@/components/jobs/JobDescriptionCard";
import CandidateCard from "@/components/candidates/CandidateCard";

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
        minHeight: "100vh",
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
          {/* Job Post Information */}
          {currentJobPost && <JobDescriptionCard jobPost={currentJobPost} />}

          {/* Candidate Card */}
          <Paper sx={{ p: 3, position: "relative" }}>
            <CandidateCard
              profile={currentCandidate}
              onShowMore={handleViewProfile}
            />

            {/* Action Buttons */}
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 2 }}
            >
              <IconButton
                color="error"
                size="large"
                onClick={handleReject}
                sx={{ bgcolor: "error.light" }}
                title={t("actions.reject")}
              >
                <CloseIcon />
              </IconButton>
              <Button
                variant="contained"
                startIcon={<VisibilityIcon />}
                onClick={handleViewProfile}
              >
                {t("actions.viewDetails")}
              </Button>
              <IconButton
                color="success"
                size="large"
                onClick={handleAccept}
                sx={{ bgcolor: "success.light" }}
                title={t("actions.accept")}
              >
                <CheckIcon />
              </IconButton>
            </Box>
          </Paper>
        </Box>
      </Container>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
      >
        <DialogTitle>{t("matching.reviewTitle")}</DialogTitle>
        <DialogContent>
          <Typography>{t("matching.reviewDescription")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleStart}>
            {t("actions.letDiveIn")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
