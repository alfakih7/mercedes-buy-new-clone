import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CarDetails from "./pages/CarDetails";
import ProfilePage from "./pages/ProfilePage";
import { UserProvider } from "./contexts/UserContext";
import Admin from "./Admin";
import UserProfile from "./pages/UserProfile";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

createRoot(rootElement).render(
  <BrowserRouter>
    <UserProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user/:id" element={<UserProfile />} />
        </Routes>
      </Layout>
    </UserProvider>
  </BrowserRouter>
);
