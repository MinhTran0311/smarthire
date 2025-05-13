"use client";

import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Button,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useData } from "../../../contexts/DataContext";
import { useParams } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import JobDescriptionCard from "@/components/jobs/JobDescriptionCard";
import { Education, Experience } from "@/backend/models/profile";

export default function CandidateDetail() {
  const theme = useTheme();
  const { id } = useParams();
  const { state } = useData();
  const { t } = useTranslation();

  const candidate = state.profiles.find((profile) => profile.id === id);
  const currentJobPost = state.jobPosts[0]; // Assuming first job post is relevant

  const handleDownloadResume = () => {
    if (candidate?.pathToResume) {
      // Open in new tab or trigger download
      const link = document.createElement("a");
      link.href = candidate.pathToResume;
      console.log("candidate.pathToResume", candidate.pathToResume);
      link.download = candidate.pathToResume.split("/").pop() || "resume.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!candidate) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography>{t("matching.candidateNotFound")}</Typography>
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
          {currentJobPost && <JobDescriptionCard jobPost={currentJobPost} />}

          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ width: 80, height: 80, mr: 3 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {candidate.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {candidate.title}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                sx={{ minWidth: 180 }}
                onClick={handleDownloadResume}
              >
                {t("actions.downloadResume")}
              </Button>
            </Box>

            <Box
              sx={{
                borderTop: `1px solid ${theme.palette.divider}`,
                mt: 2,
                pt: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                {t("candidate.aboutMe")}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {candidate.aboutMe}
              </Typography>

              <Accordion defaultExpanded sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    {t("candidate.experience")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {candidate.experience && candidate.experience.length > 0 ? (
                    candidate.experience.map((exp: Experience, idx: number) => (
                      <Box key={idx} sx={{ mb: 2 }}>
                        <Typography fontWeight={600}>
                          {exp.title} @ {exp.company}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {exp.duration}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      {t("candidate.noExperience")}
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    {t("candidate.education")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {candidate.education && candidate.education.length > 0 ? (
                    candidate.education.map((edu: Education, idx: number) => (
                      <Box key={idx} sx={{ mb: 2 }}>
                        <Typography fontWeight={600}>
                          {edu.degree} @ {edu.institution}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {edu.graduationYear}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      {t("candidate.noEducation")}
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion defaultExpanded sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{t("candidate.skills")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {candidate.skills && candidate.skills.length > 0 ? (
                      candidate.skills.map((skill: string, idx: number) => (
                        <Chip key={idx} label={skill} />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {t("candidate.noSkills")}
                      </Typography>
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
