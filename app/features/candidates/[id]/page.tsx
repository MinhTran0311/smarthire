"use client";
import { useParams } from "next/navigation";
import { useData } from "../../../contexts/DataContext";
import CandidateProfileDetail from "@/components/candidates/CandidateProfileDetail";
import { Box, Typography } from "@mui/material";

export default function CandidateDetail() {
  const { id } = useParams();
  const { state } = useData();
  const candidate = state.profiles.find((profile) => profile.id === id);

  if (!candidate) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography>Candidate not found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "#f7f8fa",
        pt: { xs: 6, md: 10 },
        pb: 4,
      }}
    >
      <CandidateProfileDetail candidate={candidate} />
    </Box>
  );
}
