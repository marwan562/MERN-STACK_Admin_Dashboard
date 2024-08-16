import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TAdminDashboard, TUser } from "../../types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}` }),
  endpoints: (builder) => ({
    getUserById: builder.query<TUser, string>({
      query: (id) => `/general/user/${id}`,
    }),
    getCustomers: builder.query<TUser, void>({
      query: () => `/client/customers`,
    }),
    getUsersCountries: builder.query<{ id: string; value: number }[], void>({
      query: () => `/client/map`,
    }),
    getAdmins: builder.query<TUser[], void>({
      query: () => `/managment/admins`,
    }),
    getUserPerformance:builder.query< TUser, string>({
      query:(id) => `/managment/performance/${id}`
    }),
    getAdminDashboard:builder.query<TAdminDashboard,void>({
      query:() => `/general/admin-dashboard`
    })
  }),
});

export const {
  useGetUserByIdQuery,
  useGetCustomersQuery,
  useGetUsersCountriesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetAdminDashboardQuery
} = userApi;
