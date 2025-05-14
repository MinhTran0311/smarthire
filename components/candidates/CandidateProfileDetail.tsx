import { Education, Experience, Profile } from "@/backend/models/profile";
import { useTranslation } from "@/hooks/useTranslation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";

interface CandidateProfileDetailProps {
  candidate: Profile;
}

export default function CandidateProfileDetail({
  candidate,
}: CandidateProfileDetailProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const handleDownloadResume = () => {
    if (candidate?.pathToResume) {
    const link = document.createElement('a');
    link.href = `/api/files?fileName=${encodeURIComponent(candidate.pathToResume)}`;
    link.download = candidate.pathToResume; // Optional: lets browser name the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    }
  };

  return (
    <Paper
      sx={{
        p: { xs: 3, md: 6 },
        borderRadius: 4,
        minWidth: 400,
        maxWidth: 800,
        mx: "auto",
        boxShadow: 4,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Avatar sx={{ width: 110, height: 110, mr: 4 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {candidate.name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {candidate.title}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{ minWidth: 200, fontSize: 18, py: 1.5, maxHeight: 50 }}
          onClick={handleDownloadResume}
        >
          {t("actions.downloadResume")}
        </Button>
      </Box>

      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          mt: 3,
          pt: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          {t("candidate.aboutMe")}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, fontSize: 18 }}
        >
          {candidate.aboutMe}
        </Typography>

        <Accordion defaultExpanded sx={{ mb: 3 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">{t("candidate.experience")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {candidate.experience && candidate.experience.length > 0 ? (
              candidate.experience.map((exp: Experience, idx: number) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Typography fontWeight={600} fontSize={18}>
                    {exp.title} @ {exp.company}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: 16 }}
                  >
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

        <Accordion defaultExpanded sx={{ mb: 3 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">{t("candidate.education")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {candidate.education && candidate.education.length > 0 ? (
              candidate.education.map((edu: Education, idx: number) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Typography fontWeight={600} fontSize={18}>
                    {edu.degree} @ {edu.institution}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: 16 }}
                  >
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

        <Accordion defaultExpanded sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">{t("candidate.skills")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
              {candidate.skills && candidate.skills.length > 0 ? (
                candidate.skills.map((skill: string, idx: number) => (
                  <Chip
                    key={idx}
                    label={skill}
                    sx={{ fontSize: 16, px: 2, py: 1 }}
                  />
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
  );
}
