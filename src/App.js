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
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import Broadcast from "./pages/Broadcast";

import AdminProtectedRoute from "./components/AdminProtectedRoute";

import AdminDashboard from "./pages/Admin/AdminDashboard";

import AdminUsers from "./pages/Admin/Users";

import AdminTenants from "./pages/Admin/Tenants";

import AdminSubscriptions from "./pages/Admin/AdminSubscriptions";
import FollowUpSettings from "./pages/FollowUpSettings";
import CallingSettings from "./pages/CallingSettings";
import Contacts from "./pages/Contacts";
import WelcomeMessageSettings from "./pages/WelcomeMessageSettings";

function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/create-account" element={<ConnectAccount />} />
            <Route path="/bot-messages" element={<BotMessage />} />
            <Route path="/bot-menus" element={<BotMenu />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/followup-settings" element={<FollowUpSettings />} />
            <Route
              path="/welcome-message-settings"
              element={<WelcomeMessageSettings />}
            />
            <Route path="/calling-settings" element={<CallingSettings />} />
            <Route path="/broadcast" element={<Broadcast />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="/admin/users" element={<AdminUsers />} />

              <Route path="/admin/tenants" element={<AdminTenants />} />

              <Route
                path="/admin/subscriptions"
                element={<AdminSubscriptions />}
              />
            </Route>
          </Route>
        </Route>

        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
