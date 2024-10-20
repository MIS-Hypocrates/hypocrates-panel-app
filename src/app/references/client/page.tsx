"use server";

import { container } from "@/app/AppContainer";
import { Api } from "@/shared/Api";
import { redirect } from "next/navigation";
import ClientForm from "@/widgets/ClientForm/ClientForm";
import { IPatient } from "@/Interfaces";

export default async function CreateClient({}) {
  const api = container.get<Api>(Api);

  const onSave = async (form: string) => {
    "use server";
    const data = JSON.parse(form) as IPatient;

    const entity = await api.post<IPatient, IPatient>("client", data);

    if (entity) redirect(`references/client/${entity.id}`);
  };

  return <ClientForm title={`Новый клиент`} onSave={onSave} />;
}
