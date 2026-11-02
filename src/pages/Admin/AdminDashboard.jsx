// import {
//    useEffect,
//    useState
// } from "react";

// import {
//    Row,
//    Col,
//    Card,
//    Statistic,
//    message,
//    Table,
//    Tag
// } from "antd";

// import {
//    TeamOutlined,
//    CrownOutlined,
//    ClockCircleOutlined,
//    StopOutlined,
//    UserOutlined,
//    CalendarOutlined
// } from "@ant-design/icons";

// import {
//    getStats,
//    getRecentUsers
// } from "../../services/adminService";

// export default function
//    AdminDashboard() {

//    const [stats, setStats] =
//       useState(null);

//    const [recentUsers,
//       setRecentUsers] =
//       useState([]);

//    const [loading, setLoading] =
//       useState(false);

//    // 🔹 LOAD STATS
//    const loadStats = async () => {

//       try {

//          setLoading(true);

//          const res =
//             await getStats();

//          setStats(res.data);

//       } catch (err) {

//          message.error(
//             "Failed to load stats"
//          );

//       } finally {

//          setLoading(false);
//       }
//    };
//    // 🔹 LOAD RECENT USERS
//    const loadRecentUsers =
//       async () => {

//          try {

//             const res =
//                await getRecentUsers();

//             setRecentUsers(
//                res.data
//             );

//          } catch (err) {

//             message.error(
//                "Failed to load recent users"
//             );
//          }
//       };

//    useEffect(() => {

//       loadStats();
//       loadRecentUsers();

//    }, []);
//    const recentColumns = [

//       {
//          title: "User",

//          render: (_, record) => (

//             <div>

//                <div
//                   style={{
//                      fontWeight: 600
//                   }}
//                >
//                   {record.name}
//                </div>

//                <div
//                   style={{
//                      color: "#888",
//                      fontSize: 12
//                   }}
//                >
//                   {record.email}
//                </div>

//             </div>
//          )
//       },

//       {
//          title: "Plan",

//          render: (_, record) => (

//             <Tag
//                color={
//                   record.plan ===
//                      "premium"
//                      ? "green"
//                      : record.plan ===
//                         "expired"
//                         ? "red"
//                         : "orange"
//                }
//             >
//                {
//                   record.plan?.toUpperCase()
//                }
//             </Tag>
//          )
//       },

//       {
//          title: "Created",

//          render: (_, record) => (

//             new Date(
//                record.createdAt
//             ).toLocaleDateString(
//                "en-GB"
//             )
//          )
//       }
//    ];
//    return (
//       <div
//          style={{
//             padding: 20
//          }}
//       >

//          <h2
//             style={{
//                marginBottom: 25
//             }}
//          >
//             Admin Dashboard
//          </h2>

//          <Row gutter={[20, 20]}>

//             {/* TOTAL USERS */}
//             <Col
//                xs={24}
//                sm={12}
//                md={6}
//             >

//                <Card loading={loading}>

//                   <Statistic
//                      title="Total Users"

//                      value={
//                         stats?.totalUsers || 0
//                      }

//                      prefix={
//                         <TeamOutlined />
//                      }
//                   />

//                </Card>

//             </Col>

//             {/* PREMIUM USERS */}
//             <Col
//                xs={24}
//                sm={12}
//                md={6}
//             >

//                <Card loading={loading}>

//                   <Statistic
//                      title="Premium Users"

//                      value={
//                         stats?.premiumUsers || 0
//                      }

//                      prefix={
//                         <CrownOutlined />
//                      }
//                   />

//                </Card>

//             </Col>

//             {/* TRIAL USERS */}
//             <Col
//                xs={24}
//                sm={12}
//                md={6}
//             >

//                <Card loading={loading}>

//                   <Statistic
//                      title="Trial Users"

//                      value={
//                         stats?.trialUsers || 0
//                      }

//                      prefix={
//                         <ClockCircleOutlined />
//                      }
//                   />

//                </Card>

//             </Col>

//             {/* EXPIRED USERS */}
//             <Col
//                xs={24}
//                sm={12}
//                md={6}
//             >

//                <Card loading={loading}>

//                   <Statistic
//                      title="Expired Users"

//                      value={
//                         stats?.expiredUsers || 0
//                      }

//                      prefix={
//                         <StopOutlined />
//                      }
//                   />

//                </Card>

//             </Col>

//          </Row>

//          <Card
//             style={{
//                marginTop: 30
//             }}
//          >

