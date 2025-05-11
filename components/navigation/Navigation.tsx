"use client";

import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  useTheme,
} from "@mui/material";
import { useTranslation } from "../../hooks/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const theme = useTheme();

  const isActive = (path: string) => {
    if (path === "/features") {
      return pathname === "/features" || pathname.startsWith("/features/");
    }
    return pathname === path;
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Link
              href="/"
              passHref
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                color="inherit"
                sx={{
                  textTransform: "none",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: isActive("/") ? theme.palette.primary.main : "inherit",
                }}
              >
                {t("app.name")}
              </Button>
            </Link>
            <Box sx={{ ml: 4, display: "flex", gap: 2 }}>
              <Link
                href="/features"
                passHref
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    color: isActive("/features")
                      ? theme.palette.primary.main
                      : "inherit",
                    fontWeight: isActive("/features") ? "bold" : "normal",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {t("navigation.features")}
                </Button>
              </Link>
              <Link
                href="/about"
                passHref
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    color: isActive("/about")
                      ? theme.palette.primary.main
                      : "inherit",
                    fontWeight: isActive("/about") ? "bold" : "normal",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {t("navigation.about")}
                </Button>
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <LanguageSwitcher />
            <Link
              href="/login"
              passHref
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button
                color="primary"
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                {t("navigation.login")}
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
