/* eslint-disable  */

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";

const DashboardTable = ({ data }) => {
  return (
    <Card sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Table</Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Date - Time</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      component="img"
                      src={row.image}
                      sx={{ width: 40, height: 40, borderRadius: 1, mr: 2 }}
                    />
                    {row.productName}
                  </Box>
                </TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.dateTime}</TableCell>
                <TableCell>${row.price}</TableCell>
                <TableCell>${row.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.status === "Delivered" ? "success" : "warning"}
                    sx={{ borderRadius: 1 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DashboardTable;
