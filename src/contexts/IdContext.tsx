import React, { createContext, useState, useContext } from "react";

type IdContextType = {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
};

const IDContext = createContext<IdContextType | undefined>(undefined);

export const IDProvider = ({ children }: { children: React.ReactNode }) => {
  const [id, setId] = useState("");
  return <IDContext.Provider value={{ id, setId }}>{children}</IDContext.Provider>;
};

export const useID = () => {
  const context = useContext(IDContext);
  if (!context) throw new Error("useInfo must be used within an InfoProvider");
  return context;
};
