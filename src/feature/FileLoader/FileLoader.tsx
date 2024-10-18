"use server";

import { HFileUpload } from "@/shared/components/HFileUpload";
import { container } from "@/_app/AppContainer";
import { FileBucket } from "@/shared/utils/FileBucket";

interface FileLoaderProps {
  multiple?: boolean;
  onChange?: (value: string[]) => void;
  disabled?: boolean;
}

export async function FileLoader(props: FileLoaderProps) {
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

  return <HFileUpload onUpload={upload} {...props} />;
}
