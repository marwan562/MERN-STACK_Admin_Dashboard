// types.ts

// User Types
export type TUser = {
  _id: string;
  city: string;
  country: string;
  email: string;
  name: string;
  occupation: string;
  phoneNumber: string;
  role: "user" | "admin" | "superadmin";
  state: string | null;
  transactions: TTransaction[];
  createdAt: Date;
  updatedAt: Date;
};

// Product Types
export type TProduct = {
  _id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  supply: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TMonthlyData = {
  _id: string;
  month: string;
  totalSales: number;
  totalUnits: number;
};

export type TDailyData = {
  _id: string;
  date: string;
  totalSales: number;
  totalUnits: number;
};

export type TProductStats = {
  _id: string;
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  monthlyData: TMonthlyData[];
  dailyData: TDailyData;
};

export type TProductWithStats = {
  product: TProduct;
  stat: TProductStats;
};

// Transaction Types
export type TTransaction = {
  _id: string;
  userId: string;
  cost: number;
  products: string[];
};

export type TResponseTransaction = {
  transactions: TTransaction[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
};

// Overview Types
export interface IResOverView {
  _id: string;
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: LyDatum[];
  dailyData: LyDatum[];
  salesByCategory: SalesByCategory;
  createdAt: Date;
  updatedAt: Date;
}

export interface LyDatum {
  date?: Date;
  totalSales: number;
  totalUnits: number;
  _id: string;
  month?: string;
}

export interface SalesByCategory {
  shoes: number;
  clothing: number;
  accessories: number;
  misc: number;
}

// Admin Dashboard Types
export interface TAdminDashboard {
  totalCustomers: number;
  yearlyTotalSoldUnits: number;
  yearlySalesTotal: number;
  monthlyData: ThisMonthStats[];
  salesByCategory: SalesByCategory;
  thisMonthStats: ThisMonthStats;
  todayStats: ThisMonthStats;
  transactions: Transaction[];
}

export interface ThisMonthStats {
  month?: string;
  totalSales: number;
  totalUnits: number;
  _id: string;
  date?: Date;
}

export interface Transaction {
  _id: string;
  userId: string;
  cost: number;
  products: string[];
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}
