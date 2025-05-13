import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Profile } from "../../backend/models/profile";
import { useTranslation } from "../../hooks/useTranslation";

interface CandidateCardProps {
  profile: Profile;
  onShowMore?: () => void;
}

export default function CandidateCard({
  profile,
  onShowMore,
}: CandidateCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 56,
              height: 56,
              mr: 2,
            }}
          >
            {profile.name.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{profile.name}</Typography>
            <Typography color="text.secondary">{profile.title}</Typography>
          </Box>
          <IconButton size="small" onClick={onShowMore}>
            <InfoIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {t("features.candidates.experience")}: {profile.yearsOfExperience}{" "}
          {t("features.candidates.years")}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {t("features.candidates.skills")}:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mt: 1,
            }}
          >
            {profile.skills.map((skill: string, index: number) => (
              <Chip key={index} label={skill} size="small" />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
