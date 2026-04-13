// import { Layout } from "antd";
// import Sidebar from "./components/Sidebar";
// import ChatPage from "./pages/ChatPage";
// import LeadsPage from "./pages/LeadsPage";
// import { useState } from "react";

// const { Sider, Content } = Layout;

// function App() {
//   const [page, setPage] = useState("chat");

//   return (
//     <Layout style={{ height: "100vh" }}>
//       <Sider>
//         <Sidebar setPage={setPage} />
//       </Sider>

//       <Layout>
//         <Content style={{ padding: 20 }}>
//           {page === "chat" && <ChatPage />}
//           {page === "leads" && <LeadsPage />}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// }

// export default App;

import ChatPage from "./pages/ChatPage";

function App() {
  return <ChatPage />;
}

export default App;