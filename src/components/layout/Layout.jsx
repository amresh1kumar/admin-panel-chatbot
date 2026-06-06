import { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { notification, Button, Space } from "antd";
import { getDueFollowUps, completeFollowUp } from "../../services/followUpService";

export default function Layout() {

   const shownIds = useRef(new Set());

   useEffect(() => {

      const checkReminders = async () => {

         try {

            const data = await getDueFollowUps();

            // reset notification flag when all reminders completed
            if (data.length === 0) {
               shownIds.current.delete(
                  "due-summary"
               );
               return;
            }

            // show only one notification
            if (
               !shownIds.current.has(
                  "due-summary"
               )
            ) {

               shownIds.current.add(
                  "due-summary"
               );

               notification.warning({
                  message:
                     "Follow-Up Reminder",

                  description: (
                     <div>

                        <div>
                           You have
                           <strong>
                              {" "}
                              {data.length}
                              {" "}
                           </strong>
                           pending follow-ups.
                        </div>

                        <div
                           style={{
                              marginTop: 8
                           }}
                        >
                           Please review and complete them.
                        </div>

                     </div>
                  ),

                  duration: 0
               });

            }

         } catch (err) {

            console.error(err);
         }
      };

      checkReminders();

      const interval = setInterval(
         checkReminders,
         60000
      );

      return () =>
         clearInterval(interval);

   }, []);
   return (
      <div style={{ display: "flex", height: "100vh" }}>
         <Sidebar />
         <div style={{
            flex: 1,
            overflowY: "auto",
            background: "#f5f7fb",
            padding: "10px"
         }}>
            <Outlet />
         </div>
      </div>
   );
}