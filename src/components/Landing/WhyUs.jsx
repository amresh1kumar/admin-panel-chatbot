// import { Link } from "react-router-dom";

// const points = [
//    {
//       title: "Official WhatsApp API",
//       desc: "100% Official Meta WhatsApp Business API integration for secure and reliable messaging.",
//    },
//    {
//       title: "AI Powered Automation",
//       desc: "Automate replies, lead qualification and follow-ups using AI-powered workflows.",
//    },
//    {
//       title: "All-in-One Dashboard",
//       desc: "Manage chats, contacts, broadcasts and reports from one modern dashboard.",
//    },
//    {
//       title: "Enterprise Security",
//       desc: "Role-based access, encrypted data and enterprise-grade cloud security.",
//    },
// ];

// const WhyUs = () => {
//    return (
//       <section className="bg-gradient-to-b from-white to-slate-50 py-24">
//          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

//             {/* Left */}

//             <div>

//                <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
//                   WHY CHOOSE US
//                </span>

//                <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
//                   Built for Businesses
//                   <br />
//                   That Want to
//                   <span className="text-blue-600"> Scale Faster</span>
//                </h2>

//                <p className="mt-6 text-lg leading-8 text-gray-600">
//                   SP Advertising helps businesses automate customer communication,
//                   generate more qualified leads and improve customer engagement
//                   through the Official WhatsApp Business API.
//                </p>

//                {/* Small Stats */}

//                <div className="mt-10 grid grid-cols-2 gap-5">

//                   <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
//                      <h3 className="text-3xl font-bold text-green-500">
//                         24×7
//                      </h3>
//                      <p className="mt-2 text-gray-600">
//                         AI Automation
//                      </p>
//                   </div>

//                   <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
//                      <h3 className="text-3xl font-bold text-blue-600">
//                         100%
//                      </h3>
//                      <p className="mt-2 text-gray-600">
//                         Official Meta API
//                      </p>
//                   </div>

//                </div>

//                <Link
//                   to="/register"
//                   className="mt-10 inline-flex rounded-xl bg-green-500 px-7 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-green-600 hover:shadow-xl"
//                >
//                   Get Started Free →
//                </Link>

//             </div>

//             {/* Right */}

//             <div className="grid gap-6">

//                {points.map((item, index) => (

//                   <div
//                      key={index}
//                      className="group flex gap-5 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-2xl"
//                   >

//                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 text-xl font-bold text-white transition group-hover:scale-110">
//                         ✓
//                      </div>

//                      <div>

//                         <h3 className="text-xl font-bold text-gray-900">
//                            {item.title}
//                         </h3>

//                         <p className="mt-3 leading-7 text-gray-600">
//                            {item.desc}
//                         </p>

//                      </div>

//                   </div>

//                ))}

//             </div>

//          </div>
//       </section>
//    );
// };

// export default WhyUs;

import { Link } from "react-router-dom";
import {
   FiCheckCircle,
   FiShield,
   FiZap,
   FiLayers,
   FiArrowRight,
   FiStar,
   FiTrendingUp,
   FiMessageCircle
} from "react-icons/fi";
import {
   RiWhatsappLine,
   RiRobot2Line,
   RiDashboardLine
} from "react-icons/ri";
import {
   HiOutlineSparkles
} from "react-icons/hi";

// ==================== CONSTANTS ====================

const WHY_US_POINTS = [
   {
      title: "Official WhatsApp API",
      description: "100% Official Meta WhatsApp Business API integration for secure and reliable messaging.",
      icon: RiWhatsappLine,
      gradient: "from-green-500 to-emerald-600",
      lightBg: "from-green-50 to-emerald-50",
      color: "green",
   },
   {
      title: "AI Powered Automation",
      description: "Automate replies, lead qualification and follow-ups using AI-powered workflows.",
      icon: RiRobot2Line,
      gradient: "from-blue-500 to-indigo-600",
      lightBg: "from-blue-50 to-indigo-50",
      color: "blue",
   },
   {
      title: "All-in-One Dashboard",
      description: "Manage chats, contacts, broadcasts and reports from one modern dashboard.",
      icon: RiDashboardLine,
      gradient: "from-purple-500 to-pink-600",
      lightBg: "from-purple-50 to-pink-50",
      color: "purple",
   },
   {
      title: "Enterprise Security",
      description: "Role-based access, encrypted data and enterprise-grade cloud security.",
      icon: FiShield,
      gradient: "from-orange-500 to-red-600",
      lightBg: "from-orange-50 to-red-50",
      color: "orange",
   },
];

const STATS_DATA = [
   {
      value: "24×7",
      label: "AI Automation",
      icon: FiZap,
      color: "green",
      gradient: "from-green-500 to-emerald-600"
   },
   {
      value: "100%",
      label: "Official Meta API",
      icon: RiWhatsappLine,
      color: "blue",
      gradient: "from-blue-500 to-indigo-600"
   },
];

const TRUST_BADGES = [
   { icon: FiStar, text: "Trusted by 500+ Businesses" },
   { icon: FiTrendingUp, text: "98% Customer Satisfaction" },
   { icon: FiMessageCircle, text: "50K+ Conversations Automated" },
];

// ==================== HELPER FUNCTIONS ====================

