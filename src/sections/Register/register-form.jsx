import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/thunks/authThunk";
import { showSuccess } from "../../utils/toastUtil";
import { validateEmail, validateRequired } from "../../utils/validationUtil";
import { users } from "../../../mock/db.json";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        error = !validateRequired(value)
          ? "This field is required."
          : !validateEmail(value)
          ? "Invalid email address."
          : "";
        break;
      case "username":
      case "password":
        error = !validateRequired(value) ? "This field is required." : "";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email already exists
    const emailExists = users.some((user) => user.email === formData.email);
    if (emailExists) {
      setErrors((prev) => ({
        ...prev,
        email: "This email is already registered",
      }));
      return;
    }

    if (!acceptTerms) {
      return;
    }

    dispatch(registerUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/auth/login");
        showSuccess("User Registered successfully!");
      }
    });
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
            Create an Account
          </Typography>
          <Typography
            variant="body1"
            className="fs-16 primary-text-color"
            align="center"
            sx={{ mb: 3 }}
          >
            Create a account to continue
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

            <Box sx={{ mb: 2 }}>
              <Typography className="fs-16 primary-text-color" sx={{ mb: 1 }}>
                Username:
              </Typography>
              <TextField
                fullWidth
                name="username"
                placeholder="Enter your username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                error={Boolean(errors.username)}
                helperText={errors.username}
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

            <Box sx={{ mb: 2 }}>
              <Typography className="fs-16 primary-text-color" sx={{ mb: 1 }}>
                Password:
              </Typography>
              <TextField
                fullWidth
                name="password"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
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

            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="primary-text-color fs-16"
                />
              }
              label={
                <Typography className="fs-16 primary-text-color">
                  I accept terms and conditions
                </Typography>
              }
              sx={{ mb: 2 }}
            />

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
              disabled={
                !formData.email ||
                !formData.username ||
                !formData.password ||
                !acceptTerms ||
                Boolean(errors.email) ||
                Boolean(errors.username) ||
                Boolean(errors.password)
              }
            >
              Sign Up
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Typography
                color="text.secondary"
                sx={{ fontSize: 18 }}
                display="inline"
              >
                Already have an account?{" "}
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

export default RegisterForm;
