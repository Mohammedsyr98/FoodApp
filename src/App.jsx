import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./modules/Authentication/component/Login/Login";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import Register from "./modules/Authentication/component/Register/Register";
import ResetPass from "./modules/Authentication/component/ResetPass/ResetPass";
import RequestResetPass from "./modules/Authentication/component/RequestResetPass/RequestResetPass";
import NotFound from "./modules/NotFound/components/NotFound";
import CategoriesList from "./modules/Categories/component/CategoriesList";
import RecipesList from "./modules/Recipes/component/RecipesList";
import UserList from "./modules/Users/components/UsersList";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import Home from "./modules/Home/components/Home";
import { ToastContainer } from "react-toastify";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "requestResetPass", element: <RequestResetPass /> },
        { path: "resetpass", element: <ResetPass /> },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "categoriesList", element: <CategoriesList /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "users", element: <UserList /> },
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
