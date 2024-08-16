import { Box } from "@mui/material";
import HeadLine from "../components/ui/HeadLine";
import { ResponsivePie } from "@nivo/pie";
import { useGetOverViewSalesQuery } from "../../store/Api/SalesApi";
import { useMemo } from "react";
import BreakdownChart from "../components/BreakdownChaurt";

const BreakDownPage = () => {
  const { data } = useGetOverViewSalesQuery();

  const [salesByCategory] = useMemo(() => {
    if (!data) return [[]];

    const salesByCategory = Object.entries(data.salesByCategory).map(
      ([category, value]) => {
        return {
          id: category,
          label: category,
          value: value,
          color: `hsl(150, 70%, 50%)`,
        };
      }
    );

    return [salesByCategory];
  }, [data]);

  return (
    <Box m="1.5rem 2.5rem">
      <HeadLine title="BREAK DOWN" subtitle="Sales By Category." />
      <Box mt="40px" height="75vh">

       <BreakdownChart/>
      
      </Box>
    </Box>
  );
};

export default BreakDownPage;
