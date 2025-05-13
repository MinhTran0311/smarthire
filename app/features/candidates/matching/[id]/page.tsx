"use client";

import { useParams } from "next/navigation";
import { Profile } from "@/backend/models/profile";
import CandidateProfileDetail from "@/components/candidates/CandidateProfileDetail";
import JobDescriptionCard from "@/components/jobs/JobDescriptionCard";
import ChatBot from "@/components/chat/ChatBot";
import { Box, Typography } from "@mui/material";
import { useData } from "@/app/contexts/DataContext";

export default function MatchingCandidateDetail() {
  const { id } = useParams();
  const { state } = useData();
  const candidate = state.profiles.find(
    (profile: Profile) => profile.id === id
  );
  const jobPost = state.jobPosts[0]; // Or select the relevant job post

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
        background: "#f7f8fa",
        pt: { xs: 6, md: 10 },
        pb: 4,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.2fr 2.5fr" },
          gap: 6,
          alignItems: "start",
          maxWidth: 1600,
          mx: "auto",
        }}
      >
        {/* Left: Job Post Information */}
        {jobPost && <JobDescriptionCard jobPost={jobPost} />}
        {/* Right: Candidate Profile */}
        <CandidateProfileDetail candidate={candidate} />
      </Box>

      {/* Chat Bot */}
      {jobPost && (
        <ChatBot
          candidateInfo={candidate.extractedText || ""}
          jobDescription={`Job Title: ${jobPost.title || ""}\nDepartment: ${
            jobPost.department || ""
          }\nLocation: ${jobPost.location || ""}\nDescription: ${
            jobPost.description || ""
          }\nRequirements: ${jobPost.requirements || ""}`}
        />
      )}
    </Box>
  );
}
