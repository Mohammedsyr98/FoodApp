import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { baseImageUrl, resipesUrls } from "../../../../constants/EndPoints";
import { FaRegUserCircle } from "react-icons/fa";
import { getRecipeInformationContext } from "../../../../contexts/EditRecipeContext";

import axios from "axios";
import { toast } from "react-toastify";
import { getFavoriRecipesContext } from "../../../../contexts/FavoriRecipes";
import { jwtDecode } from "jwt-decode";
import { GiConsoleController } from "react-icons/gi";

export default function ViewRecipeModal({
  showViewModal,
  handleCloseViewModal,
}) {
  const { selectedRecipe, setSelectedRecipe } = useContext(
    getRecipeInformationContext
  );
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
  const notify = (message) => toast(message);
  const UserInformation = jwtDecode(localStorage.getItem("token"));

  const addRecipeToFavori = async () => {
    setIsloading(true);
    try {
      let response = await axios.post(
        resipesUrls.favoriRecipe,
        { recipeId: selectedRecipe.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsloading(false);
      toast.success("Recipe added to Favorites");
      getFavoriRecipe();
      SetButtonState(true);
    } catch (error) {
      setIsloading(false);
      error;
    }
  };

  useEffect(() => {
    getFavoriRecipe();
  }, []);

  useEffect(() => {
    getFavoriRecipe();
  }, [isloading]);

  useEffect(() => {
    const isFavorite = favoriRecipesList?.map((recipe) =>
      recipe.recipe.id === selectedRecipe.id
        ? setRecipeIsFavorite(recipe.id)
        : setRecipeIsFavorite(false)
    );
  }, [favoriRecipesList]);

  return (
    <>
      <Modal
        className="recipe-details"
        show={showViewModal}
        onHide={handleCloseViewModal}>
        {!isloading ? (
          <div className="d-flex flex-column ">
            <div className="d-flex align-items-center flex-row-reverse">
              <span className="confirm-add-title">Recipe details</span>
            </div>
            <span className="text-center my-3">
              {" "}
              {selectedRecipe.imagePath ? (
                <img
                  className=" recipe-photo"
                  src={`${baseImageUrl}/${selectedRecipe.imagePath}`}
                  alt=""
                />
              ) : (
                <FaRegUserCircle className="anony-user" />
              )}
            </span>
            <div className="user-details-content d-flex flex-column ">
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
            <div className="align-self-end ">
              {UserInformation.userGroup !== "SuperAdmin" ? (
                <>
                  {buttonState ? (
                    <button
                      disabled={isloading}
                      onClick={() => {
                        removeRecipeFromFavorite(recipeIsFavorite);
                      }}
                      className="confirm-delete align-self-end">
                      {isloading ? (
                        <div className=" loader"></div>
                      ) : (
                        "Remove From Favorite"
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={addRecipeToFavori}
                      disabled={isloading}
                      className="add-fovrite align-self-end">
                      {isloading ? (
                        <div className=" loader"></div>
                      ) : (
                        "Add To Favorite"
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleCloseViewModal();
                    }}
                    className="confirm-delete ">
                    Close
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleCloseViewModal();
                  }}
                  className="confirm-delete ">
                  Close
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="loader"></div>
        )}
      </Modal>
    </>
  );
}
