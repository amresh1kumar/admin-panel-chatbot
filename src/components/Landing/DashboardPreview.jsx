// const DashboardPreview = () => {
//    return (
//       <section className="bg-white py-24">
//          <div className="mx-auto max-w-7xl px-6">

//             {/* Heading */}

//             <div className="mx-auto max-w-3xl text-center">

//                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
//                   DASHBOARD
//                </span>

//                <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
//                   Manage Everything From One Dashboard
//                </h2>

//                <p className="mt-6 text-lg leading-8 text-gray-600">
//                   Chat, Broadcast, Contacts, Reports and AI Automation — everything
//                   in one modern dashboard.
//                </p>

//             </div>

//             {/* Dashboard */}

//             <div className="mt-20 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">

//                {/* Header */}

//                <div className="flex items-center justify-between border-b bg-gray-50 px-8 py-5">

//                   <h3 className="text-xl font-bold">
//                      SP Advertising CRM
//                   </h3>

//                   <div className="flex items-center gap-3">

//                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
//                         ● Live
//                      </span>

//                      <div className="h-10 w-10 rounded-full bg-blue-600"></div>

//                   </div>

//                </div>

//                <div className="flex">

//                   {/* Sidebar */}

//                   <aside className="hidden w-64 border-r bg-slate-900 p-6 text-white lg:block">

//                      <h4 className="mb-8 text-xl font-bold">
//                         Navigation
//                      </h4>

//                      <div className="space-y-4">

//                         <div className="rounded-xl bg-blue-600 px-4 py-3">
//                            📊 Dashboard
//                         </div>

//                         <div className="px-4 py-3 hover:text-green-400">
//                            🤖 AI Chatbot
//                         </div>

//                         <div className="px-4 py-3 hover:text-green-400">
//                            💬 Live Chat
//                         </div>

//                         <div className="px-4 py-3 hover:text-green-400">
//                            📢 Broadcast
//                         </div>

//                         <div className="px-4 py-3 hover:text-green-400">
//                            👥 Contacts
//                         </div>

//                         <div className="px-4 py-3 hover:text-green-400">
//                            📈 Reports
//                         </div>

//                      </div>

//                   </aside>

//                   {/* Main */}

//                   <div className="flex-1 p-8">

//                      {/* Cards */}

//                      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

//                         {[
//                            ["Customers", "12,540", "text-blue-600"],
//                            ["Broadcast", "320", "text-green-600"],
//                            ["Chats", "1,245", "text-purple-600"],
//                            ["Leads", "2,830", "text-orange-600"],
//                         ].map(([title, value, color]) => (

//                            <div
//                               key={title}
//                               className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
//                            >
//                               <p className="text-gray-500">{title}</p>

//                               <h2 className={`mt-3 text-3xl font-bold ${color}`}>
//                                  {value}
//                               </h2>

//                            </div>

//                         ))}

//                      </div>

//                      {/* Bottom */}

//                      <div className="mt-10 grid gap-8 xl:grid-cols-2">

//                         {/* Analytics */}

//                         <div className="rounded-2xl border border-gray-200 p-6">

//                            <h3 className="mb-6 text-xl font-bold">
//                               Analytics
//                            </h3>

//                            <div className="flex h-64 items-end justify-between gap-3">

//                               {[45, 80, 60, 95, 70, 120, 85].map((h, i) => (
//                                  <div
//                                     key={i}
//                                     className="flex-1 rounded-t-xl bg-gradient-to-t from-green-500 to-blue-600"
//                                     style={{ height: `${h}px` }}
//                                  ></div>
//                               ))}

//                            </div>

//                         </div>

//                         {/* Recent Chats */}

//                         <div className="rounded-2xl border border-gray-200 p-6">

//                            <h3 className="mb-6 text-xl font-bold">
//                               Recent Chats
//                            </h3>

//                            <div className="space-y-4">

//                               {[
//                                  "Rahul • Interested in Demo",
//                                  "Priya • Broadcast Query",
//                                  "Aman • Pricing Plan",
//                                  "Neha • AI Chatbot Setup",
//                               ].map((chat) => (

//                                  <div
//                                     key={chat}
//                                     className="flex items-center justify-between rounded-xl bg-gray-50 p-4 hover:bg-blue-50"
//                                  >

//                                     <span>{chat}</span>

//                                     <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
//                                        Online
//                                     </span>

//                                  </div>

//                               ))}

//                            </div>

//                         </div>

//                      </div>

//                   </div>

//                </div>

//             </div>

//          </div>
//       </section>
//    );
// };

// export default DashboardPreview;


// ==================== IMPORT IMAGE ====================
// Apni image yahan import karo
import dashboardMainImage from "../../assets/images/Dashboard.png";

// ==================== MAIN COMPONENT ====================

const DashboardPreview = () => {
   return (
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-blue-50 py-10">
         {/* Background Decorations */}
         <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-green-100 opacity-20 blur-3xl"></div>
         </div>

         <div className="relative mx-auto max-w-7xl px-6">

            {/* ==================== HEADING ==================== */}
            <div className="mx-auto max-w-3xl text-center">
               <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-2 text-sm font-semibold text-blue-600 shadow-sm">
                  📊 DASHBOARD
               </span>

               <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                  Manage Everything From
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                     One Dashboard
                  </span>
               </h2>

               <p className="mt-6 text-lg leading-relaxed text-gray-600">
                  Chat, Broadcast, Contacts, Reports and AI Automation — everything
                  in one modern dashboard.
               </p>
            </div>

            {/* ==================== DASHBOARD IMAGE ==================== */}
            <div className="mt-20">
               <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl transition-all duration-500 hover:shadow-3xl">

                  {/* Image */}
                  <img
                     src={dashboardMainImage}
                     alt="SP Advertising Dashboard Preview"
                     className="w-full h-auto object-cover transition duration-700 hover:scale-105"
                     loading="lazy"
                  />

               </div>
            </div>

         </div>
      </section>
   );
};

export default DashboardPreview;