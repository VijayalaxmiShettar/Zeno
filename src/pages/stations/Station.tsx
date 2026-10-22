
import {
  Avatar,
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EvStationRoundedIcon from "@mui/icons-material/EvStationRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { stations as mockStations } from "../../mockData/stationsMock";
import type { Station as StationType, Status, SwapEvent } from "../../types/types";
import { useMemo, useState } from "react";
import TransactionsModal from "./TransactionsModal";

const statusStyles: Record<Status, { label: string; color: "success" | "warning" | "error" | "default" }> = {
  AVAILABLE: { label: "Available", color: "success" },
  TRANSACTION_STARTED: { label: "Starting swap", color: "warning" },
  SWAP1_INPROGRESS: { label: "Swap in progress", color: "warning" },
  SWAP2_INPROGRESS: { label: "Swap in progress", color: "warning" },
  OFFLINE: { label: "Offline", color: "default" },
};

export default function Station() {
  const [stations, setStations] = useState(mockStations);
  const [showTransactions, setShowTransactions] = useState(false);
  const [selectedStationId, setSelectedStationId] = useState<null | number>(null);
  const availableCount = stations.filter((station) => station.status === "AVAILABLE").length;
  const offlineCount = stations.filter((station) => station.status === "OFFLINE").length;
  const totalBatteries = stations.reduce((total, station) => total + station.totalBatteries, 0);

  const handleShowTransactions = (stationId: number) => {
    setSelectedStationId(stationId);
    setShowTransactions(true);
  };

  const selectedStation = useMemo(() => {
    return stations.find((stat) => stat.stationId === selectedStationId);
  }, [selectedStationId, stations]);

  const updateEventsInTxn = (station: StationType, event: SwapEvent, stat: Status) => {
    const prevTxnData = station.currentTxn;
    if (prevTxnData) {
      const updatedEvents = [...prevTxnData.events];
      updatedEvents.push({ status: stat, bdata: event.batteryData });
      return { ...prevTxnData, events: updatedEvents };
    }
    return {
      txnId: event.txnId,
      userId: event.userId,
      status: event.type,
      events: [{ status: stat, bdata: event.batteryData }],
    };
  };

  const handleSocketEvent = (event: SwapEvent) => {
    setStations((previousStations) =>
      previousStations.map((station) => {
        if (station.stationId !== event.stationId) {
          return station;
        }
        

        switch (event.type) {
          case "TRANSACTION_STARTED": {
            return { ...station, status: "TRANSACTION_STARTED", currentTxn: updateEventsInTxn(station, event, "TRANSACTION_STARTED") };
          }
          case "SWAP1_INPROGRESS":
            return { ...station, status: "SWAP1_INPROGRESS", currentTxn: updateEventsInTxn(station, event, "SWAP1_INPROGRESS") };

          case "SWAP2_INPROGRESS":
            return { ...station, status: "SWAP2_INPROGRESS", currentTxn: updateEventsInTxn(station, event, "SWAP2_INPROGRESS") };
          case "TRANSACTION_COMPLETED":
            return {
              ...station,
              status: "AVAILABLE",
              currentTxn: null,
              chargedBatteries: Math.max(
                0,
                station.chargedBatteries - 2
              ),
            };
          default:
            return station;
        }
      })
    );
  };

  const startSwap = (stationId: number) => {
    handleSocketEvent({
      type: "TRANSACTION_STARTED",
      stationId,
      txnId: 1,
      userId: 1,
    });

    setTimeout(() => {
      handleSocketEvent({
        type: "SWAP1_INPROGRESS",
        batteryData: {
          from: 123,
          to: 345,
        },
        stationId,
        txnId: 1,
        userId: 1,
      });
    }, 3000);

    setTimeout(() => {
      handleSocketEvent({
        type: "SWAP2_INPROGRESS",
        batteryData: {
          from: 789,
          to: 546,
        },
        stationId,
        txnId: 1,
        userId: 1,
      });
    }, 5000);

    setTimeout(() => {
      handleSocketEvent({
        type: "TRANSACTION_COMPLETED",
        stationId,
        txnId: 1,
        userId: 1,
      });
    }, 7000);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1440, mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 1,
          mb: 3.5,
        }}
      >
        <Box>
          <Typography sx={{ color: "#172033", fontSize: { xs: "1.5rem", sm: "1.8rem" }, fontWeight: 750, letterSpacing: "-0.04em" }}>
            Swap stations
          </Typography>
          <Typography sx={{ mt: 0.5, color: "#718096", fontSize: "0.9rem" }}>
            Monitor station health, battery inventory, and swap activity.
          </Typography>
        </Box>
        <Chip
          icon={<PowerSettingsNewRoundedIcon />}
          label={`${stations.length - offlineCount} of ${stations.length} online`}
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
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
          gap: 2,
          mb: 3,
        }}
      >
        {[
          { label: "Total stations", value: stations.length, detail: "Across all locations", icon: <EvStationRoundedIcon />, color: "#4666d5", tint: "#eef2ff" },
          { label: "Available now", value: availableCount, detail: "Ready for a swap", icon: <PowerSettingsNewRoundedIcon />, color: "#25966b", tint: "#eaf8f1" },
          { label: "Battery capacity", value: totalBatteries, detail: "Total battery slots", icon: <BoltRoundedIcon />, color: "#bd8325", tint: "#fff6e7" },
        ].map((metric) => (
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
            <Avatar sx={{ width: 46, height: 46, bgcolor: metric.tint, color: metric.color, borderRadius: 2.5 }}>
              {metric.icon}
            </Avatar>
            <Box>
              <Typography sx={{ color: "#718096", fontSize: "0.78rem", fontWeight: 600 }}>
                {metric.label}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                <Typography sx={{ color: "#172033", fontSize: "1.4rem", fontWeight: 750, lineHeight: 1.4 }}>
                  {metric.value}
                </Typography>
                <Typography sx={{ color: "#9aa5b5", fontSize: "0.72rem" }}>{metric.detail}</Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
          border: "1px solid #e8edf4",
          borderRadius: 3,
          bgcolor: "#fff",
        }}
      >
        <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid #edf0f5" }}>
          <Typography sx={{ color: "#172033", fontSize: "0.98rem", fontWeight: 700 }}>
            Station inventory
          </Typography>
          <Typography sx={{ mt: 0.35, color: "#8995a7", fontSize: "0.78rem" }}>
            {stations.length} stations registered
          </Typography>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 820 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fafc" }}>
                {["Station", "Location", "Status", "Batteries", "Charged", "Actions"].map((heading) => (
                  <TableCell
                    key={heading}
                    align={heading === "Actions" ? "right" : "left"}
                    sx={{
                      py: 1.5,
                      color: "#7b8798",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.075em",
                      textTransform: "uppercase",
                      borderBottom: "1px solid #edf0f5",
                    }}
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stations.map((station: StationType) => {
                const status = statusStyles[station.status];
                const chargePercentage = station.totalBatteries
                  ? (station.chargedBatteries / station.totalBatteries) * 100
                  : 0;

                return (
                  <TableRow
                    key={station.stationId}
                    sx={{
                      "&:last-child td": { borderBottom: 0 },
                      "&:hover": { bgcolor: "#fbfcfe" },
                    }}
                  >
                    <TableCell sx={{ py: 2, borderColor: "#f0f2f6" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                        <Avatar
                          variant="rounded"
                          sx={{ width: 36, height: 36, bgcolor: "#f0f3fa", color: "#596b91", fontSize: "0.72rem", fontWeight: 700 }}
                        >
                          {station.stationId}
                        </Avatar>
                        <Box>
                          <Typography sx={{ color: "#26334a", fontSize: "0.85rem", fontWeight: 650 }}>
                            Station {station.stationId}
                          </Typography>
                          <Typography sx={{ color: "#9aa5b5", fontSize: "0.7rem" }}>
                            Swap point
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2, color: "#536176", fontSize: "0.82rem", borderColor: "#f0f2f6" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                        <LocationOnOutlinedIcon sx={{ color: "#9aa5b5", fontSize: 17 }} />
                        <span>{station.location}</span>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2, borderColor: "#f0f2f6" }}>
                      <Chip
                        label={status.label}
                        color={status.color}
                        size="small"
                        sx={{
                          height: 25,
                          fontSize: "0.7rem",
                          fontWeight: 650,
                          ...(status.color === "default" && { bgcolor: "#f0f2f5", color: "#778395" }),
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2, color: "#536176", fontSize: "0.84rem", fontWeight: 600, borderColor: "#f0f2f6" }}>
                      {station.totalBatteries}
                      <Typography component="span" sx={{ ml: 0.5, color: "#9aa5b5", fontSize: "0.75rem", fontWeight: 400 }}>
                        slots
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2, borderColor: "#f0f2f6" }}>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.65, width: 112 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                          <Typography sx={{ color: "#344158", fontSize: "0.78rem", fontWeight: 650 }}>
                            {station.chargedBatteries}
                          </Typography>
                          <Typography sx={{ color: "#9aa5b5", fontSize: "0.68rem" }}>
                            / {station.totalBatteries}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={chargePercentage}
                          aria-label={`${station.chargedBatteries} of ${station.totalBatteries} batteries charged`}
                          sx={{
                            height: 5,
                            borderRadius: 5,
                            bgcolor: "#edf1f5",
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 5,
                              bgcolor: station.status === "OFFLINE" ? "#b9c1cc" : "#4dbb8a",
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ py: 2, whiteSpace: "nowrap", borderColor: "#f0f2f6" }}>
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<ReceiptLongOutlinedIcon />}
                        onClick={() => handleShowTransactions(station.stationId)}
                        sx={{
                          mr: 0.75,
                          color: "#55647b",
                          fontSize: "0.75rem",
                          fontWeight: 650,
                          textTransform: "none",
                          "&:hover": { bgcolor: "#f2f5fa", color: "#253653" },
                        }}
                      >
                        Transactions
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<PlayArrowRoundedIcon />}
                        onClick={() => startSwap(station.stationId)}
                        disabled={station.status === "OFFLINE" || station.status !== "AVAILABLE"}
                        sx={{
                          borderRadius: 1.75,
                          bgcolor: "#1c7959",
                          boxShadow: "none",
                          fontSize: "0.74rem",
                          fontWeight: 650,
                          textTransform: "none",
                          "&:hover": { bgcolor: "#166448", boxShadow: "none" },
                          "&.Mui-disabled": { bgcolor: "#edf0f4", color: "#9aa5b5" },
                        }}
                      >
                        Mock swap
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {selectedStation && (
        <TransactionsModal
          open={showTransactions}
          onClose={() => setShowTransactions(false)}
          stationId={selectedStation.stationId}
          location={selectedStation.location}
          status={selectedStation.status}
          events={selectedStation.currentTxn?.events}
        />
      )}
    </Box>
  );
}
