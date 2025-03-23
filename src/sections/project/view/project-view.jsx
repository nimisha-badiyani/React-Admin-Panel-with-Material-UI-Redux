/* eslint-disable */

import React, { useEffect, useState } from "react";
import ProjectFilter from "../projectFilter";
import ProjectTableRow from "../projectTableRow";
import ProjectTableHeader from "../projectTableHeader";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Button,
  Box,
  useTheme,
  Typography,
  Card,
  TablePagination,
} from "@mui/material";
import { applyFilters } from "../../../utils/filterUtil";
import { Iconify } from "../../../components/iconify/iconify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  fetchProjects,
} from "../../../redux/thunks/projectThunk";
import { showSuccess } from "../../../utils/toastUtil";
import { EmptyState } from "../../../components/EmptyData/emptyData";
import StatCard from "./StatCard";
import HeadingText from "../../../components/Heading";
import ProjectTable from "./ProjectTable";

const ProjectsView = () => {
  const columns = [
    "customerName",
    "refNumber",
    "projectName",
    "projectNumber",
    "areaLocation",
    "address",
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filters, setFilters] = useState({
    date: "",
    status: "all",
    columns: [...columns],
    search: "",
    priority: "all",
  });

  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme(); // Access MUI theme

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      date: "",
      status: "all",
      columns: [...columns],
      search: "",
      priority: "all",
    });
  };

  const filteredData = applyFilters(projects, filters);
  console.log(filteredData, "filteredData");

  const handleEditClick = (id) => {
    navigate(`/projects/${id}`);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteProject(id)).then(() => {
      showSuccess("Project Delete successful!");
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchProjects(user.id));
    }
  }, [user, dispatch]);

  return (
    <div>
      <Box sx={{ mb: 3 }}>
        <HeadingText title="Projects" />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <ProjectFilter
          filters={filters}
          handleFilterChange={handleFilterChange}
          resetFilters={resetFilters}
          columns={columns}
          setFilters={setFilters}
        />

        <Button
          onClick={() => navigate("/projects/create")}
          variant={"contained"}
          startIcon={<Iconify icon={"ic:sharp-plus"} />}
        >
          Add Project
        </Button>
      </Box>

      {filteredData.length === 0 ? (
        <EmptyState height={"66vh"} />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
            mt: "20px",
            borderRadius: "8px",
            overflow: "hidden",
            "& .MuiTable-root": {
              borderCollapse: "separate",
              borderSpacing: 0,
            },
          }}
        >
          <Table>
            <TableHead>
              <ProjectTableHeader columns={filters.columns} />
            </TableHead>
            <TableBody>
              {paginatedData.map((row, index) => (
                <ProjectTableRow
                  key={index}
                  row={row}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                  columns={filters.columns}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ProjectsView;
