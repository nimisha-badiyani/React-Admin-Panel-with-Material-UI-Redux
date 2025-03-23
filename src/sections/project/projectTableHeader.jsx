import React from "react";
import { TableCell, TableRow } from "@mui/material";

const ProjectTableHeader = ({ columns }) => {
  // Check if the columns for PROJECT REFERENCE and PR
  // OJECT LOCATION exist
  console.log(columns);

  const hasProjectReference =
    columns.includes("projectName") && columns.includes("projectNumber");
  const hasProjectLocation =
    columns.includes("areaLocation") && columns.includes("address");

  return (
    <>
      {/* First row with main column groups */}
      <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
        {columns.slice(0, 2).map((column, index) => (
          <TableCell
            key={index}
            sx={{
              borderRight: "1px solid #e0e0e0",
              fontWeight: 600,
              padding: "8px 16px",
              fontSize: "12px",
              color: "#333",
              width: "15%",
              whiteSpace: "nowrap",
              borderBottom: "none",
            }}
            rowSpan={2} // Spans two rows
          >
            {column.replace(/([A-Z])/g, " $1").toUpperCase()}
          </TableCell>
        ))}

        {/* PROJECT REFERENCE Group - Only render if both sub-columns exist */}
        {hasProjectReference && (
          <TableCell
            colSpan={2} // Spans two columns
            align="center"
            sx={{
              borderRight: "1px solid #e0e0e0",
              fontWeight: 600,
              padding: "8px 16px",
              fontSize: "12px",
              color: "#333",
              width: "35%",
              borderBottom: "none",
            }}
          >
            PROJECT REFERENCE
          </TableCell>
        )}

        {/* PROJECT LOCATION Group - Only render if both sub-columns exist */}
        {hasProjectLocation && (
          <TableCell
            colSpan={2} // Spans two columns
            align="center"
            sx={{
              fontWeight: 600,
              padding: "8px 16px",
              fontSize: "12px",
              color: "#333",
              width: "35%",
              borderBottom: "none",
            }}
          >
            PROJECT LOCATION
          </TableCell>
        )}
      </TableRow>

      {/* Second row with sub-headers */}
      <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
        {columns.slice(2).map((column, index) => {
          // Conditionally render sub-header columns based on the group they belong to
          if (
            (column === "projectName" || column === "projectNumber") &&
            hasProjectReference
          ) {
            return (
              <TableCell
                key={index}
                sx={{
                  borderRight: "1px solid #e0e0e0",
                  fontWeight: 600,
                  padding: "8px 16px",
                  fontSize: "12px",
                  color: "#333",
                  whiteSpace: "nowrap",
                }}
              >
                {column.replace(/([A-Z])/g, " $1").toUpperCase()}
              </TableCell>
            );
          } else if (
            (column === "areaLocation" || column === "address") &&
            hasProjectLocation
          ) {
            return (
              <TableCell
                key={index}
                sx={{
                  borderRight: "1px solid #e0e0e0",
                  fontWeight: 600,
                  padding: "8px 16px",
                  fontSize: "12px",
                  color: "#333",
                  whiteSpace: "nowrap",
                }}
              >
                {column.replace(/([A-Z])/g, " $1").toUpperCase()}
              </TableCell>
            );
          } else if (
            column !== "projectName" &&
            column !== "projectNumber" &&
            column !== "areaLocation" &&
            column !== "address"
          ) {
            return (
              <TableCell
                key={index}
                sx={{
                  borderRight: "1px solid #e0e0e0",
                  fontWeight: 600,
                  padding: "8px 16px",
                  fontSize: "12px",
                  color: "#333",
                  whiteSpace: "nowrap",
                }}
              >
                {column.replace(/([A-Z])/g, " $1").toUpperCase()}
              </TableCell>
            );
          }
        })}
      </TableRow>
    </>
  );
};

export default ProjectTableHeader;
