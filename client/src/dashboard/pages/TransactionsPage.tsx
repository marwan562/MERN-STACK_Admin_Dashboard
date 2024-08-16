import { useState } from "react";
import { Box, PaletteMode, useTheme } from "@mui/material";
import { DataGrid, GridSortModel } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "../../store/Api/ProductsApi";
import HeadLine from "../components/ui/HeadLine";
import DataGridCustomToolbarWrapper from "../components/DataGridCustomToolbarWrapper";
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

const Transactions = () => {
  const theme = useTheme() as CustomThemePalette

  // State values to be sent to the backend
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState<GridSortModel>([]);
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");

  // Fetch transactions data based on the current state
  const { data, isLoading } = useGetTransactionsQuery({
    page: page, // Convert to zero-based index
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  // Define columns for the DataGrid
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];
  console.log(page);
  return (
    <Box m="1.5rem 2.5rem">
      <HeadLine title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.pagination.totalItems) || 0}
          pageSizeOptions={[20, 50, 100]}
          pagination
          initialState={{
            pagination: {
              paginationModel: { pageSize, page },
            },
          }}
          paginationMode="server"
          sortingMode="server"
          onPaginationModelChange={(value) => {
            setPage(value.page + 1);
            setPageSize(value.pageSize);
          }}
          onSortModelChange={(newSortModel) => setSort(newSortModel)}
          slots={{ toolbar: DataGridCustomToolbarWrapper }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
