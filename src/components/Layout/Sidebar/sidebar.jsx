/* eslint-disable */

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SideBarItems from "./sidebarItems";
import LogoutButton from "./logoutButton";

const Sidebar = () => {
  const DRAWER_WIDTH = 240;
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid #E5E7EB",
        },
        position: "absolute",
      }}
    >
      <Box sx={{ overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "64px",
            p: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Typography variant="h6">
            <span
              style={{ fontWeight: "bold", color: "var(--primary-text-color)" }}
            >
              LO
            </span>
            <span style={{ fontWeight: "bold", color: "var(--primary-color)" }}>
              GO
            </span>
          </Typography>
        </Box>
        <List sx={{ px: 2 }}>
          {SideBarItems.map((item, index) => {
            const isRoot = location.pathname === "/";
            const isActive =
              (location.pathname.startsWith(item.path) && item.path !== "/") ||
              (isRoot && item.path === "/");

            return (
              <Box key={index} sx={{ mb: 1 }}>
                <ListItem
                  button
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: "12px",
                    position: "relative",
                    backgroundColor: isActive
                      ? "var(--primary-color)"
                      : "transparent",
                    color: isActive ? "#FFFFFF" : "var(--primary-text-color)",
                    "&:before": isActive
                      ? {
                          content: '""',
                          position: "absolute",
                          left: "-16px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "8px",
                          height: "32px",
                          backgroundColor: "var(--primary-color)",
                          borderRadius: "0 4px 4px 0",
                        }
                      : {},
                    "&:hover": {
                      backgroundColor: isActive
                        ? "var(--primary-color)"
                        : "rgba(0, 0, 0, 0.04)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "32px",
                      color: isActive ? "#FFFFFF" : "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Box>
            );
          })}
        </List>
      </Box>

      <Box sx={{ marginTop: "auto", px: 2, pb: 2 }}>
        <LogoutButton />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
