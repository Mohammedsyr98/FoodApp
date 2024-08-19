import React, { useContext, useEffect, useState } from "react";
import { getFavoriRecipesContext } from "../../contexts/FavoriRecipes";
import { baseImageUrl } from "../../constants/EndPoints";
import noImageAvailable from "../../assets/No_Image_Available.jpg";
import { toast } from "react-toastify";
import NoData from "../Shared/components/NoData/NoData";
export default function Favorites() {
  const {
    favoriRecipesList,
    getFavoriRecipe,
    removeRecipeFromFavorite,
    isloading,
  } = useContext(getFavoriRecipesContext);
  console.log;
  const [buttonState, SetButtonState] = useState(false);
  useEffect(() => {
    getFavoriRecipe();
  }, []);
  const notify = (message) => toast(message);
  favoriRecipesList.map((ele) => ele.recipe.imagePath);

  return (
    <>
      {isloading ? (
        <div className="favori-recipe-loader loader"></div>
      ) : (
        <div className="row my-5 favori-recipe">
          {favoriRecipesList.length > 0 ? (
            favoriRecipesList.map((recipe) => (
              <div className="col-12 col-md-4 my-5" key={recipe.id}>
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    className="card-img-top"
                    src={
                      recipe.recipe.imagePath
                        ? `${baseImageUrl}/${recipe.recipe.imagePath}`
                        : noImageAvailable
                    }
                    alt="recipe image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.recipe.name}</h5>
                    <p className="card-text">{recipe.recipe.description}</p>
                    <div className="w-100 text-center">
                      <button
                        disabled={isloading}
                        onClick={() => removeRecipeFromFavorite(recipe.id)}
                        className="confirm-delete text-center m-0 ">
                        {/* {isloading ? (
                    <div className=" loader"></div>
                  ) : (
                    "Remove From Favorite"
                  )} */}
                        Remove From Favorite
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NoData />
          )}
        </div>
      )}
    </>
  );
}
