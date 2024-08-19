import axios from "axios";
import { createContext, useState } from "react";
import { resipesUrls } from "../constants/EndPoints";
import { toast } from "react-toastify";

export const getFavoriRecipesContext = createContext();

export const GetFavoriRecipesProvider = ({ children }) => {
  const notify = (message) => toast(message);
  const [favoriRecipesList, setFavoriRecipesList] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [buttonState, SetButtonState] = useState(false);
  const getFavoriRecipe = async (pageSize = 9999, pageNumber = 1) => {
    try {
      let response = await axios.get(
        resipesUrls.favoriRecipe,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            pageSize,
            pageNumber,
          },
        }
      );

      setIsloading(false);
      setFavoriRecipesList(response.data.data);
    } catch (error) {
      setIsloading(false);
    }
  };
  const removeRecipeFromFavorite = async (id) => {
    setIsloading(true);
    try {
      let response = await axios.delete(
        resipesUrls.removeRecipeFromFavori(id),

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Recipe removed from Favorites");

      setIsloading(false);
      SetButtonState(false);
      setFavoriRecipesList([]);
      getFavoriRecipe();
    } catch (error) {
      setIsloading(false);
    }
  };
  return (
    <getFavoriRecipesContext.Provider
      value={{
        getFavoriRecipe,
        favoriRecipesList,
        removeRecipeFromFavorite,
        setFavoriRecipesList,
        isloading,
        setIsloading,
        buttonState,
        SetButtonState,
      }}>
      {children}
    </getFavoriRecipesContext.Provider>
  );
};
