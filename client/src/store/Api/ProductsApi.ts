import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TProductWithStats, TResponseTransaction } from "../../types";

// Request parameters type for transactions
type TPropsTransaction = {
  page: number;
  pageSize: number;
  sort: string; // Ensure this is the correct format expected by the backend
  search: string;
};

// Define API using createApi
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    // Endpoint to fetch products with stats
    getProducts: builder.query<TProductWithStats[], void>({
      query: () => `/client/products`,
    }),

    // Endpoint to fetch transactions with pagination, sorting, and search
    getTransactions: builder.query<TResponseTransaction, TPropsTransaction>({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetProductsQuery, useGetTransactionsQuery } = productApi;
