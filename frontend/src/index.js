import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Homepage from "./pages/Homepage/Homepage";
import Draw from "./pages/Draw/Draw";
import Block from "./pages/Block/Block";
import BlockRules from "./pages/BlockRules/BlockRules";
import DrawRules from "./pages/DrawRules/DrawRules";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/draw",
    element: <Draw />,
  },
  {
    path: "/block",
    element: <Block />,
  },
  {
    path: "/rules/draw",
    element: <DrawRules />,
  },
  {
    path: "/rules/block",
    element: <BlockRules />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
