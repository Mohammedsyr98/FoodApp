import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./modules/Authentication/component/Login/Login";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import Register from "./modules/Authentication/component/Register/Register";
import ResetPass from "./modules/Authentication/component/ResetPass/ResetPass";
import RequestResetPass from "./modules/Authentication/component/RequestResetPass/RequestResetPass";
import NotFound from "./modules/Shared/components/NotFound/NotFound";
import CategoriesList from "./modules/Categories/component/CategoriesList";
import RecipesList from "./modules/Recipes/component/RecipesList";
import UserList from "./modules/Users/components/UsersList";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import Home from "./modules/Home/components/Home";
import { ToastContainer } from "react-toastify";
import ProtectComponent from "./modules/Shared/components/ProtectComponent/ProtectComponent";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AddRecipe from "./modules/Add Recipe/AddRecipe";
import { GetAllCategoriesProvider } from "./contexts/getAllCategories";
import { GetAllTagsProvider } from "./contexts/getAllTags";
import { PaginationProvider } from "./contexts/Pagination";
import Verify from "./modules/Authentication/component/VerifyAccount/Verify";

function App() {
  const [userInformation, setUserInformation] = useState(null);

  const loginInformation = (response) => {
    console.log(response);
    localStorage.setItem("token", response.data.token);

    const decoded = jwtDecode(
      response.data.token || localStorage.getItem("token")
    );
    setUserInformation(decoded);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserInformation(decoded);
    }
  }, []);
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login loginInformation={loginInformation} /> },
        {
          path: "login",
          element: <Login loginInformation={loginInformation} />,
        },
        { path: "register", element: <Register /> },
        { path: "request-reset-passwword", element: <RequestResetPass /> },
        { path: "reset-passwword", element: <ResetPass /> },
        { path: "verify", element: <Verify /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectComponent userInformation={userInformation}>
          <MasterLayout userInformation={userInformation} />{" "}
        </ProtectComponent>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home userInformation={userInformation} /> },
        { path: "home", element: <Home /> },
        {
          path: "categoriesList",
          element: (
            <PaginationProvider>
              <GetAllCategoriesProvider>
                <CategoriesList />
              </GetAllCategoriesProvider>
            </PaginationProvider>
          ),
        },
        {
          path: "recipes",
          element: (
            <PaginationProvider>
              <GetAllCategoriesProvider>
                <GetAllTagsProvider>
                  <RecipesList />
                </GetAllTagsProvider>{" "}
              </GetAllCategoriesProvider>
            </PaginationProvider>
          ),
        },
        {
          path: "users",
          element: (
            <PaginationProvider>
              <UserList />
            </PaginationProvider>
          ),
        },
        {
          path: "add-recipe",
          element: (
            <PaginationProvider>
              <GetAllCategoriesProvider>
                <GetAllTagsProvider>
                  <AddRecipe />
                </GetAllTagsProvider>
              </GetAllCategoriesProvider>
            </PaginationProvider>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer theme="colored" />

      <RouterProvider router={routes} />
    </>
  );
}

export default App;
