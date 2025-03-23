/* eslint-disable  */

import React from "react";
import { Box, Card, Grid, Typography, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import HeadingText from "../../components/Heading";

const DashboardCards = ({ data }) => {
  const cards = [
    {
      title: "Total User",
      value: data.totalUsers.count,
      change: data.totalUsers.change,
      trend: data.totalUsers.trend,
      period: data.totalUsers.period,
      icon: "mdi:account-outline",
      color: "#E7E9FD",
      iconColor: "#4E5BA6",
    },
    {
      title: "Total Order",
      value: data.totalOrders.count,
      change: data.totalOrders.change,
      trend: data.totalOrders.trend,
      period: data.totalOrders.period,
      icon: "mdi:truck-delivery-outline",
      color: "#FFF4DE",
      iconColor: "#FFA94D",
    },
    {
      title: "Total Sales",
      value: data.totalSales.count,
      change: data.totalSales.change,
      trend: data.totalSales.trend,
      period: data.totalSales.period,
      icon: "mdi:currency-usd",
      color: "#DCFCE7",
      iconColor: "#22C55E",
    },
    {
      title: "Total Pending",
      value: data.totalPending.count,
      change: data.totalPending.change,
      trend: data.totalPending.trend,
      period: data.totalPending.period,
      icon: "mdi:clock-outline",
      color: "#FFE2E5",
      iconColor: "#FF4842",
    },
  ];

  return (
    <>
      <HeadingText title="Dashboard" />
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                p: 2.5,
                borderRadius: 2,
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                height: "100%",
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {card.title}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {card.title === "Total Sales"
                      ? `$${card.value.toLocaleString()}`
                      : card.value.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color:
                          card.trend === "up" ? "success.main" : "error.main",
                      }}
                    >
                      <Icon
                        icon={
                          card.trend === "up"
                            ? "mdi:trending-up"
                            : "mdi:trending-down"
                        }
                        width={20}
                        height={20}
                      />
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        {card.change}%
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      {card.period}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  sx={{
                    backgroundColor: card.color,
                    color: card.iconColor,
                    "&:hover": { backgroundColor: card.color },
                    width: 48,
                    height: 48,
                  }}
                >
                  <Icon icon={card.icon} width={24} height={24} />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DashboardCards;
