'use client'

import {PropsWithChildren} from "react";
import {DefaultValues, FormContainer} from "react-hook-form-mui";
import {Paper, Button, Stack, Typography} from "@mui/material";

export interface HFilterFormProps<T extends object> extends PropsWithChildren{
    currentValue: DefaultValues<T>;
    onSearch: (form: string) => void;
}

export function HFilterForm<T extends object>({ currentValue, onSearch, children }: HFilterFormProps<T>) {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', p: 3 }}>
            <Typography variant={"h6"}>Фильтр</Typography>
            <FormContainer
                defaultValues={currentValue}
                onSuccess={(form: T) => onSearch(JSON.stringify(form))}
            >
                <Stack spacing={2} direction="column" sx={{ marginTop: 2 }}>
                    {children}
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" type={"submit"}>Фильтровать</Button>
                        <Button variant={"text"} type={"reset"} onClick={() => onSearch("{}")}>Сбросить</Button>
                    </Stack>
                </Stack>
            </FormContainer>
        </Paper>
    );
}