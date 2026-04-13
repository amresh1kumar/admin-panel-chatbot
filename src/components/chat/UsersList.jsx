// import { useEffect, useState } from "react";
// import API from "../../api/api";

// const tenantId = "69dc8ab23fd695b8b4a21e86"; // 🔥 apna tenantId daal

// export default function UsersList({ onSelectUser }) {
//    const [users, setUsers] = useState([]);

//    useEffect(() => {
//       API.get(`/users/${tenantId}`)
//          .then(res => setUsers(res.data))
//          .catch(err => console.error(err));
//    }, []);

//    return (
//       <div>
//          <h3 style={{ padding: "10px" }}>Users</h3>

//          {users.map(user => (
//             <div
//                key={user._id}
//                onClick={() => onSelectUser(user._id)}
//                style={{
//                   padding: "10px",
//                   borderBottom: "1px solid #eee",
//                   cursor: "pointer"
//                }}
//             >
//                <b>{user._id}</b>
//                <p style={{ margin: 0, fontSize: "12px" }}>
//                   {user.lastMessage}
//                </p>
//             </div>
//          ))}
//       </div>
//    );
// }

import { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";
import { useTenant } from "../../context/TenantContext";

export default function UsersList({ onSelectUser }) {
   const { tenantId } = useTenant();

   const [users, setUsers] = useState([]);
   const [activeUser, setActiveUser] = useState(null);

   useEffect(() => {
      if (!tenantId) return;

      getUsers(tenantId)
         .then(res => setUsers(res.data))
         .catch(err => console.error(err));
   }, [tenantId]);

   return (
      <div style={{ height: "100%", overflowY: "auto" }}>
         <h3 style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            Users
         </h3>

         {users.map(user => (
            <div
               key={user._id}
               onClick={() => {
                  setActiveUser(user._id);
                  onSelectUser(user._id);
               }}
               style={{
                  padding: "12px",
                  borderBottom: "1px solid #f0f0f0",
                  cursor: "pointer",
                  background:
                     activeUser === user._id ? "#f5f7fb" : "#fff",
                  transition: "0.2s"
               }}
            >
               <div style={{ fontWeight: "600" }}>
                  {user._id}
               </div>

               <div
                  style={{
                     fontSize: "12px",
                     color: "#666",
                     marginTop: "4px"
                  }}
               >
                  {user.lastMessage}
               </div>
            </div>
         ))}

         {users.length === 0 && (
            <p style={{ padding: "10px", color: "#999" }}>
               No users found
            </p>
         )}
      </div>
   );
}