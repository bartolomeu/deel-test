import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ContractorGetById from "./pages/contractors/getById";
import ContractorGetAll from "./pages/contractors/getAll";
import JobsUnpaid from "./pages/jobs/unpaid";
import Deposit from "./pages/deposit";
import AdminBestProfession from "./pages/admin/bestProfession";
// import AdminBestClients from "./pages/admin/bestClients";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/contractors/getById",
        element: <ContractorGetById/>
      },
      {
        path: "/contractors/getAll",
        element: <ContractorGetAll/>
      },
      {
        path: "/jobs/unpaid",
        element: <JobsUnpaid/>
      },
      {
        path: "/deposit",
        element: <Deposit/>,
      },
      {
        path: "/admin/best-profission",
        element: <AdminBestProfession/>,
      },
      // {
      //   path: "/admin/best-clients",
      //   element: <AdminBestClients/>,
      // }
    ]
  },
]);