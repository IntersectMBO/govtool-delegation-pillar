import { TypographyProps as MUITypographyProps } from '@mui/material';
export type TypographyProps = Pick<MUITypographyProps, 'color' | 'lineHeight' | 'sx' | 'component'> & {
    children?: React.ReactNode;
    fontSize?: number;
    fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    variant?: 'headline1' | 'headline2' | 'headline3' | 'headline4' | 'headline5' | 'title1' | 'title2' | 'body1' | 'body2' | 'caption';
};
export declare const Typography: ({ color, variant, ...props }: TypographyProps) => import("react/jsx-runtime").JSX.Element;
