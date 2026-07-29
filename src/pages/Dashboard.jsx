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

   useEffect(() => {
      if (!tenantId) return;
      let isMounted = true;
      const fetchData = async () => {
         try {
            const res = await getDashboard();
            if (isMounted) {
               setData(res);
               setLoading(false);
            }
         } catch (err) {
            console.error(err);
         }
      };
      fetchData();
   }, [tenantId]);

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

               {/* <StatsCard
                  title="Growth Rate"
                  value={`${data?.growth || 0}%`}
                  icon={<RiseOutlined />}
                  color="#722ed1"
                  trend={{ value: data?.growth || 0, isUp: true }}
               /> */}

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