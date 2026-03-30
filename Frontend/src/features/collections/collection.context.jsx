import { useState } from "react";
import { createContext } from "react";

export const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);

  return (
    <CollectionContext.Provider
      value={{ loading, setLoading, collections, setCollections }}
    >
      {children}
    </CollectionContext.Provider>
  );
};
