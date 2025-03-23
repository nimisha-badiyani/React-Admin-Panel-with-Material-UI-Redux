import { Grid2, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Iconify } from "../../components/iconify/iconify";

const EstimatesItemRow = ({
  item,
  sectionIndex,
  itemIndex,
  handleChange,
  handleItemRemove,
}) => {
  const [errors, setErrors] = useState({});

  const itemTotal = item.quantity * item.price * (1 + item.margin / 100);

  const validateField = (name, value) => {
    if (!value && value !== 0) {
      return "This field is required";
    }
    if ((name === "quantity" || name === "price") && value < 0) {
      return "Value must be positive";
    }
    if (name === "margin" && (value < 0 || value > 100)) {
      return "Margin must be between 0 and 100";
    }
    return "";
  };

  const handleFieldChange = (field, value) => {
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
    handleChange(sectionIndex, itemIndex, field, value);
  };

  return (
    <Grid2 container spacing={2} alignItems="center" sx={{ marginTop: "16px" }}>
      <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
        <TextField
          label="Title"
          value={item.title}
          onChange={(e) => handleFieldChange("title", e.target.value)}
          fullWidth
          error={!!errors.title}
          helperText={errors.title}
          required
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
        <TextField
          label="Description"
          value={item.description}
          onChange={(e) => handleFieldChange("description", e.target.value)}
          fullWidth
          error={!!errors.description}
          helperText={errors.description}
          required
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 1 }}>
        <TextField
          label="Unit"
          value={item.unit}
          onChange={(e) => handleFieldChange("unit", e.target.value)}
          fullWidth
          error={!!errors.unit}
          helperText={errors.unit}
          required
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 1 }}>
        <TextField
          label="Quantity"
          type="number"
          value={item.quantity}
          onChange={(e) =>
            handleFieldChange("quantity", parseFloat(e.target.value) || 0)
          }
          sx={{
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
              {
                display: "none",
              },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
          }}
          fullWidth
          error={!!errors.quantity}
          helperText={errors.quantity}
          required
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
        <TextField
          label="Price"
          type="number"
          value={item.price}
          onChange={(e) =>
            handleFieldChange("price", parseFloat(e.target.value) || 0)
          }
          sx={{
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
              {
                display: "none",
              },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
          }}
          fullWidth
          error={!!errors.price}
          helperText={errors.price}
          required
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 1 }}>
        <TextField
          label="Margin %"
          type="number"
          value={item.margin}
          onChange={(e) =>
            handleFieldChange("margin", parseFloat(e.target.value) || 0)
          }
          sx={{
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
              {
                display: "none",
              },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
          }}
          fullWidth
          error={!!errors.margin}
          helperText={errors.margin}
          required
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
        <Typography variant="body1" align="right">
          {itemTotal.toFixed(2)}
        </Typography>
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 6, md: 3, lg: 1 }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <IconButton
          onClick={() => handleItemRemove(sectionIndex, itemIndex)}
          color="error"
        >
          <Iconify icon={"typcn:minus"} />
        </IconButton>
      </Grid2>
    </Grid2>
  );
};

export default EstimatesItemRow;
