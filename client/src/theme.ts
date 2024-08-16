import { PaletteMode } from "@mui/material";
import { TypographyOptions } from '@mui/material/styles/createTypography';

// Color token types
interface ColorPalette {
  [key: string]: string;
}

interface ColorTokens {
  grey: ColorPalette;
  primary: ColorPalette;
  secondary: ColorPalette;
}

export interface ThemePalette {
  mode: PaletteMode;
  primary: {
    [key: string]: string;
    main: string;
    light: string;
  };
  secondary: {
    [key: string]: string;
    main: string;
    light?: string; // Optional for light
  };
  neutral: {
    [key: string]: string;
    main: string;
  };
  background: {
    default: string;
    alt: string;
  };
}

// Define the color tokens
export const tokensDark: ColorTokens = {
  grey: {
    0: "#ffffff",  // White for text on dark backgrounds
    10: "#f6f6f6",
    50: "#e0e0e0", 
    100: "#c2c2c2",
    200: "#a3a3a3",
    300: "#858585", 
    400: "#666666",
    500: "#525252",
    600: "#3d3d3d",
    700: "#292929", // Darker grey for UI elements
    800: "#141414", // Deep black for background
    900: "#000000", // Pure black
  },
  primary: {
    100: "#ffffff", // Bright text color
    200: "#b0bec5",
    300: "#78909c", 
    400: "#455a64", 
    500: "#1c313a", 
    600: "#102027", // Darker primary for backgrounds
    700: "#0a1a1f", 
    800: "#040e12", 
    900: "#000000", // Pure black
  },
  secondary: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee", 
    300: "#e0e0e0",
    400: "#bdbdbd", 
    500: "#9e9e9e", 
    600: "#757575", 
    700: "#616161", 
    800: "#424242", 
    900: "#212121", // Dark secondary for elements
  },
};

// Function to reverse color tokens
function reverseTokens(tokens: ColorTokens): ColorTokens {
  const reversedTokens: ColorTokens = {
    grey: {},
    primary: {},
    secondary: {},
  };

  Object.entries(tokens).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj: ColorPalette = {};

    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }

    reversedTokens[key as keyof ColorTokens] = reversedObj;
  });

  return reversedTokens;
}

export const tokensLight = reverseTokens(tokensDark);

// MUI theme settings interface
export const themeSettings = (mode: PaletteMode): { palette: ThemePalette; typography: TypographyOptions } => {
  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[600],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[300],
            },
            background: {
              default: tokensDark.grey[900],
              alt: tokensDark.grey[800],
            },
          }
        :  {
          primary: {
            ...tokensLight.primary,
            main: tokensDark.grey[50],
            light: tokensDark.grey[100],
          },
          secondary: {
            ...tokensLight.secondary,
            main: tokensDark.secondary[600],
            light: tokensDark.secondary[700],
          },
          neutral: {
            ...tokensLight.grey,
            main: tokensDark.grey[500],
          },
          background: {
            default: tokensDark.grey[0],
            alt: tokensDark.grey[50],
          },
        }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};