"use client";

import { Box, styled, Toolbar } from "@mui/material";
import { BoxProps } from "@mui/system";
import { PropsWithChildren } from "react";

export const Page = styled(Box)<BoxProps>(({ theme }) => ({
  p: 3,
  flex: 1,
  [theme.breakpoints.up("sm")]: {
    marginLeft: `calc(${theme.spacing(8)} + 1px)`,
  },
}));

export function HPage({ children }: PropsWithChildren) {
  return (
    <Page>
      <Toolbar />
      {children}
    </Page>
  );
}
