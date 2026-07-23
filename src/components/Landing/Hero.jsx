// import { Link } from "react-router-dom";

// const Hero = () => {
//    return (
//       <section className="overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50 py-16 lg:py-24">
//          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">

//             {/* Left */}
//             <div>

//                <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
//                   🚀 Official WhatsApp Business API
//                </span>

//                <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900 lg:text-7xl">
//                   Automate Customer
//                   <br />
//                   Conversations
//                   <span className="text-blue-600"> with AI</span>
//                </h1>

//                <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
//                   Build AI Chatbots, send Broadcast Campaigns, manage Live Chat,
//                   Contacts, Templates and Reports from one powerful dashboard.
//                </p>

//                <div className="mt-8 flex flex-wrap gap-3">
//                   {[
//                      "🤖 AI Chatbot",
//                      "📢 Broadcast",
//                      "💬 Live Chat",
//                      "👥 Contacts",
//                   ].map((item) => (
//                      <span
//                         key={item}
//                         className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
//                      >
//                         {item}
//                      </span>
//                   ))}
//                </div>

//                <div className="mt-10 flex flex-wrap gap-4">
//                   <Link
//                      to="/register"
//                      className="rounded-xl bg-green-500 px-7 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-green-600"
//                   >
//                      Start Free Trial
//                   </Link>

//                   <Link
//                      to="/login"
//                      className="rounded-xl border-2 border-blue-600 px-7 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
//                   >
//                      Book Demo →
//                   </Link>
//                </div>

//                <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium text-gray-600">
//                   <span>✔ Official Meta API</span>
//                   <span>✔ No Coding Required</span>
//                   <span>✔ Quick Setup</span>
//                </div>

//             </div>

//             {/* Right */}
//             <div className="relative">

//                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">

//                   {/* Top Bar */}
//                   <div className="flex h-16 items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 px-6 text-white">

//                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
//                      <div className="h-3 w-3 rounded-full bg-yellow-300"></div>
//                      <div className="h-3 w-3 rounded-full bg-green-400"></div>

//                      <span className="ml-2 font-semibold">
//                         SP Advertising Dashboard
//                      </span>

//                   </div>

//                   {/* Body */}
//                   <div className="space-y-8 p-8">

//                      {/* Stats */}
//                      <div className="grid grid-cols-3 gap-4">

//                         <div className="rounded-xl bg-gray-50 p-5 text-center transition hover:-translate-y-1 hover:shadow-md">
//                            <p className="text-sm text-gray-500">Chats</p>
//                            <h2 className="mt-2 text-3xl font-bold text-green-500">
//                               1,245
//                            </h2>
//                         </div>

//                         <div className="rounded-xl bg-gray-50 p-5 text-center transition hover:-translate-y-1 hover:shadow-md">
//                            <p className="text-sm text-gray-500">Broadcast</p>
//                            <h2 className="mt-2 text-3xl font-bold text-blue-600">
//                               58
//                            </h2>
//                         </div>

//                         <div className="rounded-xl bg-gray-50 p-5 text-center transition hover:-translate-y-1 hover:shadow-md">
//                            <p className="text-sm text-gray-500">Leads</p>
//                            <h2 className="mt-2 text-3xl font-bold text-purple-600">
//                               326
//                            </h2>
//                         </div>

//                      </div>

//                      {/* Recent Chats */}
//                      <div>

//                         <h3 className="mb-5 text-lg font-semibold text-gray-800">
//                            Recent Chats
//                         </h3>

//                         <div className="space-y-4">

//                            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4 transition hover:bg-blue-50">
//                               <div>
//                                  <p className="font-semibold text-gray-800">
//                                     Rahul Sharma
//                                  </p>
//                                  <p className="text-sm text-gray-500">
//                                     Pricing Inquiry
//                                  </p>
//                               </div>

//                               <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
//                                  Online
//                               </span>
//                            </div>

