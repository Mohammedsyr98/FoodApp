import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import { baseImageUrl, resipesUrls } from "../../../../constants/EndPoints";
import { getRecipeInformationContext } from "../../../../contexts/EditRecipeContext";
import axios from "axios";
import { toast } from "react-toastify";
import { getFavoriRecipesContext } from "../../../../contexts/FavoriRecipes";
import { jwtDecode } from "jwt-decode";

export default function ViewRecipeModal({
  showViewModal,
  handleCloseViewModal,
}) {
  const { selectedRecipe } = useContext(getRecipeInformationContext);
  const {
    favoriRecipesList,
    getFavoriRecipe,
    removeRecipeFromFavorite,
    isloading,
    setIsloading,
    buttonState,
    SetButtonState,
  } = useContext(getFavoriRecipesContext);

  const [recipeIsFavorite, setRecipeIsFavorite] = useState(false);
  const [favoriRecipeId, setFavoriRecipeId] = useState(null); // Store the ID of the favorite recipe
  const UserInformation = jwtDecode(localStorage.getItem("token"));

  const addRecipeToFavori = async () => {
    setIsloading(true);
    try {
      await axios.post(
        resipesUrls.favoriRecipe,
        { recipeId: selectedRecipe.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Recipe added to Favorites");
      getFavoriRecipe();
      SetButtonState(true);
    } catch (error) {
      toast.error("Failed to add recipe to Favorites");
    } finally {
      setIsloading(false);
    }
  };

  const removeRecipeFromFavori = async () => {
    if (favoriRecipeId) {
      setIsloading(true);
      try {
        await axios.delete(`${resipesUrls.favoriRecipe}/${favoriRecipeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Recipe removed from Favorites");
        getFavoriRecipe();
        SetButtonState(false);
      } catch (error) {
        toast.error("Failed to remove recipe from Favorites");
      } finally {
        setIsloading(false);
      }
    }
  };

  useEffect(() => {
    if (selectedRecipe) {
      getFavoriRecipe();
    }
  }, [selectedRecipe]);

  useEffect(() => {
    if (selectedRecipe) {
      const isFavorite = favoriRecipesList?.some(
        (recipe) => recipe.recipe.id === selectedRecipe.id
      );
      setRecipeIsFavorite(isFavorite);

      // Find the favorite recipe ID if it exists
      const favoriteRecipe = favoriRecipesList.find(
        (recipe) => recipe.recipe.id === selectedRecipe.id
      );
      setFavoriRecipeId(favoriteRecipe ? favoriteRecipe.id : null);
      console.log(favoriteRecipe?.id);
    }
  }, [favoriRecipesList, selectedRecipe]);

  const handleClose = () => {
    handleCloseViewModal();
    setRecipeIsFavorite(false); // Reset favorite status
  };

  return (
    <Modal className="recipe-details" show={showViewModal} onHide={handleClose}>
      {!isloading ? (
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center flex-row-reverse">
            <span className="confirm-add-title">Recipe details</span>
          </div>
          <span className="text-center my-3">
            {selectedRecipe.imagePath ? (
              <img
                className="recipe-photo"
                src={`${baseImageUrl}/${selectedRecipe.imagePath}`}
                alt="Recipe"
              />
            ) : (
              <FaRegUserCircle className="anony-user" />
            )}
          </span>
          <div className="user-details-content d-flex flex-column">
            <div className="title">
              <span className="head">Recipe Name :</span>{" "}
              <span>{selectedRecipe.name}</span>
            </div>
            <div className="title">
              <span className="head">Description :</span>{" "}
              <span>{selectedRecipe.description}</span>
            </div>
            <div className="title">
              <span className="head">Price :</span>{" "}
              <span>{selectedRecipe.price}</span>
            </div>
          </div>
          <div className="align-self-end">
            {UserInformation.userGroup !== "SuperAdmin" ? (
              <>
                {recipeIsFavorite ? (
                  <button
                    disabled={isloading}
                    onClick={() => removeRecipeFromFavori(favoriRecipeId)}
                    className="confirm-delete align-self-end">
                    {isloading ? (
                      <div className="loader"></div>
                    ) : (
                      "Remove From Favorite"
                    )}
                  </button>
                ) : (
                  <button
                    onClick={addRecipeToFavori}
                    disabled={isloading}
                    className="add-favorite align-self-end">
                    {isloading ? (
                      <div className="loader"></div>
                    ) : (
                      "Add To Favorite"
                    )}
                  </button>
                )}
                <button onClick={handleClose} className="confirm-delete">
                  Close
                </button>
              </>
            ) : (
              <button onClick={handleClose} className="confirm-delete">
                Close
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </Modal>
  );
}
