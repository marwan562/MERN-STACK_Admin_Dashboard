import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetOverViewSalesQuery } from "../../store/Api/SalesApi";
import { ResponsiveLine } from "@nivo/line";
import HeadLine from "../components/ui/HeadLine";

const DailySalesPage = () => {
  const { data } = useGetOverViewSalesQuery();
  const [startDate, setStartDate] = useState(new Date("2021-01-01"));
  const [endDate, setEndDate] = useState(new Date("2021-12-31"));

  const dailySales = useMemo(() => {
    if (!data) return [];
    const { dailyData } = data;

    // Create a mapping of months to sales data
    const monthlySales: any = {};

    dailyData.forEach(({ date, totalSales, totalUnits }) => {
      const currentData = new Date(date);
      const monthKey = `${currentData.getFullYear()}-${
        currentData.getMonth() + 1
      }`;

      if (currentData >= startDate && currentData <= endDate) {
        if (!monthlySales[monthKey]) {
          monthlySales[monthKey] = 0;
        }
        monthlySales[monthKey] += totalSales + totalUnits;
      }
    });

    // Convert the monthlySales object into the format needed for Nivo
    const salesData = {
      id: "Daily Sales",
      color: "hsl(349, 70%, 50%)",
      data: Object.entries(monthlySales).map(([month, total]) => ({
        x: month,
        y: total,
      })),
    };

    return [salesData];
  }, [data, endDate, startDate]);

  return (
    <Box m="1.5rem 2.5rem">
      <HeadLine
        title="DAILY"
        subtitle="Overview of Daily Sales"
      />
      <Box display={"flex"} justifyContent={"end"}>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          dateFormat="yyyy/MM/dd"
        />
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => setEndDate(date)}
          dateFormat="yyyy/MM/dd"
        />
      </Box>
      <Box height="80vh">
        <ResponsiveLine
          data={dailySales}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }} // Use 'point' to handle categorical x-values
          xFormat=" >-"
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 4,
            tickPadding: 4,
            tickRotation: 0,
            legend: "Month",
            legendOffset: 36,
            legendPosition: "middle",
            format: (value) => {
              const [year, month] = value.split("-");
              return `${year}-${month.padStart(2, "0")}`;
            },
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Sales",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor", modifiers: [] }}
          pointLabel="data.y"
          pointLabelYOffset={-12}
          enableArea={true}
          areaBlendMode="darken"
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgb(231, 220, 220)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(255, 248, 248, 0.884), 0.03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default DailySalesPage;
