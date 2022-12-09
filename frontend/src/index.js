import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Homepage from "./pages/Homepage/Homepage";
import Draw from "./pages/Draw/Draw";
import Block from "./pages/Block/Block";
import BlockRules from "./pages/BlockRules/BlockRules";
import DrawRules from "./pages/DrawRules/DrawRules";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import LandingPage from "./pages/LandingPage/LandingPage";
import Lobby from "./pages/Lobby/Lobby";
import Main from "./pages/Main/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
      {
        path: "/",
        element: <LandingPage/>,
      },
      {
        path: "/login",
        element: <Login private={false}/>,
      },
      {
        path: "/signup",
        element: <Signup private={false}/>,
      },
      {
        path: "/games/block",
        element: <Block private={true}/>,
      },
      {
        path: "/games/block/:lobbyId",
        element: <Lobby private={true}/>,
      },
      {
        path: "/games/block/rules",
        element: <BlockRules/>,
      },
    ],
  },
  // {
  //   path: "/login",
  //   element: <Login private={false}/>,
  // },
  // {
  //   path: "/signup",
  //   element: <Signup private={false}/>,
  // },

  // {
  //   path: "/games/block/:lobbyId",
  //   element: <Lobby private={true}/>,
  // },
  //
  // {
  //   path: "/games/draw/rules",
  //   element: <DrawRules/>,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
