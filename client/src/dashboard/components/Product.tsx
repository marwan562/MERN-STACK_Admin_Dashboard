import { TProduct, TProductStats } from "../../types";
import { useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    PaletteMode
  } from "@mui/material";
import { ThemePalette } from "../../theme";

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

interface TProps {
  product: TProduct;
  stat: TProductStats;
}

const Product = ({
  product: { _id, name, description, price, rating, category, supply },
  stat,
}: TProps) => {
  const theme = useTheme() as CustomThemePalette;
  const [isExpanded, setIsExpanded] = useState(false);

  return  <Card
  sx={{
    backgroundImage: "none",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.55rem",
  }}
>
  <CardContent>
    <Typography
      sx={{ fontSize: 14 }}
      color={theme.palette.secondary[700]}
      gutterBottom
    >
      {category}
    </Typography>
    <Typography variant="h5" component="div">
      {name}
    </Typography>
    <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
      ${Number(price).toFixed(2)}
    </Typography>
    <Rating value={rating} readOnly />

    <Typography variant="body2">{description}</Typography>
  </CardContent>
  <CardActions>
    <Button
      variant="contained"
      size="small"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      See More
    </Button>
  </CardActions>
  <Collapse
    in={isExpanded}
    timeout="auto"
    unmountOnExit
    sx={{
      color: theme.palette.neutral[300],
    }}
  >
    <CardContent>
      <Typography>id: {_id}</Typography>
      <Typography>Supply Left: {supply}</Typography>
      <Typography>
        Yearly Sales This Year: {stat.yearlySalesTotal}
      </Typography>
      <Typography>
        Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
      </Typography>
    </CardContent>
  </Collapse>
</Card>;
};

export default Product;
