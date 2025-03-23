import { Box, Typography } from "@mui/material";

export const EmptyState = ({ message, height }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={height ? height : "76vh"}
    >
      <Typography variant="h6" color="textSecondary">
        {message || "No Data Available"}
      </Typography>
    </Box>
  );
};
