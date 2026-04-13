import { useEffect, useState } from "react";
import API from "../api/api";

const tenantId = "69dc8ab23fd695b8b4a21e86";
const phone = "917324963664"; // test number

export default function Chats() {
   const [chats, setChats] = useState([]);

   useEffect(() => {
      API.get(`/chats/${tenantId}/${phone}`)
         .then(res => setChats(res.data));
   }, []);

   return (
      <div>
         <h2>Chat History</h2>
         {chats.map(chat => (
            <div key={chat._id}>
               <b>{chat.type}:</b> {chat.message}
            </div>
         ))}
      </div>
   );
}