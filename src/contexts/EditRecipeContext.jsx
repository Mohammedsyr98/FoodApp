import { createContext, useState } from "react";

export const getRecipeInformationContext = createContext();

export const GetRecipeInformationProvider = ({ children }) => {
  const [selectedRecipe, setSelectedRecipe] = useState([]);

  return (
    <getRecipeInformationContext.Provider
      value={{ selectedRecipe, setSelectedRecipe }}>
      {children}
    </getRecipeInformationContext.Provider>
  );
};
