"use server";

import { FileLoader } from "@/feature/FileLoader/FileLoader";

interface PhotoUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export default async function PhotoUpload({
  value,
  onChange,
}: PhotoUploadProps) {
  return (
    <FileLoader onChange={(values) => onChange(values[0])}>
      <img src={value} loading={"lazy"} />
    </FileLoader>
  );
}
