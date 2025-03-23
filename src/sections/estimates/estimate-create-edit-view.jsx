/* eslint-disable */

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid2,
  Paper,
  TextField,
  Typography,
  useTheme,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "../../utils/helpersUtil";
import EstimatesItemRow from "./estimates-item-row";
import {
  createEstimation,
  updateEstimation,
} from "../../redux/thunks/estimationThunk";
import { showSuccess, showError } from "../../utils/toastUtil";
import { Iconify } from "../../components/iconify/iconify";
import HeadingText from "../../components/Heading";

const EstimatesCreateEditView = ({ current }) => {
  console.log(current, "current");

  const [selectedProject, setSelectedProject] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [version, setVersion] = useState("");
  const [clientName, setClientName] = useState("");
  const [status, setStatus] = useState("draft");

  const initialItem = {
    title: "",
    description: "",
    unit: "",
    quantity: 0,
    price: 0,
    margin: 0,
  };

  const initialSection = {
    title: "New Section",
    isEditing: false,
    items: [initialItem],
  };

  const [sections, setSections] = useState([initialSection]);
  const [totals, setTotals] = useState({
    subTotal: 0,
    totalMargin: 0,
    totalAmount: 0,
  });

  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (current) {
      setSections(current.sections || [initialSection]);
      setClientName(current.clientName);
      setProjectTitle(current.projectName);
      setVersion(current.version);
      setStatus(current.status);
      setSelectedProject(current.projectId);
    }
  }, [current]);

  useEffect(() => {
    const newTotals = sections.reduce(
      (acc, section) => {
        const sectionTotals = calculateTotals(section.items);
        acc.subTotal += parseFloat(sectionTotals.subTotal);
        acc.totalMargin += parseFloat(sectionTotals.totalMargin);
        acc.totalAmount += parseFloat(sectionTotals.totalAmount);
        return acc;
      },
      { subTotal: 0, totalMargin: 0, totalAmount: 0 }
    );
    setTotals(newTotals);
  }, [sections]);
  const handleSectionAdd = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index + 1, 0, { ...initialSection }); // Add new section after the current one
    setSections(updatedSections);
  };

  const handleItemAdd = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items.push({ ...initialItem });
    setSections(updatedSections);
  };

  const handleItemRemove = (sectionIndex, itemIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items.splice(itemIndex, 1);
    setSections(updatedSections);
  };

  const handleChange = (sectionIndex, itemIndex, field, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items[itemIndex][field] = value;
    setSections(updatedSections);
  };

  const handleChangeSubmit = async (e) => {
    debugger;
    e.preventDefault();
    const totalEstimate = sections.reduce((acc, section) => {
      const sectionTotals = calculateTotals(section.items);
      return acc + parseFloat(sectionTotals.totalAmount);
    }, 0);
    const editData = {
      sections,
      userId: user.id,
      clinetname: clientName,
      total: totalEstimate,
    };
    const response = await dispatch(
      updateEstimation({
        id: current.id,
        sections: editData,
      })
    ).then(() => {
      navigate("/estimates");
      showSuccess("estimate Edit successful!");
    });
  };

  const validateForm = () => {
    if (!selectedProject || !version || !clientName || !status) return false;

    return sections.every((section) =>
      section.items.every(
        (item) =>
          item.title &&
          item.description &&
          item.quantity > 0 &&
          item.price >= 0 &&
          item.margin >= 0
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      showError("Please fill in all required fields correctly");
      return;
    }
    debugger;
    // Calculate the total estimate based on sections and items
    const totalEstimate = sections.reduce((acc, section) => {
      const sectionTotals = calculateTotals(section.items);
      return acc + parseFloat(sectionTotals.totalAmount);
    }, 0);

    const formData = {
      sections,
      userId: user.id,
      projectId: selectedProject,
      projectTitle,
      version,
      clientName,
      status,
      total: totalEstimate,
    };
    debugger;
    try {
      let response;
      if (current) {
        // If 'current' exists, we're updating an existing estimate (Edit)
        response = await dispatch(
          updateEstimation({
            id: current.id,
            formData,
          })
        );
        showSuccess("Estimate updated successfully!");
      } else {
        // If 'current' is not present, we're creating a new estimate
        response = await dispatch(createEstimation(formData));
        showSuccess("Estimate created successfully!");
      }

      // Navigate to the estimates list after successful submission
      navigate("/estimates");
    } catch (error) {
      showError("Something went wrong, please try again.");
    }
  };

  const handleProjectChange = (event) => {
    const projectId = event.target.value;
    const selectedProj = projects.find((p) => p.id === projectId);
    console.log(selectedProj);
    if (selectedProj) {
      setSelectedProject(selectedProj);
      setProjectTitle(selectedProj.title);
      setClientName(selectedProj.clientName);
    }
  };

  const handleSectionTitleEdit = (sectionIndex, newTitle) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].title = newTitle;
    setSections(updatedSections);
  };

  const handleSectionTitleToggle = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].isEditing =
      !updatedSections[sectionIndex].isEditing;
    setSections(updatedSections);
  };

  const calculateTotals = (items) => {
    if (!items || !items.length) {
      return {
        subTotal: 0,
        totalMargin: 0,
        totalAmount: 0,
      };
    }

    return items.reduce(
      (acc, item) => {
        const quantity = Number(item.quantity) || 0;
        const price = Number(item.price) || 0;
        const margin = Number(item.margin) || 0;

        const itemSubTotal = quantity * price;
        const itemMargin = (itemSubTotal * margin) / 100;
        const itemTotal = itemSubTotal + itemMargin;

        return {
          subTotal: (acc.subTotal || 0) + itemSubTotal,
          totalMargin: (acc.totalMargin || 0) + itemMargin,
          totalAmount: (acc.totalAmount || 0) + itemTotal,
        };
      },
      {
        subTotal: 0,
        totalMargin: 0,
        totalAmount: 0,
      }
    );
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#FAFAFA", minHeight: "100vh" }}>
      <HeadingText title="Add New Estimates" />

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} md={6}>
            <TextField
              select
              sx={{ width: "150px" }}
              size="small"
              label="Select Project"
              value={selectedProject.projectName}
              onChange={handleProjectChange}
              variant="outlined"
            >
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.projectName}
                </MenuItem>
              ))}
            </TextField>
          </Grid2>
          <Grid2 item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Project staff"
              value={selectedProject.staff}
              variant="outlined"
              InputLabelProps={{ shrink: !!selectedProject.staff }}
            />
          </Grid2>
          <Grid2 item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              variant="outlined"
            />
          </Grid2>
          <Grid2 item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Client Name"
              value={selectedProject.customerName}
              onChange={(e) => setClientName(e.target.value)}
              variant="outlined"
              InputLabelProps={{ shrink: !!selectedProject.staff }}
            />
          </Grid2>
          <Grid2 item xs={12} md={4}>
            <TextField
              select
              fullWidth
              size="small"
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              variant="outlined"
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
            </TextField>
          </Grid2>
        </Grid2>
      </Paper>

      <Box sx={{ width: "100%" }}>
        {/* Header Row */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "200px 300px 100px 100px 100px 100px 100px",
            gap: 2,
            mb: 3,
            color: "#666",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          <Typography className="fw-bold">ITEM</Typography>
          <Typography className="fw-bold">DESCRIPTION</Typography>
          <Typography className="fw-bold">UNIT</Typography>
          <Typography className="fw-bold">QUANTITY</Typography>
          <Typography className="fw-bold">PRICE ($)</Typography>
          <Typography className="fw-bold">MARGIN (%)</Typography>
          <Typography className="fw-bold" align="right">
            TOTAL
          </Typography>
        </Box>

        {/* Sections */}
        {sections.map((section, sectionIndex) => (
          <>
            <Button onClick={() => handleSectionAdd(sectionIndex)}>
              Add New Section
            </Button>
            <Paper
              key={sectionIndex}
              sx={{
                mb: 3,
                borderRadius: 1,
                bgcolor: "white",
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
                border: "1px solid #E5E7EB",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 2,
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                {section.isEditing ? (
                  <TextField
                    size="small"
                    value={section.title}
                    onChange={(e) =>
                      handleSectionTitleEdit(sectionIndex, e.target.value)
                    }
                    onBlur={() => handleSectionTitleToggle(sectionIndex)}
                    autoFocus
                  />
                ) : (
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#374151",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSectionTitleToggle(sectionIndex)}
                  >
                    {section.title}
                  </Typography>
                )}
                <Typography sx={{ fontSize: "14px", color: "#374151" }}>
                  ${" "}
                  {(calculateTotals(section.items).totalAmount || 0).toFixed(2)}
                </Typography>
              </Box>

              {section.items.map((item, itemIndex) => (
                <Box sx={{ p: 2, borderBottom: "1px solid #E5E7EB" }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "200px 300px 100px 100px 100px 100px 100px 40px",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      size="small"
                      placeholder="Title *"
                      value={item.title}
                      onChange={(e) =>
                        handleChange(
                          sectionIndex,
                          itemIndex,
                          "title",
                          e.target.value
                        )
                      }
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                    <TextField
                      size="small"
                      placeholder="Description *"
                      value={item.description}
                      onChange={(e) =>
                        handleChange(
                          sectionIndex,
                          itemIndex,
                          "description",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      size="small"
                      placeholder="Unit *"
                      value={item.unit}
                      onChange={(e) =>
                        handleChange(
                          sectionIndex,
                          itemIndex,
                          "unit",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      size="small"
                      type="number"
                      placeholder="0"
                      value={item.quantity}
                      onChange={(e) =>
                        handleChange(
                          sectionIndex,
                          itemIndex,
                          "quantity",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      size="small"
                      type="number"
                      placeholder="0"
                      value={item.price}
                      onChange={(e) =>
                        handleChange(
                          sectionIndex,
                          itemIndex,
                          "price",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      size="small"
                      type="number"
                      placeholder="0"
                      value={item.margin}
                      onChange={(e) =>
                        handleChange(
                          sectionIndex,
                          itemIndex,
                          "margin",
                          e.target.value
                        )
                      }
                    />
                    <Typography align="right">
                      {(
                        item.quantity *
                        item.price *
                        (1 + item.margin / 100)
                      ).toFixed(2)}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleItemRemove(sectionIndex, itemIndex)}
                      sx={{ color: "#DC2626" }}
                    >
                      <Iconify icon="mdi:minus" />
                    </IconButton>
                  </Box>
                </Box>
              ))}

              <Box sx={{ p: 2 }}>
                <Button
                  startIcon={<Iconify icon="mdi:plus" width={16} />}
                  onClick={() => handleItemAdd(sectionIndex)}
                  sx={{
                    color: "#6B7280",
                    fontSize: "14px",
                    "&:hover": { bgcolor: "transparent" },
                  }}
                >
                  ADD ITEM
                </Button>
              </Box>
            </Paper>
          </>
        ))}

        {/* Totals Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 1,
            pr: 6,
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gap: "24px",
              fontSize: "14px",
            }}
          >
            <Typography color="#666">Sub Total:</Typography>
            <Typography>$ {totals.subTotal.toFixed(2)}</Typography>

            <Typography color="#666">Total Margin:</Typography>
            <Typography>$ {totals.totalMargin.toFixed(2)}</Typography>

            <Typography sx={{ fontWeight: 600, color: "#1A1A1A" }}>
              Total Amount:
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>
              $ {totals.totalAmount.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/estimates")}
            sx={{
              px: 3,
              py: 1,
              color: "#666",
              borderColor: "#E5E7EB",
              "&:hover": {
                borderColor: "#D1D5DB",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={(e) => {
              current ? handleSubmit(e) : handleSubmit(e);
            }}
            sx={{
              px: 3,
              py: 1,
              bgcolor: "#2563EB",
              "&:hover": {
                bgcolor: "#1D4ED8",
              },
            }}
          >
            {current ? "Save Chnage" : "SUBMIT"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EstimatesCreateEditView;
