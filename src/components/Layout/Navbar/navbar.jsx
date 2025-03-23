/* eslint-disable */

import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Popover,
  MenuItem,
} from "@mui/material";
import GlobalSearch from "./GlobalSearch/globalSearch";
import UserProfile from "./UserProfile/userProfile";
import { Iconify } from "../../iconify/iconify";
import React from "react";

// Language Selector Component
const LanguageSelector = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedLanguage, setSelectedLanguage] = React.useState("English");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    handleClose();
  };

  const open = Boolean(anchorEl);

  const languages = [
    { code: "en", name: "English", icon: "twemoji:flag-united-kingdom" },
    { code: "fr", name: "French", icon: "twemoji:flag-france" },
  ];

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <Box
          component="span"
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Iconify
            icon={
              selectedLanguage === "English"
                ? "twemoji:flag-united-kingdom"
                : "twemoji:flag-france"
            }
            width={24}
          />
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
          }}
        >
          {selectedLanguage}
        </Typography>
        <Iconify icon="eva:chevron-down-fill" width={20} />
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            width: 180,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            selected={language.name === selectedLanguage}
            onClick={() => handleLanguageSelect(language.name)}
            sx={{
              py: 1,
              px: 2.5,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Iconify icon={language.icon} width={20} />
            {language.name}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};

// Main Navbar Component
const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: isSidebarOpen ? `calc(100% - 240px)` : `calc(100% - 60px)`,
        ml: isSidebarOpen ? `240px` : `60px`,
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
        transition: "width 0.3s ease",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          onClick={toggleSidebar}
          sx={{ marginRight: 2 }}
        >
          {/* <Iconify icon={"bx:menu"} /> */}
        </IconButton>
        <Box sx={{ flexBasis: "300px" }}>
          <GlobalSearch />
        </Box>

        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 2 }}>
          <Iconify
            icon={"solar:bell-off-bold-duotone"}
            className="primary-text-color"
            size={24}
          />
          <LanguageSelector />
          <UserProfile />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
