/* eslint-disable */

import React from "react";
import { ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Iconify } from "../../iconify/iconify";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/thunks/authThunk";
import { showSuccess } from "../../../utils/toastUtil";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    showSuccess("Logout successful!");
    navigate("/auth/login");
  };

  return (
    <Box sx={{ mb: 1 }}>
      <ListItem
        button
        onClick={handleLogout}
        sx={{
          borderRadius: "12px",
          position: "relative",
          cursor: "pointer",
          color: "var(--primary-text-color)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: "32px",
            color: "inherit",
          }}
        >
          <Iconify icon={"material-symbols:logout-sharp"} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Box>
  );
};

export default LogoutButton;
