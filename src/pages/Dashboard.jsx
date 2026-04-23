// import { useEffect, useState } from "react";
// import { useTenant } from "../context/TenantContext";
// import { getUsers } from "../services/userService";
// import { getLeads } from "../services/leadService";
// import API from "../api/api";

// import {
//    UserOutlined,
//    UserAddOutlined,
//    MessageOutlined,
//    RiseOutlined,
//    FallOutlined,
//    ArrowUpOutlined
// } from "@ant-design/icons";

// import {
//    LineChart,
//    Line,
//    XAxis,
//    YAxis,
//    Tooltip,
//    ResponsiveContainer,
//    CartesianGrid,
//    Area,
//    AreaChart
// } from "recharts";

// import "../styles/Dashboard.css";

// export default function Dashboard() {
//    const { tenantId } = useTenant();

//    const [users, setUsers] = useState([]);
//    const [leads, setLeads] = useState([]);
//    const [chats, setChats] = useState([]);
//    const [loading, setLoading] = useState(true);

//    useEffect(() => {
//       if (!tenantId) return;

//       setLoading(true);

//       Promise.all([
//          getUsers(tenantId),
//          getLeads(tenantId),
//          // 🔥 FIXED (safe API)
//          API.get(`/users/${tenantId}`).catch(() => ({ data: [] }))
//       ])
//          .then(([usersRes, leadsRes, chatsRes]) => {
//             setUsers(usersRes.data || []);
//             setLeads(leadsRes.data || []);
//             setChats(chatsRes.data || []);
//          })
//          .finally(() => setLoading(false));
//    }, [tenantId]);

//    // 🔥 TODAY STATS
//    const today = new Date().toDateString();

//    const todayLeads = leads.filter(
//       l => new Date(l.createdAt).toDateString() === today
//    );

//    const todayUsers = users.filter(
//       u => new Date(u.createdAt).toDateString() === today
//    );

//    // 🔥 GROWTH CALC
//    const growth = users.length
//       ? Math.round((todayUsers.length / users.length) * 100)
//       : 0;

//    // 🔥 CHART DATA (STATIC FOR NOW)
//    const chartData = [
//       { day: "Mon", messages: 10, users: 5 },
//       { day: "Tue", messages: 25, users: 12 },
//       { day: "Wed", messages: 15, users: 8 },
//       { day: "Thu", messages: 40, users: 20 },
//       { day: "Fri", messages: 30, users: 15 },
//       { day: "Sat", messages: 35, users: 18 },
//       { day: "Sun", messages: 45, users: 22 },
//    ];

//    // 🔥 RECENT ACTIVITY
//    const recentLeads = leads.slice(0, 3);

//    return (
//       <div className="dashboard-container">

//          {/* Header */}
//          <div className="dashboard-header">
//             <div>
//                <h1 className="dashboard-title">Dashboard</h1>
//                <p className="dashboard-subtitle">
//                   Welcome back! Here's what's happening today.
//                </p>
//             </div>

//             <div className="dashboard-date">
//                {new Date().toLocaleDateString("en-US", {
//                   weekday: "long",
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                })}
//             </div>
//          </div>

//          {/* Stats */}
//          {loading ? (
//             <div className="loading-state">
//                <div className="loading-spinner"></div>
//                <p>Loading dashboard...</p>
//             </div>
//          ) : (
//             <>
//                <div className="stats-grid">

//                   <StatsCard
//                      title="Total Users"
//                      value={users.length}
//                      icon={<UserOutlined />}
//                      color="#1677ff"
//                      trend={{ value: 12, isUp: true }}
//                   />

//                   <StatsCard
//                      title="Total Leads"
//                      value={leads.length}
//                      icon={<UserAddOutlined />}
//                      color="#52c41a"
//                      trend={{ value: 8, isUp: true }}
//                   />

//                   <StatsCard
//                      title="Messages"
//                      value={chats.length}
//                      icon={<MessageOutlined />}
//                      color="#faad14"
//                      trend={{ value: 5, isUp: false }}
//                   />

//                   <StatsCard
//                      title="Growth Rate"
//                      value={`${growth}%`}
//                      icon={<RiseOutlined />}
//                      color="#722ed1"
//                      trend={{ value: growth, isUp: true }}
//                   />

//                   {/* 🔥 NEW */}
//                   <StatsCard
//                      title="Today's Leads"
//                      value={todayLeads.length}
//                      icon={<UserAddOutlined />}
//                      color="#13c2c2"
//                      trend={{ value: 6, isUp: true }}
//                   />

