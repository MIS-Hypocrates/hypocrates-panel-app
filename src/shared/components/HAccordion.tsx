import { PropsWithChildren } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";

interface HAccordionProps extends PropsWithChildren {
  label: string;
}

export const HAccordion = ({ label, children }: HAccordionProps) => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>{children}</Stack>
      </AccordionDetails>
    </Accordion>
  );
};