//                            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4 transition hover:bg-blue-50">
//                               <div>
//                                  <p className="font-semibold text-gray-800">
//                                     Aman Gupta
//                                  </p>
//                                  <p className="text-sm text-gray-500">
//                                     Need Demo
//                                  </p>
//                               </div>

//                               <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
//                                  Pending
//                               </span>
//                            </div>

//                            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4 transition hover:bg-blue-50">
//                               <div>
//                                  <p className="font-semibold text-gray-800">
//                                     Priya Singh
//                                  </p>
//                                  <p className="text-sm text-gray-500">
//                                     Broadcast Campaign
//                                  </p>
//                               </div>

//                               <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
//                                  Replied
//                               </span>
//                            </div>

//                         </div>

//                      </div>

//                   </div>

//                </div>

//                {/* Floating Cards */}

//                <div className="absolute -left-8 top-10 hidden rounded-2xl bg-white p-4 shadow-xl lg:block">
//                   <p className="text-xs text-gray-500">
//                      Messages Today
//                   </p>
//                   <h3 className="mt-1 text-2xl font-bold text-green-500">
//                      +2,480
//                   </h3>
//                </div>

//                <div className="absolute -right-8 bottom-10 hidden rounded-2xl bg-white p-4 shadow-xl lg:block">
//                   <p className="text-xs text-gray-500">
//                      AI Replies
//                   </p>
//                   <h3 className="mt-1 text-2xl font-bold text-blue-600">
//                      98%
//                   </h3>
//                </div>

//             </div>

//          </div>
//       </section>
//    );
// };

// export default Hero;

import { Link } from "react-router-dom";
import {
   FiMessageCircle,
   FiSend,
   FiUsers,
   FiCheckCircle,
   FiTrendingUp,
   FiZap,
   FiArrowRight
} from "react-icons/fi";
import {
   RiRobot2Line,
   RiWhatsappLine
} from "react-icons/ri";
import {
   HiOutlineSparkles
} from "react-icons/hi";

// Import your dashboard image
import dashboardImage from "../../assets/images/Dashboard.png";

// ==================== CONSTANTS ====================

const FEATURES = [
   { icon: RiRobot2Line, label: "AI Chatbot" },
   { icon: FiSend, label: "Broadcast" },
   { icon: FiMessageCircle, label: "Live Chat" },
   { icon: FiUsers, label: "Contacts" },
];

const BENEFITS = [
   { icon: FiCheckCircle, text: "Official Meta API" },
   { icon: FiCheckCircle, text: "No Coding Required" },
   { icon: FiCheckCircle, text: "Quick Setup" },
];

const FLOATING_STATS = [
   {
      position: "-left-8 top-10",
      label: "Messages Today",
      value: "+2,480",
      icon: FiTrendingUp,
      color: "green",
   },
   {
      position: "-right-8 bottom-10",
      label: "AI Replies",
      value: "98%",
      icon: FiZap,
      color: "blue",
   },
];

// ==================== HELPER FUNCTIONS ====================

const getColorClasses = (color, type = "bg") => {
   const colors = {
      green: {
         bg: "bg-green-50",
         text: "text-green-700",
         badge: "bg-green-100 text-green-700",
      },
      blue: {
         bg: "bg-blue-50",
         text: "text-blue-700",
         badge: "bg-blue-100 text-blue-700",
      },
   };
   return colors[color]?.[type] || colors.blue[type];
};

// ==================== SUB-COMPONENTS ====================

const FeatureBadge = ({ icon: Icon, label }) => (
   <span className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white">
      <Icon className="h-4 w-4" />
      {label}
   </span>
);

const BenefitItem = ({ icon: Icon, text }) => (
   <span className="flex items-center gap-2 text-gray-600">
      <Icon className="h-4 w-4 text-green-600" />
      {text}
   </span>
);

