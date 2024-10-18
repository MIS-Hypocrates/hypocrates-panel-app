'use client'

import {Box, Button, Paper, PaperProps, styled, Typography} from "@mui/material";
import {BoxProps} from "@mui/system";

const ErrorBox = styled(Paper)<PaperProps>(({ theme }) => ({
    maxWidth: 500,
    minHeight: 400,
    margin: 'auto',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
}))

const ErrorContent = styled(Box)<BoxProps>(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
}))

export default function error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <ErrorBox>
            <ErrorContent>
                <Typography variant={"h6"} sx={{ margin: "auto" }}>{error.name}</Typography>

                <Typography variant={"body2"} sx={{ margin: "auto", marginTop: 2 }}>{error.message}</Typography>

                <Button onClick={reset} sx={{ margin: "auto", marginTop: 4 }}>Сбросить данные</Button>
            </ErrorContent>
        </ErrorBox>
    )
}