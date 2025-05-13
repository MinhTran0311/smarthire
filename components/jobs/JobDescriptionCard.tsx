import { Box, Paper, Typography, useTheme } from "@mui/material";
import { JobPost } from "../../backend/models/jobPost";
import { useTranslation } from "../../hooks/useTranslation";

interface JobDescriptionCardProps {
  jobPost: JobPost;
}

export default function JobDescriptionCard({
  jobPost,
}: JobDescriptionCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Paper sx={{ p: 3, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {t("jobPost.title")}: {jobPost.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {t("jobPost.department")}: {jobPost.department}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {t("jobPost.location")}: {jobPost.location}
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        {t("jobPost.description")}: {jobPost.description}
      </Typography>
      <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
        {t("jobPost.requirements")}
      </Typography>
      <Typography variant="body2">{jobPost.requirements}</Typography>
    </Paper>
  );
}