//                   <StatsCard
//                      title="New Users Today"
//                      value={todayUsers.length}
//                      icon={<UserOutlined />}
//                      color="#eb2f96"
//                      trend={{ value: 4, isUp: true }}
//                   />

//                </div>

//                {/* Charts */}
//                <div className="charts-grid">

//                   <div className="chart-card">
//                      <div className="chart-header">
//                         <div>
//                            <h3 className="chart-title">Message Activity</h3>
//                            <p className="chart-subtitle">
//                               Weekly message trends
//                            </p>
//                         </div>
//                         <div className="chart-badge">Last 7 days</div>
//                      </div>

//                      <ResponsiveContainer width="100%" height={280}>
//                         <AreaChart data={chartData}>
//                            <CartesianGrid strokeDasharray="3 3" />
//                            <XAxis dataKey="day" />
//                            <YAxis />
//                            <Tooltip />
//                            <Area type="monotone" dataKey="messages" stroke="#25d366" fill="#25d36633" />
//                         </AreaChart>
//                      </ResponsiveContainer>
//                   </div>

//                   <div className="chart-card">
//                      <div className="chart-header">
//                         <div>
//                            <h3 className="chart-title">User Growth</h3>
//                         </div>
//                      </div>

//                      <ResponsiveContainer width="100%" height={280}>
//                         <LineChart data={chartData}>
//                            <CartesianGrid strokeDasharray="3 3" />
//                            <XAxis dataKey="day" />
//                            <YAxis />
//                            <Tooltip />
//                            <Line type="monotone" dataKey="users" stroke="#1677ff" />
//                         </LineChart>
//                      </ResponsiveContainer>
//                   </div>

//                </div>

//                {/* Activity */}
//                <div className="activity-card">
//                   <h3 className="activity-title">Recent Activity</h3>

//                   <div className="activity-list">
//                      {recentLeads.map((lead, index) => (
//                         <ActivityItem
//                            key={index}
//                            icon={<UserAddOutlined />}
//                            text={`${lead.name} added as lead`}
//                            time={new Date(lead.createdAt).toLocaleTimeString()}
//                            color="#52c41a"
//                         />
//                      ))}
//                   </div>
//                </div>

//             </>
//          )}
//       </div>
//    );
// }

// // 🔥 Stats Card
// function StatsCard({ title, value, icon, color, trend }) {
//    return (
//       <div className="stats-card">
//          <div className="stats-card-header">
//             <div className="stats-icon" style={{ background: `${color}15` }}>
//                <span style={{ color }}>{icon}</span>
//             </div>

//             {trend && (
//                <div className={`stats-trend ${trend.isUp ? "up" : "down"}`}>
//                   {trend.isUp ? <ArrowUpOutlined /> : <FallOutlined />}
//                   <span>{trend.value}%</span>
//                </div>
//             )}
//          </div>

//          <div className="stats-content">
//             <h3 className="stats-value">{value}</h3>
//             <p className="stats-label">{title}</p>
//          </div>
//       </div>
//    );
// }

// // 🔥 Activity
// function ActivityItem({ icon, text, time, color }) {
//    return (
//       <div className="activity-item">
//          <div className="activity-icon" style={{ background: `${color}15` }}>
//             <span style={{ color }}>{icon}</span>
//          </div>

//          <div className="activity-content">
//             <p className="activity-text">{text}</p>
//             <p className="activity-time">{time}</p>
//          </div>
//       </div>
//    );
// }

import { useEffect, useState } from "react";
import { useTenant } from "../context/TenantContext";
import { getDashboard } from "../services/dashboardService";

import {
   UserOutlined,
   UserAddOutlined,
   MessageOutlined,
   RiseOutlined,
   FallOutlined,
   ArrowUpOutlined
} from "@ant-design/icons";

import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer,
   CartesianGrid,
   Area,
   AreaChart
} from "recharts";

import "../styles/Dashboard.css";

