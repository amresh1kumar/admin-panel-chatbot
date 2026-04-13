import { useEffect, useState } from "react";
import API from "../api/api";

const tenantId = "69da2a06ac988a6c9b2d309b";

export default function Dashboard() {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      API.get(`/users/${tenantId}`)
         .then(res => setUsers(res.data))
         .catch(err => console.error(err));
   }, []);

   return (
      <div>
         <h2>Users</h2>
         {users.map(user => (
            <div key={user._id}>
               <p>{user._id}</p>
               <p>{user.lastMessage}</p>
            </div>
         ))}
      </div>
   );
}