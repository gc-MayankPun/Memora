import { createContext, useState } from "react";

export const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [saves, setSaves] = useState([]);

  return (
    <DashboardContext.Provider value={{ loading, setLoading, saves, setSaves }}>
      {children}
    </DashboardContext.Provider>
  );
};
