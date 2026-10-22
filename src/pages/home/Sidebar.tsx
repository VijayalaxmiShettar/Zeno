
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import EvStationRoundedIcon from "@mui/icons-material/EvStationRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";

const drawerWidth = 264;

const menuItems = [
  { label: "Dashboard", path: "/", icon: <DashboardRoundedIcon /> },
  { label: "Stations", path: "/stations", icon: <EvStationRoundedIcon /> },
  { label: "Users", path: "/users", icon: <PeopleAltRoundedIcon /> },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      aria-label="Main navigation"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #e8edf5",
          background: "linear-gradient(180deg, #101a2d 0%, #17243b 100%)",
          color: "#f8fafc",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 3, py: 3.25 }}>
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: 42,
            height: 42,
            borderRadius: 2.5,
            color: "#102033",
            background: "linear-gradient(145deg, #9cebd1, #48c9a5)",
            boxShadow: "0 6px 18px rgba(72, 201, 165, 0.2)",
          }}
        >
          <BoltRoundedIcon />
        </Box>
        <Box>
          <Typography sx={{ fontSize: "1.15rem", fontWeight: 750, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            zeno
          </Typography>
          <Typography sx={{ mt: 0.35, color: "#93a2bb", fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.14em" }}>
            OPERATIONS
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: "auto", px: 2, pt: 2 }}>
        <Typography
          sx={{
            px: 1.5,
            mb: 1.25,
            color: "#71819c",
            fontSize: "0.67rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
          }}
        >
          WORKSPACE
        </Typography>
        <List disablePadding aria-label="Workspace">
          {menuItems.map((item) => (
            <ListItemButton
              component={NavLink}
              key={item.label}
              to={item.path}
              end={item.path === "/"}
              sx={{
                position: "relative",
                minHeight: 48,
                px: 1.5,
                mb: 0.75,
                borderRadius: 2.5,
                color: "#aab6ca",
                transition: "background-color 160ms ease, color 160ms ease, transform 160ms ease",
                "& .MuiListItemIcon-root": {
                  color: "inherit",
                  minWidth: 40,
                  transition: "color 160ms ease",
                },
                "& .MuiListItemText-primary": {
                  fontSize: "0.9rem",
                  fontWeight: 550,
                },
                "&.active": {
                  color: "#f8fafc",
                  backgroundColor: "rgba(91, 224, 183, 0.12)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 10,
                    bottom: 10,
                    width: 3,
                    borderRadius: 3,
                    backgroundColor: "#5be0b7",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "#5be0b7",
                  },
                  "& .MuiListItemText-primary": {
                    fontWeight: 650,
                  },
                },
                "&:hover": {
                  color: "#f8fafc",
                  backgroundColor: "rgba(255, 255, 255, 0.07)",
                  transform: "translateX(2px)",
                },
                "&.active:hover": {
                  backgroundColor: "rgba(91, 224, 183, 0.16)",
                },
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ px: 2, pb: 2 }}>
        <Divider sx={{ mb: 2, borderColor: "rgba(203, 213, 225, 0.12)" }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, px: 1, py: 1 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: "#31435e",
                color: "#cfe6df",
                fontSize: "0.8rem",
                fontWeight: 700,
              }}
            >
              OA
            </Avatar>
            <Box
              sx={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 10,
                height: 10,
                border: "2px solid #17243b",
                borderRadius: "50%",
                bgcolor: "#5be0a5",
              }}
            />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography noWrap sx={{ color: "#edf2f8", fontSize: "0.82rem", fontWeight: 650 }}>
              Operations admin
            </Typography>
            <Typography noWrap sx={{ mt: 0.25, color: "#8291aa", fontSize: "0.72rem" }}>
              Administrator
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
