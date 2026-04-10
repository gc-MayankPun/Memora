import { createContext, useState } from "react";

export const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [saves, setSaves] = useState([]);

  const resetDashboard = () => {
    setSaves([]);
  };

  return (
    <DashboardContext.Provider value={{ loading, setLoading, saves, setSaves, resetDashboard}}>
      {children}
    </DashboardContext.Provider>
  );
};
