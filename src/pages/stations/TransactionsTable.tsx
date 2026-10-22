
import {
  Avatar,
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { txnMock } from "../../mockData/txnMock";

export default function TransactionsTable() {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
        <Box>
          <Typography sx={{ color: "#26334a", fontSize: "0.9rem", fontWeight: 700 }}>
            Transaction history
          </Typography>
          <Typography sx={{ mt: 0.35, color: "#8995a7", fontSize: "0.75rem" }}>
            Recent activity at this station
          </Typography>
        </Box>
        <Chip
          label={`${txnMock.length} ${txnMock.length === 1 ? "record" : "records"}`}
          size="small"
          sx={{ height: 24, bgcolor: "#f1f4f8", color: "#66748a", fontSize: "0.68rem", fontWeight: 650 }}
        />
      </Box>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ overflow: "hidden", border: "1px solid #e8edf4", borderRadius: 2.5 }}
      >
        <Table size="small" aria-label="Transaction history">
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8fafc" }}>
              {["Transaction", "Date", "User", "Status"].map((heading) => (
                <TableCell
                  key={heading}
                  sx={{
                    py: 1.25,
                    color: "#7b8798",
                    fontSize: "0.66rem",
                    fontWeight: 700,
                    letterSpacing: "0.07em",
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
            {txnMock.map((transaction) => (
              <TableRow
                key={transaction.txnId}
                sx={{
                  "&:last-child td": { borderBottom: 0 },
                  "&:hover": { bgcolor: "#fbfcfe" },
                }}
              >
                <TableCell sx={{ py: 1.5, borderColor: "#f0f2f6" }}>
                  <Typography sx={{ color: "#344158", fontSize: "0.78rem", fontWeight: 650 }}>
                    TXN-{String(transaction.txnId).padStart(4, "0")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 1.5, color: "#66748a", fontSize: "0.76rem", borderColor: "#f0f2f6" }}>
                  {transaction.date}
                </TableCell>
                <TableCell sx={{ py: 1.5, borderColor: "#f0f2f6" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.85 }}>
                    <Avatar
                      sx={{
                        width: 25,
                        height: 25,
                        bgcolor: "#eef2ff",
                        color: "#5268c9",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                      }}
                    >
                      {String(transaction.userId).slice(-2)}
                    </Avatar>
                    <Typography sx={{ color: "#536176", fontSize: "0.76rem" }}>
                      {transaction.userId}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 1.5, borderColor: "#f0f2f6" }}>
                  <Chip
                    label={transaction.status.replaceAll("_", " ")}
                    color={transaction.status === "TRANSACTION_COMPLETED" ? "success" : "warning"}
                    size="small"
                    sx={{ height: 23, fontSize: "0.64rem", fontWeight: 650 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
