// import {
//    useEffect,
//    useState
// } from "react";

// import {
//    Table,
//    Tag,
//    Button,
//    Space,
//    message,
//    Dropdown,
//    Modal,
//    Input,
//    Select
// } from "antd";

// import {
//    getAllUsers,
//    activatePremium,
//    deleteUser
// } from "../../services/adminService";

// export default function
//    AdminUsers() {

//    const [users, setUsers] =
//       useState([]);

//    const [loading, setLoading] =
//       useState(false);
//    const [search, setSearch] =
//       useState("");

//    const [plan, setPlan] =
//       useState("all");
//    // 🔹 LOAD USERS
//    const loadUsers = async () => {

//       try {

//          setLoading(true);

//          const res =
//             await getAllUsers(
//                search,
//                plan
//             );

//          setUsers(res.data);

//       } catch (err) {

//          message.error(
//             "Failed to load users"
//          );

//       } finally {

//          setLoading(false);
//       }
//    };

//    useEffect(() => {
//       loadUsers();
//    }, [search, plan]);

//    const handlePremium =
//       (userId, months) => {

//          Modal.confirm({

//             title:
//                "Activate Premium",

//             content:
//                `Are you sure you want to activate ${months} months premium plan?`,

//             okText: "Yes",

//             cancelText: "Cancel",

//             onOk: async () => {

//                try {

//                   await activatePremium({
//                      userId,
//                      months
//                   });

//                   message.success(
//                      `Premium activated for ${months} months`
//                   );

//                   loadUsers();

//                } catch (err) {

//                   message.error(
//                      "Activation failed"
//                   );
//                }
//             }
//          });
//       };

//    const handleDelete =
//       (id) => {

//          Modal.confirm({

//             title:
//                "Delete User",

//             content:
//                "Are you sure? All chats, leads, templates and tenant data will be permanently deleted.",

//             okText:
//                "Yes, Delete",

//             okType:
//                "danger",

//             cancelText:
//                "Cancel",

//             onOk: async () => {

//                try {

//                   await deleteUser(id);

//                   message.success(
//                      "User deleted successfully"
//                   );

//                   loadUsers();

//                } catch (err) {

//                   message.error(
//                      "Delete failed"
//                   );

//                }
//             }
//          });
//       };

//    const columns = [

//       {
//          title: "Name",
//          dataIndex: "name"
//       },

//       {
//          title: "Email",
//          dataIndex: "email"
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
//          title: "Status",

//          render: (_, record) => (

//             <Tag
//                color={
//                   record.subscriptionStatus ===
//                      "active"
//                      ? "green"
//                      : "red"
//                }
//             >
//                {
//                   record.subscriptionStatus
//                }
//             </Tag>
//          )
//       },

//       {
//          title: "Expiry",

//          render: (_, record) => {

//             const date =
//                record.plan ===
//                   "premium"
//                   ? record.premiumEnd
//                   : record.trialEnd;

//             return date
//                ? new Date(date)
//                   .toLocaleDateString("en-GB")
//                : "-";
//          }
//       },

//       {
//          title: "Actions",
//          render: (_, record) => {

//             const items = [

//                {
//                   key: "3",

//                   label: (
//                      <div
//                         onClick={() =>
//                            handlePremium(
//                               record._id,
//                               3
//                            )
//                         }
//                      >
//                         3 Months
//                      </div>
//                   )
//                },

//                {
//                   key: "6",

//                   label: (
//                      <div
//                         onClick={() =>
//                            handlePremium(
//                               record._id,
//                               6
//                            )
//                         }
//                      >
//                         6 Months
//                      </div>
//                   )
//                },

//                {
//                   key: "12",

//                   label: (
//                      <div
//                         onClick={() =>
//                            handlePremium(
//                               record._id,
//                               12
//                            )
//                         }
//                      >
//                         12 Months
//                      </div>
//                   )
//                },
//                {
//                   type: "divider"
//                },

//                {
//                   key: "delete",

//                   label: (
//                      <div
//                         style={{
//                            color: "red"
//                         }}

//                         onClick={() =>
//                            handleDelete(
//                               record._id
//                            )
//                         }
//                      >
//                         Delete User
//                      </div>
//                   )
//                }
//             ];

//             return (

//                <Dropdown
//                   menu={{ items }}
//                   trigger={["click"]}
//                >

//                   <Button type="primary">
//                      Activate Premium
//                   </Button>

//                </Dropdown>
//             );
//          }
//       }
//    ];

//    return (
//       <div
//          style={{
//             padding: 20
//          }}
//       >

//          <h2>
//             Admin Users
//          </h2>
//          <div
//             style={{
//                display: "flex",
//                gap: 15,
//                marginBottom: 20
//             }}
//          >

//             <Input
//                placeholder="Search user..."

//                value={search}

//                onChange={(e) =>
//                   setSearch(
//                      e.target.value
//                   )
//                }

//                style={{
//                   width: 300
//                }}
//             />

//             <Select
//                value={plan}

