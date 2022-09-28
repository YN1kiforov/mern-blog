import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home"
import Post from './pages/Post/Post';
import WritePost from './pages/WritePost/WritePost';
import Login from './pages/Login/Login';
import Posts from './pages/Posts/Posts';
import Register from './pages/Register/Register';
import User from './pages/User/User';


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
          children: [
            {
              path: "/posts/:category",
              element: <Posts />,
            },
            {
              path: "/posts",
              element: <Posts />,
            },
          ]
        },
        {
          path: "/write-post",
          element: <WritePost />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
