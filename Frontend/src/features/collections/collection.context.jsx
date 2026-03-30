import { useState } from "react";
import { createContext } from "react";

export const CollectionContext = createContext();

export const CollectionProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  return (
    <CollectionContext.Provider
      value={{
        loading,
        setLoading,
        collections,
        setCollections,
        hasFetched,
        setHasFetched,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};
