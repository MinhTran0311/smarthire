"use client";

import { Button, Menu, MenuItem } from "@mui/material";
import { useTranslation } from "../../hooks/useTranslation";
import { useLocale } from "../../contexts/LocaleContext";
import { useState } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "vi", label: "Tiếng Việt" },
];

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
    handleClose();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
        sx={{ textTransform: "none" }}
      >
        {t("common.language")}:{" "}
        {languages.find((lang) => lang.code === locale)?.label}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={locale === language.code}
          >
            {language.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
