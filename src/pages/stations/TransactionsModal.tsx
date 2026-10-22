
import {
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BatteryChargingFullRoundedIcon from "@mui/icons-material/BatteryChargingFullRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import TransactionsTable from "./TransactionsTable";

interface TransactionEvent {
  status: string;
  bdata?: {
    from: number;
    to: number;
  };
}

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  stationId: number;
  location: string;
  status: string;
  events?: TransactionEvent[];
}

const getStatusPresentation = (status: string) => {
  if (status === "AVAILABLE" || status === "TRANSACTION_COMPLETED") {
    return { label: "Available", color: "success" as const };
  }
  if (status === "OFFLINE") {
    return { label: "Offline", color: "default" as const };
  }
  if (status.includes("INPROGRESS") || status === "TRANSACTION_STARTED") {
    return { label: "In progress", color: "warning" as const };
  }
  return { label: status.replaceAll("_", " "), color: "info" as const };
};

export default function TransactionsModal({
  open,
  onClose,
  stationId,
  location,
  status,
  events = [],
}: TransactionModalProps) {
  const currentStatus = getStatusPresentation(status);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="station-activity-title"
      slotProps={{
        paper: {
          sx: {
          overflow: "hidden",
          border: "1px solid #e8edf4",
          borderRadius: 3,
          boxShadow: "0 24px 80px rgba(23, 32, 51, 0.2)",
          },
        },
      }}
    >
      <DialogTitle sx={{ px: { xs: 2.5, sm: 3 }, pt: 2.75, pb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              width: 42,
              height: 42,
              borderRadius: 2.5,
              bgcolor: "#eef2ff",
              color: "#5268c9",
            }}
          >
            <ReceiptLongOutlinedIcon />
          </Box>
          <Box>
            <Typography
              id="station-activity-title"
              sx={{ color: "#172033", fontSize: "1.15rem", fontWeight: 750, letterSpacing: "-0.025em" }}
            >
              Station activity
            </Typography>
            <Typography sx={{ mt: 0.25, color: "#8995a7", fontSize: "0.8rem" }}>
              Transaction details and recent history
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <Divider sx={{ borderColor: "#edf0f5" }} />

      <DialogContent sx={{ px: { xs: 2.5, sm: 3 }, py: 2.5 }}>
        <Stack spacing={2.5}>
          <Card
            variant="outlined"
            sx={{ borderColor: "#e8edf4", borderRadius: 2.5, bgcolor: "#fbfcfe" }}
          >
            <CardContent sx={{ p: "16px 18px !important" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 1.5,
                }}
              >
                <Box>
                  <Typography sx={{ mb: 0.75, color: "#8995a7", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Station {stationId}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                    <LocationOnOutlinedIcon sx={{ color: "#8794a7", fontSize: 18 }} />
                    <Typography sx={{ color: "#344158", fontSize: "0.88rem", fontWeight: 600 }}>
                      {location}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={currentStatus.label}
                  color={currentStatus.color}
                  size="small"
                  sx={{
                    height: 27,
                    px: 0.5,
                    fontSize: "0.72rem",
                    fontWeight: 650,
                    ...(currentStatus.color === "default" && {
                      bgcolor: "#f0f2f5",
                      color: "#778395",
                    }),
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          <Box>
            <Typography sx={{ mb: 1.25, color: "#26334a", fontSize: "0.9rem", fontWeight: 700 }}>
              Current swap
            </Typography>
            {events.length > 0 ? (
              <Stack spacing={0}>
                {events.map((event, index) => (
                  <Box
                    key={`${event.status}-${index}`}
                    sx={{ display: "flex", gap: 1.5, minHeight: index === events.length - 1 ? 0 : 58 }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20 }}>
                      {index === events.length - 1 ? (
                        <RadioButtonCheckedRoundedIcon sx={{ color: "#45ad83", fontSize: 18 }} />
                      ) : (
                        <CheckCircleOutlineRoundedIcon sx={{ color: "#45ad83", fontSize: 18 }} />
                      )}
                      {index < events.length - 1 && (
                        <Box sx={{ width: "1px", flex: 1, my: 0.5, bgcolor: "#dce9e3" }} />
                      )}
                    </Box>
                    <Box sx={{ flex: 1, pb: index === events.length - 1 ? 0 : 1.75 }}>
                      <Typography sx={{ color: "#344158", fontSize: "0.82rem", fontWeight: 650 }}>
                        {event.status.replaceAll("_", " ")}
                      </Typography>
                      {event.bdata && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.7 }}>
                          <BatteryChargingFullRoundedIcon sx={{ color: "#718096", fontSize: 16 }} />
                          <Typography sx={{ color: "#718096", fontSize: "0.75rem" }}>
                            Battery received: <strong>{event.bdata.from}</strong>
                            <Box component="span" sx={{ mx: 0.75, color: "#c1c8d2" }}>·</Box>
                            Battery sent: <strong>{event.bdata.to}</strong>
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  px: 1.75,
                  py: 1.5,
                  border: "1px dashed #dce3ec",
                  borderRadius: 2,
                  bgcolor: "#fbfcfe",
                }}
              >
                <ReceiptLongOutlinedIcon sx={{ color: "#9aa5b5", fontSize: 20 }} />
                <Typography sx={{ color: "#8995a7", fontSize: "0.8rem" }}>
                  No active swap events for this station.
                </Typography>
              </Box>
            )}
          </Box>

          <Divider sx={{ borderColor: "#edf0f5" }} />
          <TransactionsTable />
        </Stack>
      </DialogContent>

      <Divider sx={{ borderColor: "#edf0f5" }} />

      <DialogActions sx={{ px: { xs: 2.5, sm: 3 }, py: 1.75 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            px: 2.5,
            borderRadius: 1.75,
            bgcolor: "#1c7959",
            boxShadow: "none",
            fontSize: "0.8rem",
            fontWeight: 650,
            textTransform: "none",
            "&:hover": { bgcolor: "#166448", boxShadow: "none" },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
