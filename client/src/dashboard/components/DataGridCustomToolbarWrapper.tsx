import React from "react";
import { GridToolbarProps } from "@mui/x-data-grid";
import DataGridCustomToolbar from "./DataGridCustomToolbar";
interface DataGridCustomToolbarProps extends GridToolbarProps {
  searchInput: string;
  setSearchInput: (input: string) => void;
  setSearch: (input: string) => void;
}

const DataGridCustomToolbarWrapper: React.FC<GridToolbarProps> = (props) => {
  const { searchInput, setSearchInput, setSearch } =
    props as DataGridCustomToolbarProps;

  return (
    <DataGridCustomToolbar
      searchInput={searchInput || ""}
      setSearchInput={setSearchInput || (() => {})}
      setSearch={setSearch || (() => {})}
    />
  );
};

export default DataGridCustomToolbarWrapper;
