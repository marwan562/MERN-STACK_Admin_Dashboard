import { Search } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarProps,
} from "@mui/x-data-grid";
import FlexBetween from "./ui/FlexBetween";

interface DataGridCustomToolbarProps extends GridToolbarProps {
  searchInput: string;
  setSearchInput: (input: string) => void;
  setSearch: (input: string) => void;
}

const DataGridCustomToolbar= ({
  searchInput,
  setSearchInput,
  setSearch,
}:DataGridCustomToolbarProps) => {
  const handleSearchClick = () => {
    if (searchInput.trim()) {
      setSearch(searchInput);
      setSearchInput(""); // Clear search input after submission
    }
  };

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label="Search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearchClick}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
