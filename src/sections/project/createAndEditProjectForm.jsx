import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Box,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import {
  validateEmail,
  validateName,
  validateRequired,
  validateNumber,
} from "../../utils/validationUtil"; // Import helper functions
import { useDispatch, useSelector } from "react-redux";
import { createProject, updateProject } from "../../redux/thunks/projectThunk";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "../../utils/toastUtil";
import HeadingText from "../../components/Heading";

// Add these validation functions at the top with other imports
const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};

const validateProjectName = (name) => {
  // Allow letters, numbers, spaces, and common special characters
  const nameRegex = /^[a-zA-Z0-9\s\-_.,&()]{3,100}$/;
  return nameRegex.test(name);
};

const CreateAndEditProjectForm = ({ currunt }) => {
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme(); // Access MUI theme
  const [formData, setFormData] = useState({
    customerName: "",
    referenceNumber: "",
    projectName: "",
    projectNumber: "",
    areaLocation: "",
    address: "",
    dueDate: "",
    contact: "",
    manager: "",
    staff: "",
    status: "",
    email: "",
  });

  useEffect(() => {
    if (currunt) {
      setFormData({
        customerName: currunt.customerName || "",
        referenceNumber: currunt.referenceNumber || "",
        projectName: currunt.projectName || "",
        projectNumber: currunt.projectNumber || "",
        areaLocation: currunt.areaLocation || "",
        address: currunt.address || "",
        dueDate: currunt.dueDate || "",
        contact: currunt.contact || "",
        manager: currunt.manager || "",
        staff: currunt.staff || "",
        status: currunt.status || "",
        email: currunt.email || "",
      });
    }
  }, [currunt]);

  const [errors, setErrors] = useState({
    customerName: "",
    referenceNumber: "",
    projectName: "",
    projectNumber: "",
    areaLocation: "",
    address: "",
    dueDate: "",
    contact: "",
    manager: "",
    staff: "",
    status: "",
    email: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Handle input change and validate on change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update formData state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the field based on its name
    validateField(name, value);
  };

  // Validate a single field
  const validateField = (fieldName, value) => {
    let formErrors = { ...errors };

    switch (fieldName) {
      case "customerName":
        formErrors.customerName = validateName(value)
          ? ""
          : "Customer name should only contain letters and spaces (3-50 characters)";
        break;
      case "referenceNumber":
        formErrors.referenceNumber =
          value && !isNaN(value) && value.length >= 3
            ? ""
            : "Reference number must be at least 3 digits";
        break;
      case "projectName":
        formErrors.projectName = validateProjectName(value)
          ? ""
          : "Project name must be 3-100 characters and can contain letters, numbers, and basic special characters";
        break;
      case "projectNumber":
        formErrors.projectNumber =
          value && !isNaN(value) && value.length >= 3
            ? ""
            : "Project number must be at least 3 digits";
        break;
      case "areaLocation":
        formErrors.areaLocation =
          value.length >= 3
            ? ""
            : "Area location must be at least 3 characters";
        break;
      case "address":
        formErrors.address =
          value.length >= 5 ? "" : "Address must be at least 5 characters";
        break;
      case "dueDate":
        const selectedDate = new Date(value);
        const today = new Date();
        formErrors.dueDate =
          selectedDate >= today
            ? ""
            : "Due date must be today or a future date";
        break;
      case "contact":
        formErrors.contact = validatePhoneNumber(value)
          ? ""
          : "Contact must be exactly 10 digits";
        break;
      case "manager":
        formErrors.manager = validateName(value)
          ? ""
          : "Manager name should only contain letters and spaces";
        break;
      case "staff":
        formErrors.staff = validateName(value)
          ? ""
          : "Staff name should only contain letters and spaces";
        break;
      case "status":
        formErrors.status = ["active", "inactive"].includes(value)
          ? ""
          : "Please select a valid status";
        break;
      case "email":
        formErrors.email = validateEmail(value)
          ? ""
          : "Please enter a valid email address";
        break;
      default:
        break;
    }

    setErrors(formErrors);
  };

  const isFormValid = () => {
    return (
      Object.values(formData).every((field) => field !== "") &&
      Object.values(errors).every((err) => !err)
    );
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const fieldValue = formData[field];
      validateField(field, fieldValue);

      // If any field has an error, mark the form as invalid
      if (errors[field]) {
        isValid = false;
      }
    });
    if (isValid) {
      if (user) {
        const editProjectData = { ...formData, userId: user.id };
        dispatch(updateProject({ id, projectData: editProjectData })).then(
          () => {
            navigate("/projects");
            showSuccess("Project Edit successful!");
          }
        );
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the entire form on submit
    let formErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const fieldValue = formData[field];
      validateField(field, fieldValue);

      // If any field has an error, mark the form as invalid
      if (errors[field]) {
        isValid = false;
      }
    });

    // Check if form is valid
    if (isValid) {
      if (user) {
        const newProject = { ...formData, userId: user.id };
        dispatch(createProject(newProject)).then(() => {
          navigate("/projects");
          showSuccess("Project Create successful!");
        });
      }
    }
  };

  return (
    <>
      <HeadingText title={currunt ? "Edit Project" : "Add new project"} />

      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          padding: "70px 50px",
          borderRadius: "15px",
          marginTop: "10px",
        }}
      >
        <form>
          <Grid container spacing={3}>
            {/* Customer Name */}
            <Grid item xs={12} md={4}>
              {/* External Label */}
              <Typography
                variant="body2"
                className="fs-16 primary-text-color"
                sx={{ mb: 1 }}
              >
                Customer Name
              </Typography>
              <TextField
                fullWidth
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                error={!!errors.customerName}
                helperText={errors.customerName}
              />
            </Grid>

            {/* Reference Number */}
            <Grid item xs={12} md={4}>
              {/* External Label */}
              <Typography
                variant="body2"
                className="fs-16 primary-text-color"
                sx={{ mb: 1 }}
              >
                Reference Number
              </Typography>
              <TextField
                fullWidth
                name="referenceNumber"
                value={formData.referenceNumber}
                onChange={handleInputChange}
                error={!!errors.referenceNumber}
                helperText={errors.referenceNumber}
              />
            </Grid>

            {/* Project Name */}
            <Grid item xs={12} md={4}>
              {/* External Label */}
              <Typography
                variant="body2"
                className="fs-16 primary-text-color"
                sx={{ mb: 1 }}
              >
                Project Name
              </Typography>
              <TextField
                fullWidth
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                error={!!errors.projectName}
                helperText={errors.projectName}
              />
            </Grid>

            {/* Project Number */}
            <Grid item xs={12} md={4}>
              {/* External Label */}
              <Typography
                variant="body2"
                className="fs-16 primary-text-color"
                sx={{ mb: 1 }}
              >
                Project Number
              </Typography>
              <TextField
                fullWidth
                name="projectNumber"
                value={formData.projectNumber}
                onChange={handleInputChange}
                error={!!errors.projectNumber}
                helperText={errors.projectNumber}
              />
            </Grid>

            {/* Area Location */}
            <Grid item xs={12} md={4}>
              {/* External Label */}
              <Typography
                variant="body2"
                className="fs-16 primary-text-color"
                sx={{ mb: 1 }}
              >
                Area Location
              </Typography>
              <TextField
                fullWidth
                name="areaLocation"
                value={formData.areaLocation}
                onChange={handleInputChange}
                error={!!errors.areaLocation}
                helperText={errors.areaLocation}
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12} md={4}>
              {/* External Label */}
              <Typography
                variant="body2"
                className="fs-16 primary-text-color"
                sx={{ mb: 1 }}
              >
                Address
              </Typography>
              <TextField
                fullWidth
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>

            {/* Due Date */}
            <Grid item xs={12} md={4}>
              {/* External Label */}
              <Typography
                variant="body2"
                className="fs-16 primary-text-color"
                sx={{ mb: 1 }}
              >
                Due Date
              </Typography>
              <TextField
                fullWidth
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                error={!!errors.dueDate}
                helperText={errors.dueDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Contact */}
            <Grid item xs={12} md={4}>
              {/* External Label */}
              <Typography
                variant="body2"
                className="fs-16 primary-text-color"
                sx={{ mb: 1 }}
              >
                Contact
              </Typography>
              <TextField
                fullWidth
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                error={!!errors.contact}
                helperText={errors.contact}
              />
            </Grid>

            {/* Manager */}
            <Grid item xs={12} md={4}>
              {/* External Label */}
              <Typography
                variant="body2"
                className="fs-16 primary-text-color"
                sx={{ mb: 1 }}
              >
                Manager
              </Typography>
              <TextField
                fullWidth
                name="manager"
                value={formData.manager}
                onChange={handleInputChange}
                error={!!errors.manager}
                helperText={errors.manager}
              />
            </Grid>

            {/* Staff */}
            <Grid item xs={12} md={4}>
              {/* External Label */}
              <Typography
                variant="body2"
                className="fs-16 primary-text-color"
                sx={{ mb: 1 }}
              >
                Staff
              </Typography>
              <TextField
                fullWidth
                name="staff"
                value={formData.staff}
                onChange={handleInputChange}
                error={!!errors.staff}
                helperText={errors.staff}
              />
            </Grid>

            {/* Status */}
            <Grid item xs={12} md={4}>
              {/* External Label */}
              <Typography
                variant="body2"
                className="fs-16 primary-text-color"
                sx={{ mb: 1 }}
              >
                Status
              </Typography>
              <FormControl fullWidth error={!!errors.status}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={handleInputChange}
                  name="status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
                <FormHelperText>{errors.status}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Email */}
            <Grid item xs={12} md={4}>
              {/* External Label */}
              <Typography
                variant="body2"
                className="fs-16 primary-text-color"
                sx={{ mb: 1 }}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12} md={12}>
              <Button
                type="submit"
                variant="contained"
                className="primary-bg-color color-white"
                sx={{ marginRight: 2 }}
                disabled={!isFormValid()}
                onClick={(e) => {
                  currunt ? handleEditSubmit(e, currunt.id) : handleSubmit(e);
                }}
              >
                {!currunt ? "Add Project" : "Update Now"}
              </Button>
              <Button
                variant="outlined"
                onClick={(e) => {
                  e.preventDefault();
                  setFormData({});
                  navigate("/projects");
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default CreateAndEditProjectForm;
