import { Typography, Box, useTheme, PaletteMode } from "@mui/material";
import { ThemePalette } from "../../../theme";

interface CustomPaletteColor {
  [key: string]: string;
  main: string;
  light: string;
  dark: string;
}

interface CustomThemePalette {
  palette: ThemePalette;
  mode: PaletteMode;
  primary: CustomPaletteColor;
  secondary: CustomPaletteColor;
  neutral: CustomPaletteColor;
  background: {
    default: string;
    alt: string;
  };
}

type TProps = {
  title: string;
  subtitle: string;
};

const HeadLine = ({ subtitle, title }: TProps) => {
  const theme = useTheme() as CustomThemePalette;
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default HeadLine;
