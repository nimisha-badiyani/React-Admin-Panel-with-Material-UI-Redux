import { useState, useRef } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popper,
  Paper,
  ClickAwayListener,
  Box,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SideBarItems from "../../Sidebar/sidebarItems";
import { Iconify } from "../../../iconify/iconify";

const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  const filteredItems = SideBarItems.filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (path) => {
    navigate(path);
    setSearchTerm("");
    setOpen(false); // Close the dropdown after selection
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setOpen(e.target.value.length > 0);
  };

  const handleClickAway = () => {
    setOpen(false); // Close dropdown when clicking outside
  };

  return (
    <Box sx={{ position: "relative", width: "100%", maxWidth: "600px" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search pages..."
        value={searchTerm}
        onChange={handleSearchChange}
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={"material-symbols:search"} />
              {/* <SearchIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} /> */}
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#F5F6FA",
            borderColor: "#D5D5D5",
            borderRadius: "50px",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            },
            "&.Mui-focused": {
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            },
            "& fieldset": {
              borderColor: "rgba(0,0,0,0.12)",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: "12px 4px",
          },
        }}
        inputRef={anchorRef}
      />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        modifiers={[
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
            },
          },
        ]}
        sx={{
          zIndex: 1300,
          width: anchorRef.current?.offsetWidth || "100%",
          maxWidth: "600px",
        }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper
            elevation={3}
            sx={{
              mt: 1,
              borderRadius: "50px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <List sx={{ p: 1 }}>
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleItemClick(item.path)}
                    sx={{
                      borderRadius: "8px",
                      mb: 0.5,
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.04)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "40px" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: "0.95rem",
                        },
                      }}
                    />
                  </ListItem>
                ))
              ) : (
                <ListItem sx={{ py: 2 }}>
                  <ListItemText
                    primary="No results found"
                    sx={{
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default GlobalSearch;
