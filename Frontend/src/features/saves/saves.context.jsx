import { createContext, useState } from "react";

export const SaveContext = createContext(null);

export const SavesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [save, setSave] = useState({
    thumbnail: "",
    isFavorite: false,
    summary: "",
    topics: [],
    tags: [],
  });

  return (
    <SaveContext.Provider value={{ loading, setLoading, save, setSave }}>
      {children}
    </SaveContext.Provider>
  );
};
