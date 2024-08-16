import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResOverView } from "../../types";

export const salesApi = createApi({
  reducerPath: "salesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}` }),
  endpoints: (builder) => ({
    getOverViewSales: builder.query<IResOverView, void>({
      query: () => `/sales`,
    }),
  }),
});

export const { useGetOverViewSalesQuery } = salesApi;