//             <h3
//                style={{
//                   marginBottom: 20
//                }}
//             >
//                Recent Users
//             </h3>

//             <Table
//                dataSource={recentUsers}

//                rowKey="_id"

//                columns={recentColumns}

//                pagination={false}
//             />

//          </Card>

//       </div>
//    );
// }
import { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, message, Table, Tag } from "antd";
import {
   TeamOutlined, CrownOutlined, ClockCircleOutlined, StopOutlined, UserOutlined,
   CalendarOutlined,
} from "@ant-design/icons";
import { getStats, getRecentUsers } from "../../services/adminService";

export default function AdminDashboard() {

   const [stats, setStats] = useState(null);
   const [recentUsers, setRecentUsers] = useState([]);
   const [loading, setLoading] = useState(false);

   // 🔹 LOAD STATS
   const loadStats = async () => {
      try {
         setLoading(true);
         const res = await getStats();
         setStats(res.data);
      } catch (err) {
         message.error("Failed to load stats");
      } finally {
         setLoading(false);
      }
   };

   // 🔹 LOAD RECENT USERS
   const loadRecentUsers = async () => {
      try {
         const res = await getRecentUsers();
         setRecentUsers(res.data);
      } catch (err) {
         message.error("Failed to load recent users");
      }
   };

   useEffect(() => {
      loadStats();
      loadRecentUsers();
   }, []);

   // 🔹 RECENT USERS TABLE
   const recentColumns = [
      {
         title: "User",
         render: (_, record) => (
            <div
               style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
               }}
            >
               <UserOutlined
                  style={{
                     fontSize: 18,
                     color: "#888",
                  }}
               />

               <div>
                  <div
                     style={{
                        fontWeight: 600,
                        lineHeight: 1.2,
                     }}
                  >
                     {record.name}
                  </div>

                  <div
                     style={{
                        color: "#888",
                        fontSize: 12,
                     }}
                  >
                     {record.email}
                  </div>
               </div>
            </div>
         ),
      },

      {
         title: "Plan",
         render: (_, record) => (
            <Tag
               color={
                  record.plan === "premium"
                     ? "green"
                     : record.plan === "expired"
                        ? "red"
                        : "orange"
               }
            >
               {record.plan?.toUpperCase()}
            </Tag>
         ),
      },

      {
         title: "Created",
         render: (_, record) => (
            <div
               style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
               }}
            >
               <CalendarOutlined
                  style={{
                     color: "#888",
                  }}
               />
               <span>{new Date(record.createdAt).toLocaleDateString("en-GB")}</span>
            </div>
         ),
      },
   ];

   return (
      <div
         style={{ padding: 20, }}
      >
         <h2
            style={{
               marginBottom: 25,
            }}
         >
            Admin Dashboard
         </h2>

         <Row gutter={[20, 20]}>
            {/* TOTAL USERS */}
            <Col xs={24} sm={12} md={6}>
               <Card loading={loading}>
                  <Statistic
                     title="Total Users"
                     value={stats?.totalUsers || 0}
                     prefix={<TeamOutlined />}
                  />
               </Card>
            </Col>

            {/* PREMIUM USERS */}
            <Col xs={24} sm={12} md={6}>
               <Card loading={loading}>
                  <Statistic
                     title="Premium Users"
                     value={stats?.premiumUsers || 0}
                     prefix={<CrownOutlined />}
                  />
               </Card>
            </Col>

            {/* TRIAL USERS */}
            <Col xs={24} sm={12} md={6}>
               <Card loading={loading}>
                  <Statistic
                     title="Trial Users"
                     value={stats?.trialUsers || 0}
                     prefix={<ClockCircleOutlined />}
                  />
               </Card>
            </Col>

            {/* EXPIRED USERS */}
            <Col xs={24} sm={12} md={6}>
               <Card loading={loading}>
                  <Statistic
                     title="Expired Users"
                     value={stats?.expiredUsers || 0}
                     prefix={<StopOutlined />}
                  />
               </Card>
            </Col>
         </Row>

         {/* 🔹 RECENT USERS */}
         <Card
            style={{
               marginTop: 30,
            }}
         >
            <h3
               style={{
                  marginBottom: 20,
               }}
            >
               Recent Users
            </h3>

            <Table
               dataSource={recentUsers}
               rowKey="_id"
               columns={recentColumns}
               pagination={false}
               size="small"
            />
         </Card>
      </div>
   );
}
