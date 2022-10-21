import React, { Suspense } from 'react';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home"
import Post from './pages/FullPost/FullPost';
import Posts from './pages/Posts/Posts';
import Loader from './components/Loader/Loader'
import SideBar from './components/SideBar/SideBar';
import { AuthContextProvider } from './AuthContext';
import { SnackbarProvider } from 'notistack';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
const User = React.lazy(() => import('./pages/User/User'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const CreatePost = React.lazy(() => import('./pages/CreatePost/CreatePost'));


const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <SideBar />
      <Footer />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Post />,
      },
      {
        path: "/user/:id",
        element: <Suspense fallback={<Loader />}>
          <User />
        </Suspense>,
      },

      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/create-post",
        element: <Suspense fallback={<Loader />}>
          <CreatePost />
        </Suspense>,
      },
    ],
  },
  {
    path: "/register",
    element: <Suspense fallback={<Loader />}>
      <Register />
    </Suspense>,

  },
  {
    path: "/login",
    element:
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>,
  },
]);
const App = () => {
  return (
    <div className="app">
      <SnackbarProvider maxSnack={3}>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;

















//import Loader from "../../components/Loader/Loader"
//<Loader></Loader>
