"use server";

import { container } from "@/app/AppContainer";
import { Api } from "@/shared/Api";
import { IPatient } from "@/Interfaces";
import ClientForm from "@/widgets/ClientForm/ClientForm";

export default async function CreateClient({ id }) {
  const api = container.get<Api>(Api);

  const model: IPatient | null = await api.get<IPatient>(`clients/${id}`);

  if (!model) throw new Error("No model found");

  const onSave = async (form: string) => {
    "use server";
    const data = JSON.parse(form) as IPatient;

    await api.update<IPatient, IPatient>("client", data);
  };

  return <ClientForm title={`Клиент ${id}`} onSave={onSave} data={model} />;
}
