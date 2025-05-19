interface CustomPalette {
    accentOrange: string;
    accentYellow: string;
    arcticWhite: string;
    boxShadow1: string;
    boxShadow2: string;
    errorRed: string;
    fadedPurple: string;
    highlightBlue: string;
    inputRed: string;
    lightBlue: string;
    lightOrange: string;
    negativeRed: string;
    neutralGray: string;
    neutralWhite: string;
    orangeDark: string;
    positiveGreen: string;
    primaryBlue: string;
    secondaryBlue: string;
    specialCyan: string;
    specialCyanBorder: string;
    textBlack: string;
    textGray: string;
}
declare module '@mui/material/styles' {
    interface Palette extends CustomPalette {
    }
    interface PaletteOptions extends CustomPalette {
    }
}
declare const theme: import('@mui/material/styles').Theme;
export default theme;
