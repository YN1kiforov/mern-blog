import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home"
import Post from './pages/FullPost/FullPost';
import CreatePost from './pages/CreatePost/CreatePost';
import Login from './pages/Login/Login';
import Posts from './pages/Posts/Posts';
import Register from './pages/Register/Register';
import User from './pages/User/User';
import SideBar from './components/SideBar/SideBar';
import { AuthContextProvider } from './Auth';

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

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
        element: <User />,
      },
      {
        path: "/posts",
        element: <Posts />,
        children: [
          {
            path: "/posts/:category",
          }
        ]
      },
      {
        path: "/create-post",
        element: <CreatePost />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>

  </React.StrictMode>
);
