import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Sample data structure
const sampleData = [
  {
    customer: "Olivia Martin",
    refNumber: "SBPQRS678TLUVX",
    projectReference: {
      projectName: "Sarah Williams",
      projectNumber: "PQRST01L20",
    },
    projectLocation: {
      areaLocation: "Telangana",
      address: "Mumbai, Maharashtra",
    },
  },
  {
    customer: "Michael Jones",
    refNumber: "67PLMN234RPQT98",
    projectReference: {
      projectName: "Robert Johnson",
      projectNumber: "ABCDE123F",
    },
    projectLocation: {
      areaLocation: "Uttar Pradesh",
      address: "Bhiwani, Haryana",
    },
  },
  // Add more data as needed
];

const ProjectTable = () => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: "100%", margin: "20px" }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                borderRight: "1px solid rgba(224, 224, 224, 1)",
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
              }}
            >
              CUSTOMER
            </TableCell>
            <TableCell
              sx={{
                borderRight: "1px solid rgba(224, 224, 224, 1)",
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
              }}
            >
              REF NUMBER
            </TableCell>
            <TableCell
              colSpan={2}
              align="center"
              sx={{
                borderRight: "1px solid rgba(224, 224, 224, 1)",
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
              }}
            >
              PROJECT REFERENCE
            </TableCell>
            <TableCell
              colSpan={2}
              align="center"
              sx={{
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
              }}
            >
              PROJECT LOCATION
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{
                borderRight: "1px solid rgba(224, 224, 224, 1)",
                visibility: "hidden",
              }}
            />
            <TableCell
              sx={{
                borderRight: "1px solid rgba(224, 224, 224, 1)",
                visibility: "hidden",
              }}
            />
            <TableCell
              sx={{
                borderRight: "1px solid rgba(224, 224, 224, 1)",
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
              }}
            >
              PROJECT NAME
            </TableCell>
            <TableCell
              sx={{
                borderRight: "1px solid rgba(224, 224, 224, 1)",
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
              }}
            >
              PROJECT NUMBER
            </TableCell>
            <TableCell
              sx={{
                borderRight: "1px solid rgba(224, 224, 224, 1)",
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
              }}
            >
              AREA LOCATION
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
              }}
            >
              ADDRESS
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleData.map((row, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
              >
                {row.customer}
              </TableCell>
              <TableCell
                sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
              >
                {row.refNumber}
              </TableCell>
              <TableCell
                sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
              >
                {row.projectReference.projectName}
              </TableCell>
              <TableCell
                sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
              >
                {row.projectReference.projectNumber}
              </TableCell>
              <TableCell
                sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
              >
                {row.projectLocation.areaLocation}
              </TableCell>
              <TableCell>{row.projectLocation.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