const FloatingCard = ({ position, label, value, icon: Icon, color }) => (
   <div className={`absolute ${position} hidden animate-float rounded-2xl bg-white p-4 shadow-xl lg:block`}>
      <div className="flex items-center gap-2">
         <div className={`rounded-lg ${getColorClasses(color, "bg")} p-2`}>
            <Icon className={`h-5 w-5 ${getColorClasses(color, "text")}`} />
         </div>
         <div>
            <p className="text-xs text-gray-500">{label}</p>
            <h3 className={`text-2xl font-bold ${getColorClasses(color, "text")}`}>
               {value}
            </h3>
         </div>
      </div>
   </div>
);

// ==================== MAIN COMPONENT ====================

const Hero = () => {
   return (
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50 py-16 lg:py-10">

         {/* Animated Background Elements */}
         <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-4 top-20 h-72 w-72 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
            <div className="absolute -right-4 bottom-20 h-72 w-72 rounded-full bg-green-200 opacity-20 blur-3xl"></div>
         </div>

         <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">

            {/* ==================== LEFT CONTENT ==================== */}
            <div className="space-y-8">

               {/* Badge */}
               <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                  <RiWhatsappLine className="h-5 w-5" />
                  Official WhatsApp Business API
               </div>

               {/* Heading */}
               <h1 className="text-5xl font-extrabold leading-tight text-gray-900 lg:text-6xl xl:text-7xl">
                  Automate Customer
                  <br />
                  Conversations
                  <span className="relative">
                     <span className="text-blue-600"> with AI</span>
                     <HiOutlineSparkles className="absolute -right-8 -top-2 h-8 w-8 text-yellow-400 animate-pulse" />
                  </span>
               </h1>

               {/* Description */}
               <p className="max-w-xl text-lg leading-relaxed text-gray-600">
                  Build AI Chatbots, send Broadcast Campaigns, manage Live Chat,
                  Contacts, Templates and Reports from one powerful dashboard.
               </p>

               {/* Feature Badges */}
               <div className="flex flex-wrap gap-3">
                  {FEATURES.map((feature, index) => (
                     <FeatureBadge key={index} {...feature} />
                  ))}
               </div>

               {/* CTA Buttons */}
               <div className="flex flex-wrap gap-4">
                  <Link
                     to="/register"
                     className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-7 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                  >
                     Start Free Trial
                     <FiArrowRight className="transition group-hover:translate-x-1" />
                  </Link>

                  <Link
                     to="/login"
                     className="inline-flex items-center gap-2 rounded-xl border-2 border-blue-600 px-7 py-3.5 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                  >
                     Book Demo
                     <FiArrowRight />
                  </Link>
               </div>

               {/* Benefits */}
               <div className="flex flex-wrap gap-6 text-sm font-medium">
                  {BENEFITS.map((benefit, index) => (
                     <BenefitItem key={index} {...benefit} />
                  ))}
               </div>

            </div>

            {/* ==================== RIGHT DASHBOARD IMAGE ==================== */}
            <div className="relative lg:-mt-10">

               {/* Main Dashboard Card with Image */}
               <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl transition hover:shadow-3xl">

                  {/* Top Bar */}
                  <div className="flex h-16 items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 px-6 text-white">
                     <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-300"></div>
                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                     </div>
                     <span className="ml-2 font-semibold">SP Advertising Dashboard</span>
                  </div>

                  {/* Dashboard Image */}
                  <div className="relative overflow-hidden bg-gray-50">
                     <img
                        src={dashboardImage}
                        alt="SP Advertising Dashboard Preview"
                        className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                        loading="lazy"
                     />

                     {/* Optional Overlay Gradient */}
                     <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
                  </div>

               </div>

               {/* Floating Stats Cards */}
               {FLOATING_STATS.map((stat, index) => (
                  <FloatingCard key={index} {...stat} />
               ))}

            </div>

         </div>

         {/* Add this to your global CSS for animation */}
         <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      </section>
   );
};

export default Hero;