"use client";

import { Avatar, IconButton, styled } from "@mui/material";
import { LegacyRef, useCallback, useRef, useState } from "react";

interface HAvatarUploadProps {
  onChange?: (value: string) => void;
  onUpload: (value: FormData) => Promise<string>;
  disabled?: boolean;
  initValue?: string;
  size?: number;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const HAvatarUpload = ({
  onUpload,
  onChange,
  disabled,
  initValue,
  size = 54,
}: HAvatarUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(initValue);
  const ref = useRef<LegacyRef<HTMLInputElement>>();

  const upload = useCallback(
    async (files: FileList | null) => {
      if (!files || !files.length) return;

      try {
        setIsLoading(true);

        const formData = new FormData();

        formData.append(files[0].name, files[0]);

        const response = await onUpload(formData);

        const uri = JSON.parse(response)?.at(0);

        if (onChange) onChange(uri);

        console.log({ uri });

        setValue(uri);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    },
    [onChange, onUpload],
  );

  return (
    <IconButton
      component={"label"}
      tabIndex={-1}
      disabled={isLoading || disabled}
      sx={{ width: size, height: size }}
    >
      <Avatar src={value} sx={{ width: size, height: size }} />
      <VisuallyHiddenInput
        ref={(elementRef) => {
          if (!elementRef) ref.current = elementRef;
        }}
        type={"file"}
        accept="image/png, image/jpeg"
        disabled={isLoading || disabled}
        onChange={(e) => upload(e.target.files)}
      />
    </IconButton>
  );
};
