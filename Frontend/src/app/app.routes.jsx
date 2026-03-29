import { createBrowserRouter } from "react-router";
import Dashboard from "../features/dashboard/pages/Dashboard";
import Saves from "../features/saves/pages/Saves";
import Graph from "../features/graph/pages/Graph";
import { DashboardProvider } from "../features/dashboard/dashboard.context";
import { SavesProvider } from "../features/saves/saves.context";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    ),
  },
  {
    path: "/saves/:id",
    element: (
      <SavesProvider>
        <Saves />
      </SavesProvider>
    ),
  },
  {
    path: "/graph",
    element: <Graph />,
  },
]);
