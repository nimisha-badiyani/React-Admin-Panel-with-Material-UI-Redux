import { Box, Avatar, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "";
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Tooltip title={user?.name}>
        <Avatar
          sx={{
            marginRight: "10px",
            backgroundColor: "#4880FF",
          }}
        >
          {userInitial}
        </Avatar>
      </Tooltip>
      {/* <Typography>{user?.name}</Typography> */}
    </Box>
  );
};

export default UserProfile;
