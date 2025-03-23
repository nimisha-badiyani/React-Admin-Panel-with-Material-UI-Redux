/* eslint-disable */

import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  Box,
  IconButton,
  Tooltip,
  Stack,
  Chip,
  InputAdornment,
  Typography,
  Popover,
} from "@mui/material";
import { handleColumnSelect } from "../../utils/filterUtil";
import { Iconify } from "../../components/iconify/iconify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

const ProjectFilter = ({
  filters,
  handleFilterChange,
  resetFilters,
  columns,
  setFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDateClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDateClose = () => {
    setAnchorEl(null);
  };

  const openDatePicker = Boolean(anchorEl);

  const handleColumnSelectWrapper = (event) => {
    handleColumnSelect(event, setFilters, columns);
  };

  const activeFiltersCount = Object.entries(filters).reduce(
    (count, [key, value]) => {
      if (key === "columns") return count;
      if (value && value !== "all") return count + 1;
      return count;
    },
    0
  );

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Typography className="fs-16">Filter By</Typography>

        <TextField
          fullWidth
          type="date"
          name="Select Date"
          value={filters.date}
          onChange={(e) => handleFilterChange("date", e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* Status Dropdown */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status || "all"}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            label="Status"
          >
            <MenuItem value="all">
              <Iconify icon="mdi:filter-variant" sx={{ mr: 1 }} />
              All Status
            </MenuItem>
            <MenuItem value="active">
              <Iconify
                icon="mdi:check-circle"
                color="success.main"
                sx={{ mr: 1 }}
              />
              Active
            </MenuItem>
            <MenuItem value="pending">
              <Iconify icon="mdi:clock" color="warning.main" sx={{ mr: 1 }} />
              Pending
            </MenuItem>
            <MenuItem value="completed">
              <Iconify
                icon="mdi:flag-checkered"
                color="info.main"
                sx={{ mr: 1 }}
              />
              Completed
            </MenuItem>
            <MenuItem value="cancelled">
              <Iconify
                icon="mdi:close-circle"
                color="error.main"
                sx={{ mr: 1 }}
              />
              Cancelled
            </MenuItem>
          </Select>
        </FormControl>

        {/* Column Selection */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Visible Columns</InputLabel>
          <Select
            multiple
            value={filters.columns}
            onChange={handleColumnSelectWrapper}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.slice(0, 2).map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
                {selected.length > 2 && (
                  <Chip label={`+${selected.length - 2}`} size="small" />
                )}
              </Box>
            )}
            label="Visible Columns"
          >
            {columns.map((column) => (
              <MenuItem key={column} value={column}>
                <Checkbox checked={filters.columns.indexOf(column) > -1} />
                <ListItemText primary={column} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Reset Button with Counter */}
        <Tooltip title="Reset">
          <Typography
            variant="body2"
            color="error"
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
            onClick={resetFilters}
          >
            <Iconify icon="material-symbols:refresh" />
            Reset
          </Typography>
        </Tooltip>
      </Stack>
    </>
  );
};

export default ProjectFilter;
