import {
   useEffect,
   useState
} from "react";

import {
   Row,
   Col,
   Card,
   Statistic,
   message
} from "antd";

import {
   TeamOutlined,
   CrownOutlined,
   ClockCircleOutlined,
   StopOutlined
} from "@ant-design/icons";

import {
   getStats
} from "../../services/adminService";

export default function
   AdminDashboard() {

   const [stats, setStats] =
      useState(null);

   const [loading, setLoading] =
      useState(false);

   // 🔹 LOAD STATS
   const loadStats = async () => {

      try {

         setLoading(true);

         const res =
            await getStats();

         setStats(res.data);

      } catch (err) {

         message.error(
            "Failed to load stats"
         );

      } finally {

         setLoading(false);
      }
   };

   useEffect(() => {
      loadStats();
   }, []);

   return (
      <div
         style={{
            padding: 20
         }}
      >

         <h2
            style={{
               marginBottom: 25
            }}
         >
            Admin Dashboard
         </h2>

         <Row gutter={[20, 20]}>

            {/* TOTAL USERS */}
            <Col
               xs={24}
               sm={12}
               md={6}
            >

               <Card loading={loading}>

                  <Statistic
                     title="Total Users"

                     value={
                        stats?.totalUsers || 0
                     }

                     prefix={
                        <TeamOutlined />
                     }
                  />

               </Card>

            </Col>

            {/* PREMIUM USERS */}
            <Col
               xs={24}
               sm={12}
               md={6}
            >

               <Card loading={loading}>

                  <Statistic
                     title="Premium Users"

                     value={
                        stats?.premiumUsers || 0
                     }

                     prefix={
                        <CrownOutlined />
                     }
                  />

               </Card>

            </Col>

            {/* TRIAL USERS */}
            <Col
               xs={24}
               sm={12}
               md={6}
            >

               <Card loading={loading}>

                  <Statistic
                     title="Trial Users"

                     value={
                        stats?.trialUsers || 0
                     }

                     prefix={
                        <ClockCircleOutlined />
                     }
                  />

               </Card>

            </Col>

            {/* EXPIRED USERS */}
            <Col
               xs={24}
               sm={12}
               md={6}
            >

               <Card loading={loading}>

                  <Statistic
                     title="Expired Users"

                     value={
                        stats?.expiredUsers || 0
                     }

                     prefix={
                        <StopOutlined />
                     }
                  />

               </Card>

            </Col>

         </Row>

      </div>
   );
}