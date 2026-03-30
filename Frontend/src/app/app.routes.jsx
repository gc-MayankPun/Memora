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
import { CollectionProvider } from "../features/collections/collection.context";
import Collections from "../features/collections/pages/Collections";
import CollectionDetail from "../features/collections/pages/CollectionDetail";

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
          <CollectionProvider>
            <Saves />
          </CollectionProvider>
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
  {
    path: "/collections",
    element: (
      <Protected>
        <CollectionProvider>
          <Collections />
        </CollectionProvider>
      </Protected>
    ),
  },

  {
  path: "/collections/:id",
  element: (
    <Protected>
      <CollectionProvider>
        <CollectionDetail />
      </CollectionProvider>
    </Protected>
  ),
},
]);
