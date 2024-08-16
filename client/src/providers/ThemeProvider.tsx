import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";
import { useAppSelector } from "../store/hooks";
import { themeSettings } from "../theme";
import { ReactNode, useMemo } from "react";

const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
    
  const { mode } = useAppSelector((state) => state.global);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default CustomThemeProvider;
