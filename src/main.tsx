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
import GargashAgents from "./pages/GargashAgents";
import ConversationsPage from "./pages/ConversationsPage";
import AgentConversation from "./pages/AgentConversation";

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
          <Route path="/gargash-agents" element={<GargashAgents />} />
          <Route path="/conversations" element={<ConversationsPage />} />
          <Route path="/agent-conversation/:agentId" element={<AgentConversation />} />
        </Routes>
      </Layout>
    </UserProvider>
  </BrowserRouter>
);
