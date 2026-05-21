import {
   useEffect,
   useState
} from "react";

import {
   Table,
   Tag,
   Button,
   Dropdown,
   Modal,
   message
} from "antd";

import {
   getSubscriptions,
   activatePremium
} from "../../services/adminService";

export default function
   AdminSubscriptions() {

   const [users, setUsers] =
      useState([]);

   const [loading, setLoading] =
      useState(false);

   // 🔹 LOAD DATA
   const loadSubscriptions =
      async () => {

         try {

            setLoading(true);

            const res =
               await getSubscriptions();

            setUsers(res.data);

         } catch (err) {

            message.error(
               "Failed to load subscriptions"
            );

         } finally {

            setLoading(false);
         }
      };

   useEffect(() => {
      loadSubscriptions();
   }, []);

   // 🔹 ACTIVATE PREMIUM
   const handlePremium =
      (userId, months) => {

         Modal.confirm({

            title:
               "Activate Premium",

            content:
               `Activate premium for ${months} months?`,

            okText:
               "Activate",

            cancelText:
               "Cancel",

            onOk: async () => {

               try {

                  await activatePremium({
                     userId,
                     months
                  });

                  message.success(
                     "Premium activated"
                  );

                  loadSubscriptions();

               } catch (err) {

                  message.error(
                     "Activation failed"
                  );
               }
            }
         });
      };

   // 🔹 DAYS LEFT
   const getDaysLeft =
      (date) => {

         if (!date) return "-";

         const now =
            new Date();

         const end =
            new Date(date);

         const diff =
            Math.ceil(
               (
                  end - now
               ) /
               (
                  1000 *
                  60 *
                  60 *
                  24
               )
            );

         if (diff < 0) {
            return "Expired";
         }

         return `${diff} days`;
      };

   // 🔹 TABLE COLUMNS
   const columns = [

      {
         title: "User",

         render: (_, record) => (

            <div>

               <div
                  style={{
                     fontWeight: 600
                  }}
               >
                  {record.name}
               </div>

               <div
                  style={{
                     color: "#888",
                     fontSize: 12
                  }}
               >
                  {record.email}
               </div>

            </div>
         )
      },

      {
         title: "Plan",

         render: (_, record) => (

            <Tag
               color={
                  record.plan ===
                     "premium"
                     ? "green"
                     : record.plan ===
                        "expired"
                        ? "red"
                        : "orange"
               }
            >
               {
                  record.plan?.toUpperCase()
               }
            </Tag>
         )
      },

      {
         title: "Status",

         render: (_, record) => (

            <Tag
               color={
                  record.subscriptionStatus ===
                     "active"
                     ? "success"
                     : "error"
               }
            >
               {
                  record.subscriptionStatus
                     ?.toUpperCase()
               }
            </Tag>
         )
      },

      {
         title: "Premium Start",

         render: (_, record) => (

            record.premiumStart
               ? new Date(
                  record.premiumStart
               ).toLocaleDateString(
                  "en-GB"
               )
               : "-"
         )
      },

      {
         title: "Expiry",

         render: (_, record) => {

            const date =
               record.plan ===
                  "premium"
                  ? record.premiumEnd
                  : record.trialEnd;

            return date
               ? new Date(date)
                  .toLocaleDateString(
                     "en-GB"
                  )
               : "-";
         }
      },

      {
         title: "Days Left",

         render: (_, record) => {

            const date =
               record.plan ===
                  "premium"
                  ? record.premiumEnd
                  : record.trialEnd;
            if (record.isSuperAdmin) {

               return (
                  <Tag color="gold">
                     Unlimited
                  </Tag>
               );
            }
            const days =
               getDaysLeft(date);

            return (

               <Tag
                  color={
                     days === "Expired"
                        ? "red"
                        : "blue"
                  }
               >
                  {days}
               </Tag>
            );
         }
      },

      {
         title: "Actions",

         render: (_, record) => {

            if (record.isSuperAdmin) {

               return (
                  <Tag color="gold">
                     Lifetime Access
                  </Tag>
               );
            }

            const items = [

               {
                  key: "3",

                  label: (
                     <div
                        onClick={() =>
                           handlePremium(
                              record._id,
                              3
                           )
                        }
                     >
                        Renew 3 Months
                     </div>
                  )
               },

               {
                  key: "6",

                  label: (
                     <div
                        onClick={() =>
                           handlePremium(
                              record._id,
                              6
                           )
                        }
                     >
                        Renew 6 Months
                     </div>
                  )
               },

               {
                  key: "12",

                  label: (
                     <div
                        onClick={() =>
                           handlePremium(
                              record._id,
                              12
                           )
                        }
                     >
                        Renew 12 Months
                     </div>
                  )
               }
            ];

            return (

               <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
               >

                  <Button type="primary">
                     Renew
                  </Button>

               </Dropdown>
            );
         }
      }
   ];

   return (
      <div
         style={{
            padding: 20
         }}
      >

         <h2>
            Subscriptions
         </h2>

         <Table
            dataSource={users}
            loading={loading}
            rowKey="_id"
            columns={columns}

            pagination={{
               pageSize: 10
            }}

            scroll={{
               x: 1000
            }}
         />

      </div>
   );
}