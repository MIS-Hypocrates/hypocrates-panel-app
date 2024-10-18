'use client'

import {createTheme} from "@mui/material";
import {blue, red} from "@mui/material/colors";
import {ruRU} from "@mui/material/locale";

export const AppTheme = createTheme({
    palette: {
        primary: {
            main: blue["700"],
            light: '#5F33FF',
            dark: '#2600B2',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: red[500],
            light: '#FF3737',
            dark: '#B20303',
            // contrastText: '#FFFFFF',
        },
    },
}, ruRU);
