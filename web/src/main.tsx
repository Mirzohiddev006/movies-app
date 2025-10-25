import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
import { Navbar } from "~/components";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes />
    <Toaster position="top-right" />
  </BrowserRouter>
);
