"use client";

import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
} from "@mui/material";
import { useTranslation } from "../../../hooks/useTranslation";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import FeatureNavigation from "../../../components/navigation/FeatureNavigation";

export default function Candidates() {
  const { t } = useTranslation();
  const theme = useTheme();

  // Mock data for demonstration
  const candidates = [
    {
      id: 1,
      name: "John Doe",
      title: "Senior Software Engineer",
      experience: "8 years",
      skills: ["React", "Node.js", "TypeScript"],
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "Product Manager",
      experience: "5 years",
      skills: ["Agile", "Product Strategy", "UX"],
    },
    {
      id: 3,
      name: "Mike Johnson",
      title: "Full Stack Developer",
      experience: "6 years",
      skills: ["Python", "Django", "React"],
    },
  ];

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
              placeholder="Search candidates..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            />
            <TextField
              select
              label="Experience"
              variant="outlined"
              sx={{ minWidth: 200 }}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">Any</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </TextField>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {candidates.map((candidate) => (
              <Card
                key={candidate.id}
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
                      {candidate.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{candidate.name}</Typography>
                      <Typography color="text.secondary">
                        {candidate.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Experience: {candidate.experience}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Skills:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        mt: 1,
                      }}
                    >
                      {candidate.skills.map((skill) => (
                        <Typography
                          key={skill}
                          variant="body2"
                          sx={{
                            bgcolor: theme.palette.primary.light,
                            color: theme.palette.primary.contrastText,
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                          }}
                        >
                          {skill}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Paper>
      </Container>
      <FeatureNavigation />
    </Box>
  );
}
