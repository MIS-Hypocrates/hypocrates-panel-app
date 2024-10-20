"use client";

import { Control, useController } from "react-hook-form";
import { HAvatarUpload } from "@/shared/components/HAvatarUpload";

interface AvatarLoaderProps {
  name: string;
  control?: Control;
  disabled?: boolean;
  upload: (form: FormData) => Promise<string>;
  size?: number;
}

export default function AvatarLoader({
  name,
  control,
  disabled,
  upload,
  size,
}: AvatarLoaderProps) {
  const { field } = useController({ name, control, disabled });

  return (
    <HAvatarUpload
      onUpload={upload}
      disabled={field.disabled}
      onChange={field.onChange}
      size={size}
      initValue={field.value}
    />
  );
}
