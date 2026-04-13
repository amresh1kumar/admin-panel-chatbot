import { useEffect, useState } from "react";
import API from "../api/api";

const tenantId = "69da2a06ac988a6c9b2d309b";

export default function Leads() {
   const [leads, setLeads] = useState([]);

   useEffect(() => {
      API.get(`/leads/${tenantId}`)
         .then(res => setLeads(res.data));
   }, []);

   return (
      <div>
         <h2>Leads</h2>
         {leads.map(lead => (
            <div key={lead._id}>
               <p>{lead.name}</p>
               <p>{lead.business}</p>
               <p>{lead.requirement}</p>
            </div>
         ))}
      </div>
   );
}