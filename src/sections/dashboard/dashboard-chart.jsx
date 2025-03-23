/* eslint-disable  */

import { Box, Typography, useTheme, Card } from "@mui/material";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const DashboardChart = ({ data, labels }) => {
  const theme = useTheme();

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: data,
        fill: true,
        borderColor: "#4E5BA6",
        borderWidth: 2,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(78, 91, 166, 0.2)");
          gradient.addColorStop(1, "rgba(78, 91, 166, 0)");
          return gradient;
        },
        tension: 0.4,
        pointRadius: 0, // Hide points by default
        pointHoverRadius: 6,
        pointBackgroundColor: "#4E5BA6",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: "#4E5BA6",
        pointHoverBorderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: "#fff",
        titleColor: "#666",
        titleFont: {
          size: 12,
          weight: "normal",
        },
        bodyColor: "#333",
        bodyFont: {
          size: 14,
          weight: "bold",
        },
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y.toFixed(2)}k`;
          },
          title: function (context) {
            return `Day ${context[0].label}`;
          },
        },
        yAlign: "bottom",
        xAlign: "center",
        caretSize: 8,
        caretPadding: 10,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "#999",
          font: {
            size: 12,
          },
          padding: 10,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
          lineWidth: 1,
        },
        ticks: {
          color: "#999",
          font: {
            size: 12,
          },
          padding: 10,
          callback: function (value) {
            return value + "%";
          },
        },
        border: {
          display: false,
        },
        min: 0,
        max: 100,
        stepSize: 20,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    maintainAspectRatio: false,
    hover: {
      mode: "index",
      intersect: false,
    },
    onHover: (event, elements) => {
      if (elements && elements.length) {
        const pointElements = event.chart.getElementsAtEventForMode(
          event,
          "index",
          { intersect: false },
          false
        );
        if (pointElements.length) {
          const pointElement = pointElements[0];
          pointElement.element.options.radius = 6; // Show point on hover
        }
      }
    },
  };

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Sales Details
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              cursor: "pointer",
            }}
          >
            October
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: 400,
          ".chartjs-tooltip": {
            opacity: 1,
            pointerEvents: "none",
            position: "absolute",
            transition: "all .1s ease",
          },
        }}
      >
        <Line data={chartData} options={options} />
      </Box>
    </Card>
  );
};

export default DashboardChart;
