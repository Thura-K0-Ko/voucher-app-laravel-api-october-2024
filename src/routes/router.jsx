import { createBrowserRouter } from "react-router-dom";

import { lazy } from "react";
// import { NotFoundPage } from "../pages/NotFoundPage";

const Layout = lazy(() => import("../components/Layout"));
const ProductPage = lazy(() => import("../pages/ProductPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const SalePage = lazy(() => import("../pages/SalePage"));
const VoucherPage = lazy(() => import("../pages/VoucherPage"));
const CreateProductPage = lazy(() => import("../pages/CreateProductPage"));
const EditProductPage = lazy(() => import("../pages/EditProductPage"));
const VoucherDetail = lazy(() => import("../pages/VoucherDetail"));




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "/product", element: <ProductPage /> },
      { path: "/product/create", element: <CreateProductPage /> },
      { path: "/product/edit/:productId", element: <EditProductPage /> },
      { path: "/sale", element: <SalePage /> },
      { path: "/voucher", element: <VoucherPage /> },
      { path: "/voucher/detail/:id", element: <VoucherDetail /> },
      
    ],
  },
]);
export default router;
