import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CarDetails from "./pages/CarDetails";
import Admin from "./Admin";
import UserProfile from "./pages/UserProfile";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

createRoot(rootElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/user/:id" element={<UserProfile />} />
      <Route path="/" element={
        <Layout>
          <HomePage />
        </Layout>
      } />
      <Route path="/car/:id" element={
        <Layout>
          <CarDetails />
        </Layout>
      } />
    </Routes>
  </BrowserRouter>
);
