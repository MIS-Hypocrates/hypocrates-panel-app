"use client";

import {
  AppBar as MuiAppBar,
  AppBarProps,
  Box,
  CssBaseline,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { HSearch } from "@/shared/components/HSearch";
import { HDrawer } from "@/shared/components/HDrawer";
import MenuIcon from "@mui/icons-material/Menu";

export interface HAppBarProps {
  title: string;
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export const HAppBar = ({ title }: HAppBarProps) => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const toggleVisible = () => setVisibleDrawer((prev) => !prev);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleVisible}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant={"h6"} component={"div"} sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <HSearch />
        </Toolbar>
      </AppBar>
      <HDrawer visible={visibleDrawer} toggleVisible={toggleVisible} />
    </Box>
  );
};
