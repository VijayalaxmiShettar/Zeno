
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import DirectionsCarFilledRoundedIcon from "@mui/icons-material/DirectionsCarFilledRounded";
import BatteryChargingFullRoundedIcon from "@mui/icons-material/BatteryChargingFullRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { users } from "../../mockData/usersMock";

const avatarColors = [
  { background: "#eef2ff", foreground: "#5268c9" },
  { background: "#eaf8f1", foreground: "#27815e" },
  { background: "#fff3e8", foreground: "#b66a2c" },
  { background: "#f8edfa", foreground: "#8e55a2" },
];

export default function UsersTable() {
  const handleEdit = (id: number) => {
    console.log("Edit user:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete user:", id);
  };

  const vehicleCount = new Set(users.map((user) => user.vehicleId)).size;
  const batteryCount = users.reduce((count, user) => count + user.batteryIds.length, 0);

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
            Users
          </Typography>
          <Typography sx={{ mt: 0.5, color: "#718096", fontSize: "0.9rem" }}>
            Manage rider profiles, vehicles, and assigned batteries.
          </Typography>
        </Box>
        <Chip
          icon={<PeopleAltRoundedIcon />}
          label={`${users.length} registered`}
          size="small"
          sx={{
            height: 32,
            border: "1px solid #e2e8f4",
            bgcolor: "#f4f6fc",
            color: "#5268a0",
            fontWeight: 650,
            "& .MuiChip-icon": { color: "#657ac0" },
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
          { label: "Registered users", value: users.length, detail: "Rider profiles", icon: <PeopleAltRoundedIcon />, color: "#4666d5", tint: "#eef2ff" },
          { label: "Linked vehicles", value: vehicleCount, detail: "Vehicles on file", icon: <DirectionsCarFilledRoundedIcon />, color: "#25966b", tint: "#eaf8f1" },
          { label: "Assigned batteries", value: batteryCount, detail: "Across all riders", icon: <BatteryChargingFullRoundedIcon />, color: "#bd8325", tint: "#fff6e7" },
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
                <Typography sx={{ color: "#9aa5b5", fontSize: "0.72rem" }}>
                  {metric.detail}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <Paper
        elevation={0}
        sx={{ overflow: "hidden", border: "1px solid #e8edf4", borderRadius: 3, bgcolor: "#fff" }}
      >
        <Box sx={{ px: 2.5, py: 2, borderBottom: "1px solid #edf0f5" }}>
          <Typography sx={{ color: "#172033", fontSize: "0.98rem", fontWeight: 700 }}>
            Rider directory
          </Typography>
          <Typography sx={{ mt: 0.35, color: "#8995a7", fontSize: "0.78rem" }}>
            {users.length} user profiles
          </Typography>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 760 }} aria-label="Users">
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fafc" }}>
                {["User", "RFID", "Vehicle", "Batteries", "Actions"].map((heading) => (
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
              {users.map((user, index) => {
                const avatarColor = avatarColors[index % avatarColors.length];

                return (
                  <TableRow
                    key={user.id}
                    sx={{
                      "&:last-child td": { borderBottom: 0 },
                      "&:hover": { bgcolor: "#fbfcfe" },
                    }}
                  >
                    <TableCell sx={{ py: 1.75, borderColor: "#f0f2f6" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                        <Avatar
                          sx={{
                            width: 38,
                            height: 38,
                            bgcolor: avatarColor.background,
                            color: avatarColor.foreground,
                            fontSize: "0.75rem",
                            fontWeight: 700,
                          }}
                        >
                          {user.name.slice(0, 1).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography sx={{ color: "#26334a", fontSize: "0.84rem", fontWeight: 650 }}>
                            {user.name}
                          </Typography>
                          <Typography sx={{ mt: 0.2, color: "#9aa5b5", fontSize: "0.7rem" }}>
                            User #{String(user.id).padStart(3, "0")}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 1.75, borderColor: "#f0f2f6" }}>
                      <Chip
                        label={user.rfid}
                        size="small"
                        sx={{
                          height: 25,
                          borderRadius: 1.5,
                          bgcolor: "#f4f6f9",
                          color: "#59677c",
                          fontFamily: "monospace",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 1.75, color: "#536176", fontSize: "0.8rem", fontWeight: 550, borderColor: "#f0f2f6" }}>
                      {user.vehicleId}
                    </TableCell>
                    <TableCell sx={{ py: 1.75, borderColor: "#f0f2f6" }}>
                      <Stack direction="row" spacing={0.75}>
                        {user.batteryIds.map((batteryId) => (
                          <Chip
                            key={batteryId}
                            icon={<BatteryChargingFullRoundedIcon />}
                            label={batteryId}
                            size="small"
                            sx={{
                              height: 25,
                              bgcolor: "#eff8f3",
                              color: "#3e8065",
                              fontSize: "0.68rem",
                              fontWeight: 600,
                              "& .MuiChip-icon": { color: "#55a77f", fontSize: 15 },
                            }}
                          />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell align="right" sx={{ py: 1.5, whiteSpace: "nowrap", borderColor: "#f0f2f6" }}>
                      <IconButton
                        aria-label={`Edit ${user.name}`}
                        onClick={() => handleEdit(user.id)}
                        size="small"
                        sx={{
                          mr: 0.5,
                          color: "#65748b",
                          "&:hover": { bgcolor: "#eef2ff", color: "#5268c9" },
                        }}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label={`Delete ${user.name}`}
                        onClick={() => handleDelete(user.id)}
                        size="small"
                        sx={{
                          color: "#9a7b7b",
                          "&:hover": { bgcolor: "#fff0f0", color: "#c64d4d" },
                        }}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
