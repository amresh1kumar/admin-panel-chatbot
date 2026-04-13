import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useTenant } from "../context/TenantContext";
import { getUsers } from "../services/userService";
import { getLeads } from "../services/leadService";
import API from "../api/api";

import {
   LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
   const { tenantId } = useTenant();

   const [users, setUsers] = useState([]);
   const [leads, setLeads] = useState([]);
   const [chats, setChats] = useState([]);

   useEffect(() => {
      if (!tenantId) return;

      getUsers(tenantId).then(res => setUsers(res.data));
      getLeads(tenantId).then(res => setLeads(res.data));

      API.get(`/chats/${tenantId}/all`) // optional (if you create API)
         .then(res => setChats(res.data))
         .catch(() => { });
   }, [tenantId]);

   // 🔥 fake chart data (replace later)
   const chartData = [
      { day: "Mon", value: 10 },
      { day: "Tue", value: 25 },
      { day: "Wed", value: 15 },
      { day: "Thu", value: 40 },
      { day: "Fri", value: 30 },
   ];

   return (
      <Layout>
         <div style={{ padding: "20px" }}>

            <h2>📊 Dashboard</h2>

            {/* 🔥 Cards */}
            <div style={{
               display: "flex",
               gap: "20px",
               marginTop: "20px"
            }}>
               <Card title="Users" value={users.length} />
               <Card title="Leads" value={leads.length} />
               <Card title="Messages" value={chats.length} />
            </div>

            {/* 🔥 Chart */}
            <div style={{
               marginTop: "30px",
               background: "#fff",
               padding: "20px",
               borderRadius: "10px"
            }}>
               <h3>Message Growth</h3>

               <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                     <XAxis dataKey="day" />
                     <YAxis />
                     <Tooltip />
                     <Line type="monotone" dataKey="value" />
                  </LineChart>
               </ResponsiveContainer>
            </div>

         </div>
      </Layout>
   );
}

// 🔥 Card Component
function Card({ title, value }) {
   return (
      <div style={{
         flex: 1,
         background: "#fff",
         padding: "20px",
         borderRadius: "10px",
         boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}>
         <h4>{title}</h4>
         <h2>{value}</h2>
      </div>
   );
}