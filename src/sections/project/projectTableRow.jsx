/* eslint-disable */

import React from "react";
import { TableCell, TableRow, IconButton } from "@mui/material";
import { Iconify } from "../../components/iconify/iconify";

const ProjectTableRow = ({
  row,
  columns,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <TableRow
      sx={{
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      {columns.map((column, index) => {
        if (column === "customerName") {
          return (
            <TableCell
              key={index}
              sx={{
                borderRight: "1px solid #e0e0e0",
                padding: "8px 16px",
                fontSize: "13px",
                color: "#555",
                whiteSpace: "nowrap",
                textDecoration: "underline",
                cursor: "pointer",
                borderBottom: "1px solid #e0e0e0",
              }}
              onClick={() => handleEditClick(row.id)}
            >
              {row.customerName}
            </TableCell>
          );
        }

        if (column === "refNumber" || column === "projectNumber") {
          return (
            <TableCell
              key={index}
              sx={{
                borderRight: "1px solid #e0e0e0",
                padding: "8px 16px",
                fontSize: "13px",
                color: "#555",
                cursor: "pointer",
                whiteSpace: "nowrap",
                textDecoration: "underline",
                fontFamily: "monospace",
              }}
              onClick={() => handleEditClick(row.id)}
            >
              {row[column] || row.projectNumber}
            </TableCell>
          );
        }

        if (column === "projectName") {
          return (
            <TableCell
              key={index}
              sx={{
                borderRight: "1px solid #e0e0e0",
                padding: "8px 16px",
                fontSize: "13px",
                color: "#555",
              }}
            >
              {row.projectName}
            </TableCell>
          );
        }

        if (column === "projectNumber") {
          return (
            <TableCell
              key={index}
              sx={{
                borderRight: "1px solid #e0e0e0",
                padding: "8px 16px",
                fontSize: "13px",
                color: "#555",
                fontFamily: "monospace",
              }}
            >
              {row.projectNumber}
            </TableCell>
          );
        }

        if (column === "areaLocation") {
          return (
            <TableCell
              key={index}
              sx={{
                borderRight: "1px solid #e0e0e0",
                padding: "8px 16px",
                fontSize: "13px",
                color: "#555",
              }}
            >
              {row.areaLocation}
            </TableCell>
          );
        }

        if (column === "address") {
          return (
            <TableCell
              key={index}
              sx={{
                padding: "8px 16px",
                fontSize: "13px",
                color: "#555",
              }}
            >
              {row.address}
            </TableCell>
          );
        }

        return null;
      })}
    </TableRow>
  );
};

export default ProjectTableRow;
