"use client";

import { Button, CircularProgress, styled } from "@mui/material";
import {
  LegacyRef,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface HFileUploadProps extends PropsWithChildren {
  multiple?: boolean;
  onChange?: (value: string[]) => void;
  onUpload: (value: FormData) => Promise<string>;
  disabled?: boolean;
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

export const HFileUpload = ({
  children,
  multiple,
  onUpload,
  onChange,
  disabled,
}: HFileUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<LegacyRef<HTMLInputElement>>();

  const upload = useCallback(
    async (files: FileList | null) => {
      if (!files || !files.length) return;

      try {
        setIsLoading(true);

        const formData = new FormData();

        for (let i = 0; i < files.length; i++)
          formData.append(files[i].name, files[i]);

        const response = await onUpload(formData);

        const uri = JSON.parse(response)?.at(0);

        if (onChange) onChange(uri);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    },
    [onChange, onUpload],
  );

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={isLoading ? <CircularProgress /> : <CloudUploadIcon />}
      disabled={isLoading || disabled}
    >
      {children}
      <VisuallyHiddenInput
        ref={(elementRef) => {
          if (!elementRef) ref.current = elementRef;
        }}
        type={"file"}
        multiple={multiple}
        disabled={isLoading || disabled}
        onChange={(e) => upload(e.target.files)}
      />
    </Button>
  );
};
