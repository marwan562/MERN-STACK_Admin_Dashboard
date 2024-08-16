import { Box } from "@mui/material";
import OverViewChaurt from "../components/OverViewChuart";
import HeadLine from "../components/ui/HeadLine";

const OverViewPage = () => {

  return (
    <Box m="1.5rem 2.5rem">
      <HeadLine
        title="OVERVIEW"
        subtitle="Overview of general revenue and profit"
      />
      <Box height="75vh">
        
        <OverViewChaurt  />
      </Box>
    </Box>
  );
};

export default OverViewPage;
