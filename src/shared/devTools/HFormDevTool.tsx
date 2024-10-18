"use client";

import { useFormContext } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export const HFormDevTool = () => {
  const form = useFormContext();

  return <DevTool control={form.control} />;
};
