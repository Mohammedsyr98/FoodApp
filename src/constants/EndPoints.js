const url = "https://upskilling-egypt.com:3006/api/v1";

const baseUsers = `${url}/Users`;

export const usersUrls = {
  login: `${baseUsers}/Login`,
  register: `${baseUsers}/Register`,
  delete: (id) => `${baseUsers}/${id}`,
  verify: `${baseUsers}/verify`,
  resetRequest: `${baseUsers}/Reset/Request`,
  reset: `${baseUsers}/Reset`,
};

const baseCategoriesUrl = "https://upskilling-egypt.com:3006/api/v1/Category";

export const categoriesUrls = {
  getCategory: baseCategoriesUrl,
  getCategoryById: (id) => `${baseCategoriesUrl}/${id}`,

  delete: (id) => `${baseCategoriesUrl}/${id}`,
};
const baseRecipesUrl = "https://upskilling-egypt.com:3006/api/v1/Recipe";
const baseUserRecipe = "https://upskilling-egypt.com:3006/api/v1/userRecipe";
export const resipesUrls = {
  getRecipes: baseRecipesUrl,
  getRecipeById: (id) => `${baseRecipesUrl}/${id}`,
  editRecipe: (id) => `${baseRecipesUrl}/${id}`,
  delete: (id) => `${baseRecipesUrl}/${id}`,
  favoriRecipe: `${baseUserRecipe}`,
  removeRecipeFromFavori: (id) => `${baseUserRecipe}/${id}`,
};
export const baseUsersUrl = "https://upskilling-egypt.com:3006/api/v1/Users";
export const UsersUrls = {
  getUsers: baseUsersUrl,
  delete: (id) => `${baseUsersUrl}/${id}`,
};
export const baseImageUrl = "https://upskilling-egypt.com:3006";

export const getTags = `${url}/tag`;
