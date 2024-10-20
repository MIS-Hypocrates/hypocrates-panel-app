"use client";

import { DefaultValues, FormContainer } from "react-hook-form-mui";
import { Button, Paper, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { HFormDevTool } from "@/shared/devTools/HFormDevTool";

interface HEntityFormProps<T extends object> extends PropsWithChildren {
  defaultValue?: DefaultValues<T>;
  onSuccess: (form: string) => Promise<void>;
}

export const HEntityForm = <T extends object>({
  onSuccess,
  defaultValue,
  children,
}: HEntityFormProps<T>) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 3 }}>
      <FormContainer
        defaultValues={defaultValue}
        onSuccess={async (form: T) => {
          await onSuccess(JSON.stringify(form));
        }}
      >
        <Stack spacing={2} direction="column" sx={{ marginTop: 2 }}>
          {children}
          <Stack spacing={2} direction="row">
            <Button variant="contained" type={"submit"}>
              Сохранить
            </Button>
          </Stack>
        </Stack>
        <HFormDevTool />
      </FormContainer>
    </Paper>
  );
};