export default function Dashboard() {
   const { tenantId } = useTenant();

   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);

   // 🔥 AUTO REFRESH (SAFE)
   useEffect(() => {
      if (!tenantId) return;

      let isMounted = true;

      const fetchData = async () => {
         try {
            const res = await getDashboard();
            if (isMounted) {
               setData(res);
               setLoading(false); // only first load
            }
         } catch (err) {
            console.error(err);
         }
      };

      fetchData();

      // const interval = setInterval(fetchData, 5000);

      // return () => {
      //    isMounted = false;
      //    clearInterval(interval);
      // };
   }, [tenantId]);

   // 🔥 LOADING
   if (loading) {
      return (
         <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading dashboard...</p>
         </div>
      );
   }

   if (!data) return null;

   return (
      <div className="dashboard-container">

         {/* Header */}
         <div className="dashboard-header">
            <div>
               <h1 className="dashboard-title">Dashboard</h1>
               <p className="dashboard-subtitle">
                  Welcome back! Here's what's happening today.
               </p>
            </div>

            <div className="dashboard-date">
               {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
               })}
            </div>
         </div>

         <>
            {/* Stats */}
            <div className="stats-grid">

               <StatsCard
                  title="Total Users"
                  value={data?.totalUsers || 0}
                  icon={<UserOutlined />}
                  color="#1677ff"
               />

               <StatsCard
                  title="Total Leads"
                  value={data?.totalLeads || 0}
                  icon={<UserAddOutlined />}
                  color="#52c41a"
               />

               <StatsCard
                  title="Messages"
                  value={data?.totalMessages || 0}
                  icon={<MessageOutlined />}
                  color="#faad14"
               />

               <StatsCard
                  title="Growth Rate"
                  value={`${data?.growth || 0}%`}
                  icon={<RiseOutlined />}
                  color="#722ed1"
                  trend={{ value: data?.growth || 0, isUp: true }}
               />

               <StatsCard
                  title="Today's Leads"
                  value={data?.todayLeads || 0}
                  icon={<UserAddOutlined />}
                  color="#13c2c2"
               />

               <StatsCard
                  title="New Users Today"
                  value={data?.todayUsers || 0}
                  icon={<UserOutlined />}
                  color="#eb2f96"
               />

               <StatsCard
                  title="Today's Messages"
                  value={data?.todayMessages || 0}
                  icon={<MessageOutlined />}
                  color="#fa541c"
               />

            </div>

            {/* Charts */}
            <div className="charts-grid">

               <div className="chart-card">
                  <div className="chart-header">
                     <div>
                        <h3 className="chart-title">Message Activity</h3>
                        <p className="chart-subtitle">
                           Weekly message trends
                        </p>
                     </div>
                     <div className="chart-badge">Last 7 days</div>
                  </div>

                  <ResponsiveContainer width="100%" height={280}>
                     <AreaChart data={data?.chart || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Area
                           type="monotone"
                           dataKey="messages"
                           stroke="#25d366"
                           fill="#25d36633"
                        />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>

               <div className="chart-card">
                  <div className="chart-header">
                     <h3 className="chart-title">User Growth</h3>
                  </div>

                  <ResponsiveContainer width="100%" height={280}>
                     <LineChart data={data?.chart || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line
                           type="monotone"
                           dataKey="users"
                           stroke="#1677ff"
                        />
                     </LineChart>
                  </ResponsiveContainer>
               </div>

            </div>

            {/* Activity */}
            <div className="activity-card">
               <h3 className="activity-title">Recent Activity</h3>

               <div className="activity-list">
                  {data?.recentActivity?.length > 0 ? (
                     data.recentActivity.map((item, index) => (
                        <ActivityItem
                           key={index}
                           icon={
                              item.type === "lead"
                                 ? <UserAddOutlined />
                                 : <MessageOutlined />
                           }
                           text={item.text}
                           time={new Date(item.time).toLocaleString()}
                           color={item.type === "lead" ? "#52c41a" : "#1677ff"}
                        />
                     ))
                  ) : (
                     <p>No recent activity</p>
                  )}
               </div>
            </div>

         </>
      </div>
   );
}


// 🔥 Stats Card
function StatsCard({ title, value, icon, color, trend }) {
   return (
      <div className="stats-card">
         <div className="stats-card-header">
            <div className="stats-icon" style={{ background: `${color}15` }}>
               <span style={{ color }}>{icon}</span>
            </div>

            {trend && (
               <div className={`stats-trend ${trend.isUp ? "up" : "down"}`}>
                  {trend.isUp ? <ArrowUpOutlined /> : <FallOutlined />}
                  <span>{trend.value}%</span>
               </div>
            )}
         </div>

         <div className="stats-content">
            <h3 className="stats-value">{value}</h3>
            <p className="stats-label">{title}</p>
         </div>
      </div>
   );
}


// 🔥 Activity Item
function ActivityItem({ icon, text, time, color }) {
   return (
      <div className="activity-item">
         <div className="activity-icon" style={{ background: `${color}15` }}>
            <span style={{ color }}>{icon}</span>
         </div>

         <div className="activity-content">
            <p className="activity-text">{text}</p>
            <p className="activity-time">{time}</p>
         </div>
      </div>
   );
}