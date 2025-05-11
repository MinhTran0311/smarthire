"use client";

import React from "react";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SpeedIcon from "@mui/icons-material/Speed";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "#2c3e50",
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Smart Hire
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#34495e",
              mb: 4,
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            Revolutionizing the hiring process with AI-powered candidate
            matching
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#3498db",
              "&:hover": {
                bgcolor: "#2980b9",
              },
              px: 4,
              py: 1.5,
            }}
          >
            Get Started
          </Button>
        </Box>

        {/* Features Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
            mt: 4,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-8px)",
              },
            }}
          >
            <WorkIcon sx={{ fontSize: 60, color: "#3498db", mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, color: "#2c3e50" }}>
              Smart Matching
            </Typography>
            <Typography color="text.secondary">
              AI-powered candidate matching based on job requirements and
              company culture
            </Typography>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-8px)",
              },
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 60, color: "#3498db", mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, color: "#2c3e50" }}>
              AI Insights
            </Typography>
            <Typography color="text.secondary">
              Get detailed insights and recommendations for each candidate
            </Typography>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateY(-8px)",
              },
            }}
          >
            <SpeedIcon sx={{ fontSize: 60, color: "#3498db", mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, color: "#2c3e50" }}>
              Streamlined Process
            </Typography>
            <Typography color="text.secondary">
              Automate and optimize your hiring workflow for better efficiency
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
