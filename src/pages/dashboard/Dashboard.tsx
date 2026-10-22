import {
  Avatar,
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import BatteryChargingFullRoundedIcon from "@mui/icons-material/BatteryChargingFullRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EvStationRoundedIcon from "@mui/icons-material/EvStationRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useNavigate } from "react-router";
import { stations } from "../../mockData/stationsMock";
import { txnMock } from "../../mockData/txnMock";
import { users } from "../../mockData/usersMock";

const metricStyles = [
  { color: "#5268c9", tint: "#eef2ff", icon: <EvStationRoundedIcon /> },
  { color: "#25835f", tint: "#eaf8f1", icon: <GroupsRoundedIcon /> },
  { color: "#bd8325", tint: "#fff6e7", icon: <BatteryChargingFullRoundedIcon /> },
  { color: "#5268c9", tint: "#eef2ff", icon: <SwapHorizRoundedIcon /> },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function Dashboard() {
  const navigate = useNavigate();
  const availableStations = stations.filter((station) => station.status === "AVAILABLE").length;
  const offlineStations = stations.filter((station) => station.status === "OFFLINE").length;
  const totalBatterySlots = stations.reduce((total, station) => total + station.totalBatteries, 0);
  const chargedBatteries = stations.reduce((total, station) => total + station.chargedBatteries, 0);
  const batteryReadiness = totalBatterySlots
    ? Math.round((chargedBatteries / totalBatterySlots) * 100)
    : 0;

  const metrics = [
    {
      label: "Total stations",
      value: stations.length,
      detail: `${availableStations} currently available`,
    },
    {
      label: "Registered riders",
      value: users.length,
      detail: "Profiles with linked vehicles",
    },
    {
      label: "Charged batteries",
      value: chargedBatteries,
      detail: `Across ${totalBatterySlots} station slots`,
    },
    {
      label: "Swap transactions",
      value: txnMock.length,
      detail: "Recent recorded activity",
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: 1440, mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 1.5,
          mb: 3.5,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#172033",
              fontSize: { xs: "1.5rem", sm: "1.8rem" },
              fontWeight: 750,
              letterSpacing: "-0.04em",
            }}
          >
            Dashboard
          </Typography>
          <Typography sx={{ mt: 0.5, color: "#718096", fontSize: "0.9rem" }}>
            Your battery-swap network at a glance.
          </Typography>
        </Box>
        <Chip
          icon={<CheckCircleRoundedIcon />}
          label={`${availableStations} of ${stations.length} stations available`}
          size="small"
          sx={{
            height: 32,
            border: "1px solid #dcefe8",
            bgcolor: "#f0faf5",
            color: "#25734f",
            fontWeight: 650,
            "& .MuiChip-icon": { color: "#35a879" },
          }}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", xl: "repeat(4, minmax(0, 1fr))" },
          gap: 2,
          mb: 3,
        }}
      >
        {metrics.map((metric, index) => {
          const style = metricStyles[index];
          return (
            <Paper
              key={metric.label}
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.75,
                p: 2.25,
                border: "1px solid #e8edf4",
                borderRadius: 3,
                bgcolor: "#fff",
              }}
            >
              <Avatar
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: 2.5,
                  bgcolor: style.tint,
                  color: style.color,
                }}
              >
                {style.icon}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ color: "#718096", fontSize: "0.78rem", fontWeight: 600 }}>
                  {metric.label}
                </Typography>
                <Typography sx={{ color: "#172033", fontSize: "1.4rem", fontWeight: 750, lineHeight: 1.4 }}>
                  {metric.value}
                </Typography>
                <Typography noWrap sx={{ color: "#9aa5b5", fontSize: "0.7rem" }}>
                  {metric.detail}
                </Typography>
              </Box>
            </Paper>
          );
        })}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.25fr) minmax(340px, 0.75fr)" },
          gap: 2.5,
          alignItems: "start",
        }}
      >
        <Paper
          elevation={0}
          sx={{ overflow: "hidden", border: "1px solid #e8edf4", borderRadius: 3, bgcolor: "#fff" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
              px: 2.5,
              py: 2,
              borderBottom: "1px solid #edf0f5",
            }}
          >
            <Box>
              <Typography sx={{ color: "#172033", fontSize: "0.98rem", fontWeight: 700 }}>
                Station overview
              </Typography>
              <Typography sx={{ mt: 0.35, color: "#8995a7", fontSize: "0.76rem" }}>
                Battery readiness by location
              </Typography>
            </Box>
            <Button
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() => navigate("/stations")}
              size="small"
              sx={{ color: "#5268a0", fontSize: "0.75rem", fontWeight: 650, textTransform: "none" }}
            >
              All stations
            </Button>
          </Box>

          <Box sx={{ px: 2.5, py: 1 }}>
            {stations.map((station, index) => {
              const isOffline = station.status === "OFFLINE";
              const chargePercentage = station.totalBatteries
                ? Math.round((station.chargedBatteries / station.totalBatteries) * 100)
                : 0;

              return (
                <Box
                  key={station.stationId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    py: 1.65,
                    borderBottom: index === stations.length - 1 ? 0 : "1px solid #f0f2f6",
                  }}
                >
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 38,
                      height: 38,
                      flexShrink: 0,
                      bgcolor: isOffline ? "#f1f3f6" : "#eef7f2",
                      color: isOffline ? "#8995a7" : "#3f9671",
                    }}
                  >
                    <EvStationRoundedIcon fontSize="small" />
                  </Avatar>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                      <Typography noWrap sx={{ color: "#344158", fontSize: "0.81rem", fontWeight: 650 }}>
                        Station {station.stationId}
                      </Typography>
                      <Chip
                        label={isOffline ? "Offline" : "Available"}
                        size="small"
                        color={isOffline ? "default" : "success"}
                        sx={{
                          height: 22,
                          fontSize: "0.64rem",
                          fontWeight: 650,
                          ...(isOffline && { bgcolor: "#f0f2f5", color: "#778395" }),
                        }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, mt: 0.3 }}>
                      <LocationOnOutlinedIcon sx={{ color: "#9aa5b5", fontSize: 14 }} />
                      <Typography noWrap sx={{ color: "#8995a7", fontSize: "0.7rem" }}>
                        {station.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.9 }}>
                      <LinearProgress
                        variant="determinate"
                        value={chargePercentage}
                        aria-label={`${chargePercentage}% battery readiness at station ${station.stationId}`}
                        sx={{
                          flex: 1,
                          height: 5,
                          borderRadius: 5,
                          bgcolor: "#edf1f5",
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 5,
                            bgcolor: isOffline ? "#b9c1cc" : "#4dbb8a",
                          },
                        }}
                      />
                      <Typography sx={{ minWidth: 74, color: "#778395", fontSize: "0.68rem", textAlign: "right" }}>
                        {station.chargedBatteries}/{station.totalBatteries} charged
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ px: 2.5, pb: 2.25 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
              <Typography sx={{ color: "#718096", fontSize: "0.72rem", fontWeight: 600 }}>
                Network battery readiness
              </Typography>
              <Typography sx={{ color: "#344158", fontSize: "0.72rem", fontWeight: 700 }}>
                {chargedBatteries} / {totalBatterySlots} ({batteryReadiness}%)
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={batteryReadiness}
              aria-label={`${batteryReadiness}% network battery readiness`}
              sx={{
                height: 7,
                borderRadius: 5,
                bgcolor: "#edf1f5",
                "& .MuiLinearProgress-bar": { borderRadius: 5, bgcolor: "#4dbb8a" },
              }}
            />
          </Box>
        </Paper>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {offlineStations > 0 && (
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                p: 2,
                border: "1px solid #f4e3c6",
                borderRadius: 3,
                bgcolor: "#fffaf1",
              }}
            >
              <Avatar
                sx={{ width: 36, height: 36, bgcolor: "#fff0d5", color: "#b77b24" }}
              >
                <WarningAmberRoundedIcon fontSize="small" />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ color: "#704d1c", fontSize: "0.82rem", fontWeight: 700 }}>
                  {offlineStations} station{offlineStations > 1 ? "s" : ""} need attention
                </Typography>
                <Typography sx={{ mt: 0.4, color: "#91764d", fontSize: "0.73rem", lineHeight: 1.5 }}>
                  Review offline locations and restore service to keep riders moving.
                </Typography>
                <Button
                  endIcon={<ArrowForwardRoundedIcon />}
                  onClick={() => navigate("/stations")}
                  size="small"
                  sx={{ mt: 0.5, ml: -1, color: "#93631c", fontSize: "0.72rem", fontWeight: 700, textTransform: "none" }}
                >
                  Review stations
                </Button>
              </Box>
            </Paper>
          )}

          <Paper
            elevation={0}
            sx={{ overflow: "hidden", border: "1px solid #e8edf4", borderRadius: 3, bgcolor: "#fff" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
                px: 2.25,
                py: 2,
                borderBottom: "1px solid #edf0f5",
              }}
            >
              <Box>
                <Typography sx={{ color: "#172033", fontSize: "0.95rem", fontWeight: 700 }}>
                  Recent swaps
                </Typography>
                <Typography sx={{ mt: 0.3, color: "#8995a7", fontSize: "0.73rem" }}>
                  Latest rider activity
                </Typography>
              </Box>
              <ReceiptLongRoundedIcon sx={{ color: "#8a98ad" }} />
            </Box>

            <Box sx={{ px: 2.25, py: 0.75 }}>
              {txnMock.slice(0, 5).map((transaction, index) => {
                const rider = users.find((user) => user.id === transaction.userId);
                const name = rider?.name ?? `Rider ${transaction.userId}`;

                return (
                  <Box
                    key={transaction.txnId}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.1,
                      py: 1.35,
                      borderBottom: index === Math.min(txnMock.length, 5) - 1 ? 0 : "1px solid #f0f2f6",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 34,
                        height: 34,
                        bgcolor: index % 2 === 0 ? "#eef2ff" : "#eaf8f1",
                        color: index % 2 === 0 ? "#5268c9" : "#27815e",
                        fontSize: "0.66rem",
                        fontWeight: 700,
                      }}
                    >
                      {getInitials(name)}
                    </Avatar>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography noWrap sx={{ color: "#344158", fontSize: "0.76rem", fontWeight: 650 }}>
                        {name}
                      </Typography>
                      <Typography noWrap sx={{ mt: 0.2, color: "#8995a7", fontSize: "0.67rem" }}>
                        TXN-{transaction.txnId} · {transaction.date}
                      </Typography>
                    </Box>
                    <Chip
                      label={transaction.status === "TRANSACTION_COMPLETED" ? "Complete" : transaction.status.replaceAll("_", " ")}
                      color={transaction.status === "TRANSACTION_COMPLETED" ? "success" : "warning"}
                      size="small"
                      sx={{ height: 22, fontSize: "0.62rem", fontWeight: 650 }}
                    />
                  </Box>
                );
              })}
              {txnMock.length === 0 && (
                <Box sx={{ py: 3, textAlign: "center" }}>
                  <Typography sx={{ color: "#8995a7", fontSize: "0.78rem" }}>
                    No swap activity has been recorded yet.
                  </Typography>
                </Box>
              )}
            </Box>
            <Box sx={{ px: 2.25, pb: 1.5 }}>
              <Button
                fullWidth
                endIcon={<ArrowForwardRoundedIcon />}
                onClick={() => navigate("/stations")}
                size="small"
                sx={{ color: "#5268a0", fontSize: "0.73rem", fontWeight: 650, textTransform: "none" }}
              >
                View station activity
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
