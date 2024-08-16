import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  PaletteMode,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FlexBetween from "../components/ui/FlexBetween";
import HeadLine from "../components/ui/HeadLine";
import { useGetOverViewSalesQuery } from "../../store/Api/SalesApi";
import { ResponsiveLine } from "@nivo/line";
import { ThemePalette } from "../../theme";

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

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getMonthIndex = (monthName?: string) =>
  monthName ? MONTHS.indexOf(monthName) : -1;

const getNameMonth = (date: Date) => {
  return date.toLocaleString("default", { month: "long" });
};

const isMonthInRange = (
  month: string | undefined,
  startMonth: string,
  endMonth: string
) => {
  const monthIndex = getMonthIndex(month);
  const startMonthIndex = getMonthIndex(startMonth);
  const endMonthIndex = getMonthIndex(endMonth);

  return monthIndex >= startMonthIndex && monthIndex <= endMonthIndex;
};

const MonthlySalesPage = () => {
  const { data } = useGetOverViewSalesQuery();
  const [view, setView] = useState<"units" | "sales">("units");
  const [startDate, setStartDate] = useState(new Date("2024-01-01"));
  const [endDate, setEndDate] = useState(new Date("2024-12-01"));

  const theme = useTheme() as CustomThemePalette;

  const startMonth = getNameMonth(startDate);
  const endMonth = getNameMonth(endDate);

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [[], []];

    const { monthlyData } = data;

    const totalSalesLine = {
      id: "Total Sales",
      color: theme.palette.primary.main,
      data: [] as { x: string; y: number }[],
    };

    const totalUnitsLine = {
      id: "Total Units",
      color: theme.palette.secondary.main,
      data: [] as { x: string; y: number }[],
    };

    monthlyData.forEach(({ month, totalSales, totalUnits }) => {
      if (isMonthInRange(month, startMonth, endMonth)) {
        const targetLine = view === "sales" ? totalSalesLine : totalUnitsLine;
        targetLine.data.push({
          x: month,
          y: view === "sales" ? totalSales : totalUnits,
        });
      }
    });

    return [[totalSalesLine], [totalUnitsLine]];
  }, [
    data,
    view,
    startMonth,
    endMonth,
    theme.palette.primary.main,
    theme.palette.secondary.main,
  ]);

  return (
    <Box m="1.5rem 2.5rem">
      <HeadLine title="MONTHLY" subtitle="Overview of Monthly Sales" />
      <FlexBetween>
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value as "units" | "sales")}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <FlexBetween>
          <DatePicker
            selected={startDate}
            endDate={endDate}
            onChange={(date) => date && setStartDate(date)}
            showMonthYearPicker
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => date && setEndDate(date)}
            startDate={startDate}
            minDate={startDate}
            showMonthYearPicker
          />
        </FlexBetween>
      </FlexBetween>

      <Box height="80vh">
        <ResponsiveLine
          data={view === "sales" ? totalSalesLine : totalUnitsLine}
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
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Monthly",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: `Total ${view === "sales" ? "Revenue" : "Units"}`,
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
        />
      </Box>
    </Box>
  );
};

export default MonthlySalesPage;
