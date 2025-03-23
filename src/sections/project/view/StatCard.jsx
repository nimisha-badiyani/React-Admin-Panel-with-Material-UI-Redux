/* eslint-disable */

import React from "react";
import { Card, Box, Typography } from "@mui/material";
import { Iconify } from "../../../components/iconify/iconify";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <Card sx={{ minWidth: 200, p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 1,
            bgcolor: `${color}.lighter`,
            color: `${color}.main`,
          }}
        >
          <Iconify icon={icon} width={24} height={24} />
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default StatCard;