const getColorClasses = (color) => {
   const colors = {
      green: {
         text: "text-green-600",
         bg: "bg-green-50",
         border: "border-green-200",
         hover: "hover:border-green-300 hover:shadow-green-200",
         iconBg: "bg-green-100"
      },
      blue: {
         text: "text-blue-600",
         bg: "bg-blue-50",
         border: "border-blue-200",
         hover: "hover:border-blue-300 hover:shadow-blue-200",
         iconBg: "bg-blue-100"
      },
      purple: {
         text: "text-purple-600",
         bg: "bg-purple-50",
         border: "border-purple-200",
         hover: "hover:border-purple-300 hover:shadow-purple-200",
         iconBg: "bg-purple-100"
      },
      orange: {
         text: "text-orange-600",
         bg: "bg-orange-50",
         border: "border-orange-200",
         hover: "hover:border-orange-300 hover:shadow-orange-200",
         iconBg: "bg-orange-100"
      },
   };
   return colors[color] || colors.blue;
};

// ==================== SUB-COMPONENTS ====================

const SectionBadge = () => (
   <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-2 text-sm font-semibold text-blue-600 shadow-sm">
      <HiOutlineSparkles className="h-4 w-4" />
      WHY CHOOSE US
   </div>
);

const SectionHeading = () => (
   <div>
      <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
         Built for Businesses
         <br />
         That Want to
         <span className="relative">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
               {" "}Scale Faster
            </span>
            <HiOutlineSparkles className="absolute -right-8 -top-2 h-8 w-8 text-yellow-400 animate-pulse" />
         </span>
      </h2>

      <p className="mt-6 text-lg leading-relaxed text-gray-600">
         SP Advertising helps businesses automate customer communication,
         generate more qualified leads and improve customer engagement
         through the Official WhatsApp Business API.
      </p>
   </div>
);

const StatsGrid = () => (
   <div className="mt-10 grid grid-cols-2 gap-5">
      {STATS_DATA.map((stat, index) => (
         <div
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
         >
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}></div>

            {/* Content */}
            <div className="relative z-10">
               <div className="flex items-center justify-between">
                  <h3 className={`text-3xl font-bold ${getColorClasses(stat.color).text}`}>
                     {stat.value}
                  </h3>
                  <div className={`rounded-lg ${getColorClasses(stat.color).bg} p-2`}>
                     <stat.icon className={`h-5 w-5 ${getColorClasses(stat.color).text}`} />
                  </div>
               </div>
               <p className="mt-2 text-gray-600 font-medium">{stat.label}</p>

               {/* Decorative Line */}
               <div className={`mt-3 h-1 w-12 rounded-full bg-gradient-to-r ${stat.gradient} opacity-0 transition-all duration-300 group-hover:w-20 group-hover:opacity-100`}></div>
            </div>
         </div>
      ))}
   </div>
);

const CTASection = () => (
   <div className="mt-10 space-y-4">
      <Link
         to="/register"
         className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
         Get Started Free
         <FiArrowRight className="transition-transform group-hover:translate-x-1" />
      </Link>

      {/* Trust Badges */}
      {/* <div className="flex flex-wrap gap-4">
         {TRUST_BADGES.map((badge, index) => (
            <div key={index} className="flex items-center gap-1.5 text-sm text-gray-500">
               <badge.icon className={`h-4 w-4 ${index === 0 ? "text-yellow-500" :
                     index === 1 ? "text-green-500" :
                        "text-blue-500"
                  }`} />
               {badge.text}
            </div>
         ))}
      </div> */}
   </div>
);

const WhyUsPoint = ({ point, index }) => {
   const Icon = point.icon;
   const colorClasses = getColorClasses(point.color);

   return (
      <div className={`group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 ${colorClasses.hover} hover:shadow-2xl`}>
         {/* Gradient Overlay */}
         <div className={`absolute inset-0 bg-gradient-to-br ${point.lightBg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}></div>

         {/* Content */}
         <div className="relative z-10 flex gap-5">

            {/* Icon Circle */}
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${point.gradient} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
               <Icon className="h-8 w-8 text-white" />
            </div>

            {/* Text Content */}
            <div className="flex-1">
               <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-900">
                  {point.title}
               </h3>
               <p className="mt-3 leading-7 text-gray-600">
                  {point.description}
               </p>

               {/* Decorative Bottom Line */}
               <div className={`mt-4 h-1 w-12 rounded-full bg-gradient-to-r ${point.gradient} opacity-0 transition-all duration-300 group-hover:w-24 group-hover:opacity-100`}></div>
            </div>

            {/* Arrow Icon */}
            <div className={`hidden lg:flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${colorClasses.text}`}>
               <FiArrowRight className="h-6 w-6" />
            </div>
         </div>
      </div>
   );
};

// ==================== MAIN COMPONENT ====================

const WhyUs = () => {
   return (
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-slate-50 py-24 lg:py-32">
         {/* Background Decorations */}
         <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-green-100 opacity-20 blur-3xl"></div>
            <div className="absolute left-1/2 top-1/2 h-64 w-64 rounded-full bg-purple-100 opacity-10 blur-3xl"></div>
         </div>

         <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

            {/* ==================== LEFT CONTENT ==================== */}
            <div className="space-y-8">
               {/* Badge */}
               <SectionBadge />

               {/* Heading & Description */}
               <SectionHeading />

               {/* Stats Cards */}
               <StatsGrid />

               {/* CTA Buttons */}
               <CTASection />
            </div>

            {/* ==================== RIGHT POINTS ==================== */}
            <div className="space-y-6">
               {WHY_US_POINTS.map((point, index) => (
                  <WhyUsPoint key={index} point={point} index={index} />
               ))}
            </div>

         </div>
      </section>
   );
};

export default WhyUs;