//                onChange={(value) =>
//                   setPlan(value)
//                }

//                style={{
//                   width: 180
//                }}

//                options={[
//                   {
//                      label: "All Plans",
//                      value: "all"
//                   },
//                   {
//                      label: "Premium",
//                      value: "premium"
//                   },
//                   {
//                      label: "Trial",
//                      value: "trial"
//                   },
//                   {
//                      label: "Expired",
//                      value: "expired"
//                   }
//                ]}
//             />

//          </div>

//          <Table
//             dataSource={users}
//             loading={loading}
//             rowKey="_id"
//             columns={columns}
//          />

//       </div>
//    );
// }

import {
   useEffect,
   useState
} from "react";

import {
   Table,
   Tag,
   Button,
   message,
   Dropdown,
   Modal,
   Input,
   Select
} from "antd";

import {
   getAllUsers,
   activatePremium,
   deleteUser
} from "../../services/adminService";

export default function
   AdminUsers() {

   const [users, setUsers] =
      useState([]);

   const [loading, setLoading] =
      useState(false);

   const [search, setSearch] =
      useState("");

   const [plan, setPlan] =
      useState("all");

   // 🔹 LOAD USERS
   const loadUsers = async () => {

      try {

         setLoading(true);

         const res =
            await getAllUsers(
               search,
               plan
            );

         setUsers(res.data);

      } catch (err) {

         message.error(
            "Failed to load users"
         );

      } finally {

         setLoading(false);
      }
   };

   useEffect(() => {

      const timer =
         setTimeout(() => {
            loadUsers();
         }, 500);

      return () =>
         clearTimeout(timer);

   }, [search, plan]);

   // 🔹 ACTIVATE PREMIUM
   const handlePremium =
      (userId, months) => {

         Modal.confirm({

            title:
               "Activate Premium",

            content:
               `Are you sure you want to activate ${months} months premium plan?`,

            okText: "Yes",

            cancelText: "Cancel",

            onOk: async () => {

               try {

                  await activatePremium({
                     userId,
                     months
                  });

                  message.success(
                     `Premium activated for ${months} months`
                  );

                  loadUsers();

               } catch (err) {

                  message.error(
                     "Activation failed"
                  );
               }
            }
         });
      };

   // 🔹 DELETE USER
   const handleDelete =
      (id) => {

         Modal.confirm({

            title:
               "Delete User",

            content:
               "Are you sure? All chats, leads, templates and tenant data will be permanently deleted.",

            okText:
               "Yes, Delete",

            okType:
               "danger",

            cancelText:
               "Cancel",

            onOk: async () => {

               try {

                  await deleteUser(id);

                  message.success(
                     "User deleted successfully"
                  );

                  loadUsers();

               } catch (err) {

                  message.error(
                     "Delete failed"
                  );
               }
            }
         });
      };

   // 🔹 TABLE COLUMNS
   const columns = [

      {
         title: "Name",
         dataIndex: "name"
      },

      {
         title: "Email",
         dataIndex: "email"
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
                     ? "green"
                     : "red"
               }
            >
               {
                  record.subscriptionStatus
               }
            </Tag>
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
                  .toLocaleDateString("en-GB")
               : "-";
         }
      },

      {
         title: "Created",

         render: (_, record) => (

            new Date(
               record.createdAt
            ).toLocaleDateString(
               "en-GB"
            )
         )
      },

      {
         title: "Actions",

         render: (_, record) => {

            if (record.isSuperAdmin) {

               return (
                  <Tag color="blue">
                     Super Admin
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
                        3 Months
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
                        6 Months
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
                        12 Months
                     </div>
                  )
               },

               {
                  type: "divider"
               },

               {
                  key: "delete",

                  label: (
                     <div
                        style={{
                           color: "red"
                        }}

                        onClick={() =>
                           handleDelete(
                              record._id
                           )
                        }
                     >
                        Delete User
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
                     Manage
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
            Admin Users
         </h2>

         {/* 🔹 SEARCH + FILTER */}
         <div
            style={{
               display: "flex",
               gap: 15,
               marginBottom: 20,
               flexWrap: "wrap"
            }}
         >

            <Input
               placeholder="Search user..."

               value={search}

               onChange={(e) =>
                  setSearch(
                     e.target.value
                  )
               }

               style={{
                  width: 300
               }}
            />

            <Select
               value={plan}

               onChange={(value) =>
                  setPlan(value)
               }

               style={{
                  width: 180
               }}

               options={[
                  {
                     label: "All Plans",
                     value: "all"
                  },
                  {
                     label: "Premium",
                     value: "premium"
                  },
                  {
                     label: "Trial",
                     value: "trial"
                  },
                  {
                     label: "Expired",
                     value: "expired"
                  }
               ]}
            />

         </div>

         {/* 🔹 TABLE */}
         <Table
            dataSource={users}
            loading={loading}
            rowKey="_id"
            columns={columns}

            scroll={{
               x: 1000
            }}
         />

      </div>
   );
}