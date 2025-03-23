import { Box } from "@mui/material";
import DashboardChart from "../dashboard-chart";
import DashboardCards from "../dashboard-cards";
import DashboardTable from "../dashboard-table";

const DashboardView = () => {
  // Static data for cards
  const cardData = {
    totalUsers: {
      count: 40689,
      change: 8.5,
      trend: "up",
      period: "yesterday",
    },
    totalOrders: {
      count: 10293,
      change: 1.3,
      trend: "up",
      period: "past week",
    },
    totalSales: {
      count: 89000,
      change: 4.3,
      trend: "down",
      period: "yesterday",
    },
    totalPending: {
      count: 2040,
      change: 1.8,
      trend: "up",
      period: "yesterday",
    },
  };

  // Static data for chart
  const chartData = {
    labels: [
      "1st",
      "5th",
      "10th",
      "15th",
      "20th",
      "25th",
      "30th",
      "35th",
      "40th",
      "45th",
      "50th",
      "1st",
      "5th",
      "10th",
      "15th",
      "20th",
      "25th",
      "30th",
      "35th",
      "40th",
      "45th",
      "50th",
      "1st",
      "5th",
      "10th",
      "15th",
      "20th",
      "25th",
      "30th",
      "35th",
      "40th",
      "45th",
      "50th",
    ],
    data: [
      20, 35, 45, 30, 40, 80, 45, 35, 45, 55, 40, 20, 35, 45, 30, 40, 80, 45,
      35, 45, 55, 40, 20, 35, 45, 30, 40, 80, 45, 35, 45, 55, 40,
    ],
  };

  // Static data for table
  const tableData = [
    {
      id: 1,
      productName: "Apple Watch",
      location: "6096 Mosciski Landing",
      dateTime: "12.09.2019 - 12:53 PM",
      price: 423,
      amount: 534.395,
      status: "Delivered",
    },
    // Add more rows as needed
  ];

  return (
    <Box sx={{ p: 3 }}>
      <DashboardCards data={cardData} />
      <Box sx={{ mt: 4 }}>
        <DashboardChart data={chartData.data} labels={chartData.labels} />
      </Box>
      <Box sx={{ mt: 4 }}>
        <DashboardTable data={tableData} />
      </Box>
    </Box>
  );
};

export default DashboardView;
