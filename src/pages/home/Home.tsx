import Sidebar from "./Sidebar"
import { Box } from "@mui/material";
import { Outlet } from "react-router";

export const Home = () => {
    return (
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ width: "100%", p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    )
}