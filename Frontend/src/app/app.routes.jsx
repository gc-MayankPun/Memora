import { DashboardProvider } from "../features/dashboard/dashboard.context";
import { SavesProvider } from "../features/saves/saves.context";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Protected from "../features/auth/components/Protected";
import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Saves from "../features/saves/pages/Saves";
import Graph from "../features/graph/pages/Graph";
import Login from "../features/auth/pages/Login";
import VerifyEmail from "../features/auth/pages/VerifyEmail";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <DashboardProvider>
          <Dashboard />
        </DashboardProvider>
      </Protected>
    ),
  },
  {
    path: "/saves/:id",
    element: (
      <Protected>
        <SavesProvider>
          <Saves />
        </SavesProvider>
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
]);
