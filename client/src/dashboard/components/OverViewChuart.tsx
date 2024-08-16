import { PaletteMode, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { ThemePalette } from "../../theme";
import { useGetOverViewSalesQuery } from "../../store/Api/SalesApi";
import { useMemo } from "react";

interface CustomPaletteColor {
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
  isDashboard?: boolean;
};

const OverViewChart = ({ isDashboard = false }: TProps) => {
  const { data, isLoading } = useGetOverViewSalesQuery();
  const theme = useTheme() as CustomThemePalette;

  const [totalSalesOverView] = useMemo(() => {
    if (!data) return [[{ id: "", color: "", data: [] }]];

    const { monthlyData } = data;

    const totalSalesLine = {
      id: "Total Sales",
      color: theme.palette.secondary.main,
      data: [] as { x: string; y: number }[],
    };

    const totalUnitsLine = {
      id: "Total Units",
      color: theme.palette.secondary.dark,
      data: [] as { x: string; y: number }[],
    };

    let salesAccumulated = 0;
    let unitsAccumulated = 0;

    monthlyData.forEach(({ month, totalSales, totalUnits }) => {
      salesAccumulated += totalSales;
      unitsAccumulated += totalUnits;

      totalSalesLine.data.push({ x: month, y: salesAccumulated });
      totalUnitsLine.data.push({ x: month, y: unitsAccumulated });
    });

    return [[totalSalesLine, totalUnitsLine]];
  }, [data, theme.palette.secondary.main, theme.palette.secondary.dark]);

  if (isLoading) return "Loading...";

  return (
    <ResponsiveLine
      data={totalSalesOverView}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary.light,
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary.light,
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary.light,
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary.light,
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary.light,
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => (isDashboard ? v.slice(0, 3) : v),
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : "Total Revenue for Year",
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(255, 255, 255, 0.5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(255, 246, 246, 0.938)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverViewChart;
