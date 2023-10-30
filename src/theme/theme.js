import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        primary: {
            main: '#8E2C96',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#d3cdd6',
            paper: '#5B4596',
        },
        text: {
            main: '#ffffff',
            secondary: '#000000',
        }
    },
});

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#1B1B99',
        },
        secondary: {
            main: '#0D0D47',
        },
        background: {
            default: '#052547',
            paper: '#1E2747',
        },
        text:  {
            main: '#326c8a',
            secondary: '#ffffff',
        }
    },
});

