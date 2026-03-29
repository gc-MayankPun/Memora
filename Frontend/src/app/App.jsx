import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { Bounce, ToastContainer } from "react-toastify";
import { ThemeProvider } from "./theme.context";

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
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
    </ThemeProvider>
  );
};

export default App;
