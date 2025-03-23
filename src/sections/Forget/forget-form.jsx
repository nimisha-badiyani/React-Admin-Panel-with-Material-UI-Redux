import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { validateEmail, validateRequired } from "../../utils/validationUtil";

const ForgetForm = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "email") {
      error = !validateRequired(value)
        ? "This field is required."
        : !validateEmail(value)
        ? "Invalid email address."
        : "";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your forget password logic here
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "url(/assets/images/login-background.png) no-repeat center center",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container component="main" sx={{ width: "600px" }}>
        <Paper
          elevation={3}
          sx={{
            padding: "60px 40px",
            borderRadius: "12px",
            backgroundColor: "white",
          }}
        >
          <Typography
            align="center"
            className="fs-32"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Forgot Password
          </Typography>
          <Typography
            variant="body1"
            className="fs-16 primary-text-color"
            align="center"
            sx={{ mb: 3 }}
          >
            Enter your email to reset password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Typography className="fs-16 primary-text-color" sx={{ mb: 1 }}>
                Email address:
              </Typography>
              <TextField
                fullWidth
                name="email"
                placeholder="example@email.com"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                sx={{
                  backgroundColor: "#f8f9fa",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#e0e0e0",
                    },
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              className="primary-bg-color color-white br-8 fs-16"
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                py: 1.5,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#4880FF",
                },
              }}
              disabled={!formData.email || Boolean(errors.email)}
            >
              Reset Password
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Typography
                color="text.secondary"
                sx={{ fontSize: 18 }}
                display="inline"
              >
                Remember your password?{" "}
              </Typography>
              <Typography
                component="a"
                onClick={() => navigate("/auth/login")}
                sx={{
                  color: "#4880FF",
                  textDecoration: "none",
                  fontSize: 18,
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Sign In
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgetForm;
