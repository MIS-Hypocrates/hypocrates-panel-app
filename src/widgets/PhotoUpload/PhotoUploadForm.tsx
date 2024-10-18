'use server'

import {Control, Controller} from "react-hook-form";
import PhotoUpload from "@/widgets/PhotoUpload/PhotoUpload";

interface PhotoUploadFormProps {
    name: string;
    control?: Control;
    disabled?: boolean;
}

export default async function PhotoUploadForm({ name, control, disabled }: PhotoUploadFormProps) {
    return (
        <Controller
            render={({ field }) => <PhotoUpload value={field.value} onChange={field.onChange} />}
            name={name}
            disabled={disabled}
            control={control}
        />
    )
}
