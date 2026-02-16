import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App";

const root = document.getElementById("root");
if (!root) throw new Error("No root element");
createRoot(root).render(<App />);

// createRoot(document.getElementById("root")!).render(
//   <div style={{ color: "red" }}>HELLO!</div>,
// );

console.log("Index loaded");
