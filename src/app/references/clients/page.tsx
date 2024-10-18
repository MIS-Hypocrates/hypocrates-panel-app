"use server";

import { Button, Stack, Typography } from "@mui/material";

import { TableReferences } from "@/feature/TableReferences/TableReferences";
import { FilterReferences } from "@/feature/TableReferences/FilterReferences";
import Grid from "@mui/material/Grid2";
import { TextFieldElement } from "react-hook-form-mui";
import { PlusIcon } from "@storybook/icons";
import Link from "next/link";

export default async function Page() {
  const apiEndpoint = "clients";

  return (
    <Grid component="main" sx={{ p: 3 }} spacing={3}>
      <Grid size={"grow"}>
        <Typography variant="h5">Пациенты</Typography>
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{ flexGrow: 1, marginTop: 2 }}
        direction={{ xs: "column-reverse", lg: "row" }}
      >
        <Grid size={"grow"}>
          <TableReferences
            columns={[
              { key: "id", title: "№", align: "right", minWidth: 10 },
              { key: "name", title: "ФИО", align: "left", minWidth: 200 },
              {
                key: "birthday",
                title: "Дата рождения",
                align: "left",
                minWidth: 200,
              },
              { key: "age", title: "Возраст", align: "left", minWidth: 100 },
            ]}
            endpoint={apiEndpoint}
          />
        </Grid>

        <Grid size={{ xs: "grow", lg: "auto" }}>
          <Stack spacing={2}>
            <Stack spacing={2} direction="row">
              <Link href={"/references/clients/new"}>
                <Button startIcon={<PlusIcon />} variant="contained">
                  Добавить <н></н>ового
                </Button>
              </Link>
            </Stack>
            <FilterReferences endpoint={apiEndpoint}>
              <TextFieldElement name={"name"} label="Имя пациента" />
              <Stack spacing={2} direction="row">
                <TextFieldElement name={"ageFrom"} label="Старше" />
                <TextFieldElement name={"ageTill"} label="Младше" />
              </Stack>
              <Stack spacing={2} direction="row">
                <TextFieldElement name={"birthdayFrom"} label="Рожден после" />
                <TextFieldElement name={"birthdayTill"} label="Рожден до" />
              </Stack>
            </FilterReferences>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
