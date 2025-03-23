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
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/thunks/authThunk";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../utils/toastUtil";
import { validateEmail, validateRequired } from "../../utils/validationUtil";
import { users } from "../../../mock/db.json";
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [rememberPassword, setRememberPassword] = useState(false);

  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };
  console.log(users);

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

    const emailError = !validateRequired(formData.email)
      ? "This field is required."
      : !validateEmail(formData.email)
      ? "Invalid email address."
      : "";

    const passwordError = !validateRequired(formData.password)
      ? "This field is required."
      : "";

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    // Step 1: Find user by email
    const foundUser = users.find((user) => user.email === formData.email);

    if (!foundUser) {
      setErrors({ email: "Email does not exist." });
      return;
    }

    // Step 2: Check password
    if (foundUser.password !== formData.password) {
      setErrors({ password: "Incorrect password." });
      return;
    }

    // Step 3: If everything is correct, proceed
    dispatch(loginUser(formData))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/");
          showSuccess("User Login successful!");
        }
      })
      .catch((error) => {
        showError("Login failed. Please try again later.", error);
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
            Login to Account
          </Typography>
          <Typography
            variant="body1"
            className="fs-16 primary-text-color"
            align="center"
            sx={{ mb: 3 }}
          >
            Please enter your email and password to continue
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                className="fs-16 primary-text-color"
                sx={{ mb: 1 }}
              >
                Email address:
              </Typography>
              <TextField
                fullWidth
                name="email"
                placeholder="esteban_schiller@gmail.com"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
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

            <Box sx={{ mb: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  className="fs-16 primary-text-color"
                  variant="body2"
                >
                  Password
                </Typography>
                <Button
                  className="fs-16 primary-text-color"
                  onClick={() => navigate("/auth/forgot-password")}
                  sx={{
                    p: 0,
                    color: "#202224",
                    minWidth: "auto",
                    textTransform: "none",
                  }}
                >
                  Forgot Password?
                </Button>
              </Box>
              <TextField
                fullWidth
                name="password"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
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
                  checked={rememberPassword}
                  className="primary-text-color"
                  onChange={(e) => setRememberPassword(e.target.checked)}
                />
              }
              label="Remember Password"
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
                loading ||
                !formData.email ||
                !formData.password ||
                errors.email ||
                errors.password
              }
            >
              Sign In
            </Button>

            <Box sx={{ textAlign: "center" }}>
              <Typography
                color="text.secondary"
                sx={{ fontSize: 18 }}
                display="inline"
              >
                Don&apos;t have an account?{" "}
              </Typography>
              <Typography
                component="a"
                onClick={() => navigate("/auth/register")}
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
                Create Account
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginForm;
