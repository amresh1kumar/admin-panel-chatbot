import {
   FiCpu,
   FiPhoneCall,
   FiClock,
   FiMic,
   FiBarChart2,
   FiRefreshCw,
   FiCheckCircle,
} from "react-icons/fi";

const cards = [
   {
      icon: <FiCpu size={28} />,
      title: "AI Agents",
      desc: "Manage multiple AI voice agents.",
   },
   {
      icon: <FiPhoneCall size={28} />,
      title: "Live Calls",
      desc: "Monitor active AI conversations.",
   },
   {
      icon: <FiClock size={28} />,
      title: "Call History",
      desc: "Review every completed interaction.",
   },
   {
      icon: <FiMic size={28} />,
      title: "Recordings",
      desc: "Listen to AI call recordings anytime.",
   },
   {
      icon: <FiBarChart2 size={28} />,
      title: "Analytics",
      desc: "Track call performance and insights.",
   },
   {
      icon: <FiRefreshCw size={28} />,
      title: "CRM Sync",
      desc: "Keep customer data synchronized.",
   },
];

const DashboardPreview = () => {
   return (
      <section className="py-20 bg-gray-50">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Heading */}
            <div className="max-w-3xl mx-auto text-center">
               <span className="text-blue-600 font-semibold uppercase tracking-wider">
                  Dashboard Preview
               </span>

               <h2 className="mt-3 text-4xl font-bold text-gray-900">
                  Manage Every AI Conversation from One Dashboard
               </h2>

               <p className="mt-5 text-lg text-gray-600">
                  View AI agents, monitor conversations, access recordings,
                  and manage customer interactions from one unified platform.
               </p>
            </div>

            {/* Dashboard */}
            <div className="mt-16 rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-xl">

               {/* Top Bar */}
               <div className="flex items-center justify-between bg-gray-900 px-8 py-5">
                  <div>
                     <h3 className="text-white text-xl font-semibold">
                        AI Voice Dashboard
                     </h3>

                     <p className="text-gray-400 text-sm">
                        Platform Interface Preview
                     </p>
                  </div>

                  <span className="rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-300">
                     UI Preview
                  </span>
               </div>

               <div className="p-8">

                  {/* Feature Cards */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                     {cards.map((card, index) => (
                        <div
                           key={index}
                           className="rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition"
                        >
                           <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                              {card.icon}
                           </div>

                           <h4 className="mt-5 text-xl font-semibold text-gray-900">
                              {card.title}
                           </h4>

                           <p className="mt-2 text-gray-600">
                              {card.desc}
                           </p>
                        </div>
                     ))}
                  </div>

                  {/* Timeline */}
                  {/* <div className="mt-10 rounded-2xl border border-gray-200">

                     <div className="border-b px-6 py-4">
                        <h4 className="text-lg font-semibold text-gray-900">
                           Conversation Timeline
                        </h4>
                     </div>

                     <div className="divide-y">

                        {[
                           "AI Agent Started",
                           "Customer Connected",
                           "Conversation in Progress",
                           "Lead Qualified",
                           "Conversation Completed",
                        ].map((item, index) => (
                           <div
                              key={index}
                              className="flex items-center justify-between px-6 py-4"
                           >
                              <div className="flex items-center gap-3">
                                 <FiCheckCircle className="text-green-500" />
                                 <span className="text-gray-700">{item}</span>
                              </div>

                              <span className="text-sm text-gray-400">
                                 --:--
                              </span>
                           </div>
                        ))}

                     </div>
                  </div> */}

                  {/* Footer Note */}
                  {/* <div className="mt-6 text-center text-sm text-gray-500">
                     * Preview of the AI Voice dashboard. Final interface may vary.
                  </div> */}

               </div>
            </div>

         </div>
      </section>
   );
};

export default DashboardPreview;