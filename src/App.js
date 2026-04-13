// import ChatPage from "./pages/ChatPage";
// import Onboarding from "./pages/Onboarding";

// function App() {
//   const tenantId = localStorage.getItem("tenantId");

//   return tenantId ? <ChatPage /> : <Onboarding />;
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import Leads from "./pages/Leads";
import Onboarding from "./pages/Onboarding";

function App() {
  const tenantId = localStorage.getItem("tenantId");

  if (!tenantId) return <Onboarding />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/leads" element={<Leads />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;