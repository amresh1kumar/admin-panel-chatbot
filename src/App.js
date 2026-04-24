import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import Leads from "./pages/Leads";
import ConnectAccount from "./pages/ConnectAccount";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BotMessage from "./pages/BotMessage";
import BotMenu from "./pages/BotMenu";

import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={token ? <Layout /> : <Navigate to="/login" />}
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/create-account" element={<ConnectAccount />} />
          <Route path="/bot-messages" element={<BotMessage />} />
          <Route path="/bot-menus" element={<BotMenu/>} />
          
        </Route>

        {/* Default */}
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;