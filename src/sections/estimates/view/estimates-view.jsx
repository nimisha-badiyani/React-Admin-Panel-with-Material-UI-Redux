/* eslint-disable */

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  Chip,
  TablePagination,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEstimation,
  fetchEstimations,
} from "../../../redux/thunks/estimationThunk";
import { useNavigate } from "react-router-dom";
import { Iconify } from "../../../components/iconify/iconify";
import { showSuccess } from "../../../utils/toastUtil";
import { EmptyState } from "../../../components/EmptyData/emptyData";
import HeadingText from "../../../components/Heading";

const EstimatesView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { estimations, loading } = useSelector((state) => state.estimations);
  const { user } = useSelector((state) => state.auth);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(9);
  console.log(estimations, "estimations");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      active: "#4caf50",
      pending: "#ff9800",
      completed: "#2196f3",
      rejected: "#f44336",
    };
    return statusColors[status?.toLowerCase()] || "#757575";
  };

  const handelEdit = (e, id) => {
    e.preventDefault();
    navigate(`/estimates/${id}`);
  };

  const handelDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteEstimation(id)).then(() => {
      navigate("/estimates");
      showSuccess("Estimate Delete successful!");
    });
  };

  useEffect(() => {
    dispatch(fetchEstimations(user.id));
  }, [dispatch]);
  return (
    <div>
      <Box sx={{ padding: "24px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <HeadingText title="Estimates" />
          <Button
            variant="contained"
            className="fs-16 primary-bg-color"
            onClick={() => navigate("/estimates/create")}
            startIcon={<Iconify icon={"ic:sharp-plus"} />}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              padding: "8px 16px",
            }}
          >
            Add Estimate
          </Button>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "12px",
            boxShadow: theme.shadows[2],
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
                <TableCell className="fs-16 fw-bold">VERSION</TableCell>
                <TableCell className="fs-16 fw-bold">PROJECT</TableCell>
                <TableCell className="fs-16 fw-bold">CLIENT</TableCell>
                <TableCell className="fs-16 fw-bold">CREATED DATE</TableCell>
                <TableCell className="fs-16 fw-bold">LAST MODIFIED</TableCell>
                <TableCell className="fs-16 fw-bold">STATUS</TableCell>
                <TableCell className="fs-16 fw-bold" align="right">
                  ACTION
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {estimations?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <EmptyState message="No estimates found" />
                  </TableCell>
                </TableRow>
              ) : (
                estimations
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((estimate) => (
                    <TableRow
                      key={estimate.id}
                      sx={{
                        "&:hover": { backgroundColor: theme.palette.grey[50] },
                      }}
                    >
                      <TableCell className="fs-16">
                        {estimate.version || "V1.0"}
                      </TableCell>
                      <TableCell className="fs-16">
                        {estimate?.projectId?.projectName}
                      </TableCell>
                      <TableCell className="fs-16">
                        {estimate.clientName || "N/A"}
                      </TableCell>
                      <TableCell className="fs-16">
                        {new Date(estimate.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="fs-16">
                        {new Date(estimate.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={estimate.status || "Created"}
                          size="small"
                          className="fs-16"
                          sx={{
                            backgroundColor: getStatusColor(estimate.status),
                            color: "white",
                            textTransform: "capitalize",
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={(e) => handelDelete(e, estimate.id)}
                          className="fs-16"
                          sx={{
                            minWidth: "auto",
                            padding: "6px",
                            color: "red",
                          }}
                        >
                          <Iconify icon="ic:baseline-delete" />
                        </Button>
                        <Button
                          onClick={(e) => handelEdit(e, estimate.id)}
                          className="fs-16"
                          sx={{
                            minWidth: "auto",
                            padding: "6px",
                          }}
                        >
                          <Iconify icon="eva:edit-fill" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={estimations?.length || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[9, 25, 50]}
            className="fs-16"
          />
        </TableContainer>
      </Box>
    </div>
  );
};

export default EstimatesView;
