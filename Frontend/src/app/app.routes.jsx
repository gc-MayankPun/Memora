import Dashboard from "../features/dashboard/pages/Dashboard";
import Protected from "../features/auth/components/Protected";
import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Saves from "../features/saves/pages/Saves";
import Graph from "../features/graph/pages/Graph";
import Login from "../features/auth/pages/Login";
import VerifyEmail from "../features/auth/pages/VerifyEmail";
import Collections from "../features/collections/pages/Collections";
import CollectionDetail from "../features/collections/pages/CollectionDetail";
import Guest from "../features/auth/components/Guest";
import VerifyEmailGuard from "../features/auth/components/VerifyEmailGuard";
import ErrorPage from "./pages/ErrorPage"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        {/* <DashboardProvider> */}
          <Dashboard />
        {/* </DashboardProvider> */}
      </Protected>
    ),
    errorElement: <ErrorPage />, 
  },
  {
    path: "/login",
    element: (
      <Guest>
        <Login />
      </Guest>
    ),
  },
  {
    path: "/register",
    element: (
      <Guest>
        <Register />
      </Guest>
    ),
  },

  {
    path: "/verify-email",
    element: (
      <VerifyEmailGuard>
        <VerifyEmail />
      </VerifyEmailGuard>
    ),
  }, 
  {
    path: "/saves/:saveId",
    element: (
      <Protected>
        <Saves />
      </Protected>
    ),
  },
  {
    path: "/graph",
    element: (
      <Protected>
        <Graph />
      </Protected>
    ),
  },
  {
    path: "/collections",
    element: (
      <Protected>
        <Collections />
      </Protected>
    ),
  },

  {
    path: "/collections/:collectionId",
    element: (
      <Protected>
        <CollectionDetail />
      </Protected>
    ),
  },
]);
