"use server";

import { HFilterForm } from "@/shared/components/HFilterForm";
import { PropsWithChildren } from "react";
import { cookies } from "next/headers";

export interface FilterReferencesProps extends PropsWithChildren {
  endpoint: string;
}

export async function FilterReferences({
  endpoint,
  children,
}: FilterReferencesProps) {
  const filter = cookies().get(`${endpoint}_FILTER`)?.value ?? "{}";

  let filterValue = {};

  try {
    filterValue = JSON.parse(filter);
  } catch (e) {
    console.error(e);
  }

  const setFilterValue = (form: string) => {
    "use server";
    cookies().set(`${endpoint}_FILTER`, form);
  };

  return (
    <HFilterForm currentValue={filterValue} onSearch={setFilterValue}>
      {children}
    </HFilterForm>
  );
}
