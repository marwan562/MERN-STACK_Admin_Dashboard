import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import DashboardPage from "../dashboard/pages/DashboardPage";
import ProductsPage from "../dashboard/pages/ProductsPage";
import CustomersPage from "../dashboard/pages/CustomersPage";
import TransactionsPage from "../dashboard/pages/TransactionsPage";
import GeographyPage from "../dashboard/pages/GeographyPage";
import OverViewPage from "../dashboard/pages/OverViewPage";
import DailySalesPage from "../dashboard/pages/DailySalesPage";
import MonthlySalesPage from "../dashboard/pages/MonthlySalesPage";
import BreakDownPage from "../dashboard/pages/BreakDownPage";
import AdminsPage from "../dashboard/pages/AdminsPage";
import PerformancePage from "../dashboard/pages/PerformancePage";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="geography" element={<GeographyPage />} />
        <Route path="overview" element={<OverViewPage />} />
        <Route path="daily" element={<DailySalesPage />} />
        <Route path="monthly" element={<MonthlySalesPage />} />
        <Route path="breakdown" element={<BreakDownPage />} />
        <Route path="admin" element={<AdminsPage />} />
        <Route path="performance" element={<PerformancePage />} />
      </Route>
      <Route path="/" element={<Navigate to={"/dashboard"} replace={true} />} />
    </Routes>
  );
};

export default AppRouter;
