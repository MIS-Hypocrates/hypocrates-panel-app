"use server";

import { container } from "@/_app/AppContainer";
import { FileBucket } from "@/shared/utils/FileBucket";
import { FC } from "react";

export async function FileLoader<
  TProps extends { upload: (form: FormData) => Promise<string> },
>({ Component, ...props }: { Component: FC<TProps> } & Omit<TProps, "upload">) {
  const upload = async (forms: FormData) => {
    "use server";
    const fileBucket = container.get<FileBucket>(FileBucket);

    const uploadPromise: Promise<string>[] = [];

    forms.forEach((value) => {
      if (value instanceof File)
        uploadPromise.push(fileBucket.uploadFile(value));
    });

    return JSON.stringify(await Promise.all(uploadPromise));
  };

  return <Component upload={upload} {...props} />;
}
