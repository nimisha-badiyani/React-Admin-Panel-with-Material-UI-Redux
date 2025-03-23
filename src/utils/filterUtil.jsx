// Filter helpers

// Filter by date
export function filterByDate(data, date) {
  return data.filter(row => row.dueDate === date);
}

// Filter by status
export function filterByStatus(data, status) {
  // If status is 'all', return the data without filtering by status
  if (status === 'all') {
    return data;
  }
  return data.filter(row => row.status === status);
}

export function handleColumnSelect(event, setFilters, columns) {
  const selectedColumns = event.target.value;

  // Filter selected columns in the order they appear in the original columns array
  const orderedColumns = columns.filter(column => selectedColumns.includes(column));

  setFilters((prevFilters) => ({
    ...prevFilters,
    columns: orderedColumns, // Update columns to preserve their original order
  }));
}

// Apply filters
export function applyFilters(data, filters) {
  let filteredData = [...data];

  // Apply date filter if set
  if (filters.date) {
    filteredData = filterByDate(filteredData, filters.date);
  }

  // Apply status filter, or show all if 'status' is 'all'
  if (filters.status && filters.status !== 'all') {
    filteredData = filterByStatus(filteredData, filters.status);
  }

  return filteredData;
}
