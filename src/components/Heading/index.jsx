import { Typography } from "@mui/material";

const HeadingText = ({ title }) => {
  return (
    <Typography className="fs-32" sx={{ mb: 2, fontWeight: "bold" }}>
      {title}
    </Typography>
  );
};

export default HeadingText;
