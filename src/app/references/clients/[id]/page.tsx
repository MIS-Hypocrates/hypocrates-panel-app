"use server";

import Grid from "@mui/material/Grid2";
import { Stack, Typography } from "@mui/material";
import { container } from "@/_app/AppContainer";
import { Api } from "@/shared/Api";
import { HEntityForm } from "@/shared/components/HEntityForm";
import { IPatient } from "@/Interfaces";
import { FunctionUtils } from "@/shared/utils/FunctionUtils";
import {
  CheckboxElement,
  SelectElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
import { HAccordion } from "@/shared/components/HAccordion";
import PhotoUploadForm from "@/widgets/PhotoUpload/PhotoUploadForm";

export default async function CreateClient({ id }) {
  const functionUtils = container.get<FunctionUtils>(FunctionUtils);
  const api = container.get<Api>(Api);

  let model: Partial<IPatient> = {};

  if (!!id) {
    functionUtils.runIfNoFalse<IPatient>(
      await api.get<IPatient>(`clients/${id}`),
      (value) => {
        model = value;
      },
    );
  }

  const onSave = async (form: string) => {
    "use server";
    await api.post("clinics/endpoint", form);
  };

  const title = !!id ? `Клиент ${id}` : `Новый клиент`;

  return (
    <Grid component="main" sx={{ p: 3 }} spacing={3}>
      <Stack spacing={2}>
        <Grid size={"grow"}>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <HEntityForm onSave={onSave} currentValue={model}>
          <PhotoUploadForm name={"avatar"} />
          <TextFieldElement name="surname" label="Фамилия" required />
          <TextFieldElement name="firsname" label="Имя" required />
          <TextFieldElement name="patronymic" label="Отчество" />
          <DatePickerElement name={"birthday"} label={"Дата рождения"} />
          <SelectElement
            name="sex"
            label={"Пол"}
            defaultValue={"other"}
            options={[
              { id: "other", label: "Не указан" },
              { id: "male", label: "Мужской" },
              { id: "female", label: "Женский" },
            ]}
          />

          <HAccordion label={"Контакты"}>
            <TextFieldElement name={"phone"} label={"Телефон"} />
            <TextFieldElement name={"adductionPhone"} label={"Доп. телефон"} />

            <TextFieldElement name={"email"} label={"Эл. Почта"} />
            <CheckboxElement
              name={"consentMailing"}
              label={"Согласие на рассылку"}
            />
          </HAccordion>

          <HAccordion label={"Адрес"}>
            <TextFieldElement name={"region"} label={"Регион"} />
            <TextFieldElement name={"city"} label={"Город"} />

            <TextFieldElement name={"street"} label={"Улица"} />
            <TextFieldElement name={"home"} label={"дом"} />
          </HAccordion>

          <HAccordion label={"Личные данные"}>
            <SelectElement
              name="familyStatus"
              label={"Семейное положение"}
              defaultValue={"unknown"}
              options={[
                { id: "unknown", label: "Не известно" },
                { id: "marriage", label: "В браке" },
                { id: "free", label: "Свободен" },
                { id: "cohabiting", label: "Вне брака" },
              ]}
            />
            <SelectElement
              name="education"
              label={"Образование"}
              defaultValue={"unknown"}
              options={[
                { id: "unknown", label: "Не известно" },
                { id: "generalJunior", label: "Общее начальное" },
                { id: "generalMiddle", label: "Общее среднее" },
                { id: "generalSenior", label: "Общее полное" },
                {
                  id: "professionalMiddle",
                  label: "Профессиональное: среднее",
                },
                { id: "professionalSenior", label: "Профессиональное: высшее" },
              ]}
            />
            <SelectElement
              name="employment"
              label={"Занятость"}
              defaultValue={"unknown"}
              options={[
                { id: "unknown", label: "Не известно" },
                { id: "work", label: "Работает" },
                { id: "Study", label: "Учиться" },
                { id: "pensioner", label: "Пенсионер" },
                { id: "free", label: "Не работает" },
              ]}
            />
          </HAccordion>

          <HAccordion label={"Анамнез"}>
            <TextFieldElement name={"disability"} label={"Инвалидность"} />
            <SelectElement
              name="bloodType"
              label={"Группа крови"}
              defaultValue={"unknown"}
              options={[
                { id: "unknown", label: "Не известно" },
                { id: "onePlus", label: "I+ (0+)" },
                { id: "oneMinus", label: "I- (0)" },
                { id: "twoPlus", label: "II+ (A+)" },
                { id: "twoMinus", label: "II- (A)" },
                { id: "threePlus", label: "III+ (B+)" },
                { id: "threeMinus", label: "III- (B)" },
                { id: "fourPlus", label: "IV+ (AB+)" },
                { id: "fourMinus", label: "IV- (AB)" },
              ]}
            />
            <TextFieldElement name={"allergy"} label={"Аллергия"} multiline />
            <TextFieldElement
              name={"chronicDiseases"}
              label={"Хронические заболевания"}
              multiline
            />
          </HAccordion>
        </HEntityForm>
      </Stack>
    </Grid>
  );
}
