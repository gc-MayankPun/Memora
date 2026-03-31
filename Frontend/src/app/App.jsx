import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { Bounce, ToastContainer } from "react-toastify";
import { ThemeProvider } from "./theme.context";
import { AuthProvider } from "../features/auth/auth.context";
import { SavesProvider } from "../features/saves/saves.context";
import { CollectionProvider } from "../features/collections/collection.context";
import AppGate from "./AppGate";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SavesProvider>
          <CollectionProvider>
            <AppGate>
              <RouterProvider router={router} />
            </AppGate>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />
          </CollectionProvider>
        </SavesProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
