// import {
//    FiPhoneCall,
//    FiUsers,
//    FiCalendar,
//    FiRefreshCw,
//    FiBarChart2,
//    FiMic,
// } from "react-icons/fi";

// const features = [
//    {
//       icon: <FiPhoneCall size={28} />,
//       title: "AI Outbound Calling",
//       description:
//          "Automate outbound calls to leads and customers with natural AI voice conversations.",
//    },
//    {
//       icon: <FiUsers size={28} />,
//       title: "Lead Qualification",
//       description:
//          "Automatically qualify prospects and capture customer responses for your sales team.",
//    },
//    {
//       icon: <FiCalendar size={28} />,
//       title: "Appointment Booking",
//       description:
//          "Schedule meetings and appointments during AI conversations without manual effort.",
//    },
//    {
//       icon: <FiRefreshCw size={28} />,
//       title: "CRM Integration",
//       description:
//          "Sync call outcomes, notes, and customer details directly with your CRM.",
//    },
//    {
//       icon: <FiBarChart2 size={28} />,
//       title: "Call Analytics",
//       description:
//          "Track call performance, conversations, and outcomes with real-time analytics.",
//    },
//    {
//       icon: <FiMic size={28} />,
//       title: "Inbound AI Calling",
//       description:
//          "Answer incoming customer calls with AI voice agents.",
//       comingSoon: true,
//    },
// ];

// const Features = () => {
//    return (
//       <section className="py-20 bg-gray-50">
//          <div className="max-w-7xl mx-auto px-6 lg:px-8">
//             {/* Heading */}
//             <div className="text-center max-w-3xl mx-auto">
//                <span className="text-blue-600 font-semibold uppercase tracking-wide">
//                   Features
//                </span>

//                <h2 className="mt-3 text-4xl font-bold text-gray-900">
//                   Everything You Need to Automate Voice Conversations
//                </h2>

//                <p className="mt-5 text-lg text-gray-600">
//                   Build AI voice agents that handle customer conversations,
//                   streamline operations, and help your business grow.
//                </p>
//             </div>

//             {/* Cards */}
//             <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//                {features.map((feature, index) => (
//                   <div
//                      key={index}
//                      className="relative bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-xl transition duration-300"
//                   >
//                      {feature.comingSoon && (
//                         <span className="absolute top-5 right-5 bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-1 rounded-full">
//                            Coming Soon
//                         </span>
//                      )}

//                      <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
//                         {feature.icon}
//                      </div>

//                      <h3 className="mt-6 text-xl font-semibold text-gray-900">
//                         {feature.title}
//                      </h3>

//                      <p className="mt-3 text-gray-600 leading-7">
//                         {feature.description}
//                      </p>
//                   </div>
//                ))}
//             </div>
//          </div>
//       </section>
//    );
// };

// export default Features;

import {
   FiPhoneCall,
   FiUsers,
   FiCalendar,
   FiRefreshCw,
   FiBarChart2,
   FiMic,
   FiCheckCircle,
   FiZap
} from "react-icons/fi";
import {
   HiOutlineSparkles
} from "react-icons/hi";

// ==================== CONSTANTS ====================

const FEATURES_DATA = [
   {
      icon: FiPhoneCall,
      title: "AI Outbound Calling",
      description: "Automate outbound calls to leads and customers with natural AI voice conversations.",
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      lightBg: "from-blue-50 to-indigo-50",
      stats: "10x more calls"
   },
   {
      icon: FiUsers,
      title: "Lead Qualification",
      description: "Automatically qualify prospects and capture customer responses for your sales team.",
      color: "green",
      gradient: "from-green-500 to-emerald-600",
      lightBg: "from-green-50 to-emerald-50",
      stats: "85% accuracy"
   },
   {
      icon: FiCalendar,
      title: "Appointment Booking",
      description: "Schedule meetings and appointments during AI conversations without manual effort.",
      color: "purple",
      gradient: "from-purple-500 to-pink-600",
      lightBg: "from-purple-50 to-pink-50",
      stats: "24/7 booking"
   },
   {
      icon: FiRefreshCw,
      title: "CRM Integration",
      description: "Sync call outcomes, notes, and customer details directly with your CRM.",
      color: "orange",
      gradient: "from-orange-500 to-red-600",
      lightBg: "from-orange-50 to-red-50",
      stats: "Real-time sync"
   },
   {
      icon: FiBarChart2,
      title: "Call Analytics",
      description: "Track call performance, conversations, and outcomes with real-time analytics.",
      color: "cyan",
      gradient: "from-cyan-500 to-blue-600",
      lightBg: "from-cyan-50 to-blue-50",
      stats: "Live dashboard"
   },
   {
      icon: FiMic,
      title: "Inbound AI Calling",
      description: "Answer incoming customer calls with AI voice agents.",
      color: "teal",
      gradient: "from-teal-500 to-green-600",
      lightBg: "from-teal-50 to-green-50",
      stats: "Coming soon",
      comingSoon: true
   },
];

// ==================== HELPER FUNCTIONS ====================

const getColorClasses = (color) => {
   const colors = {
      blue: { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", hover: "hover:border-blue-300" },
      green: { text: "text-green-600", bg: "bg-green-50", border: "border-green-200", hover: "hover:border-green-300" },
      purple: { text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200", hover: "hover:border-purple-300" },
      orange: { text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", hover: "hover:border-orange-300" },
      cyan: { text: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-200", hover: "hover:border-cyan-300" },
      teal: { text: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200", hover: "hover:border-teal-300" },
   };
   return colors[color] || colors.blue;
};

// ==================== SUB-COMPONENTS ====================

const SectionHeader = () => (
   <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-green-50 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600 shadow-sm">
         <FiZap className="h-4 w-4" />
         Features
      </div>

      <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
         Everything You Need to
         <br />
         <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Automate Voice Conversations
         </span>
      </h2>

      <p className="mt-6 text-lg leading-relaxed text-gray-600">
         Build AI voice agents that handle customer conversations,
         streamline operations, and help your business grow.
      </p>
   </div>
);

const FeatureCard = ({ feature, index }) => {
   const Icon = feature.icon;
   const colorClasses = getColorClasses(feature.color);

   return (
      <div
         className={`group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 ${feature.comingSoon
            ? "hover:border-yellow-300 hover:shadow-yellow-200"
            : `${colorClasses.hover} hover:shadow-2xl`
            }`}
      >
         {/* Gradient Overlay on Hover */}
         <div className={`absolute inset-0 bg-gradient-to-br ${feature.lightBg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}></div>

         {/* Coming Soon Badge */}
         {feature.comingSoon && (
            <div className="absolute right-4 top-4 z-10">
               <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 text-xs font-bold text-white shadow-lg">
                  <HiOutlineSparkles className="h-3 w-3" />
                  Coming Soon
               </span>
            </div>
         )}

         {/* Content */}
         <div className="relative z-10">

            {/* Icon Container */}
            <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.lightBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
               <Icon className={`h-8 w-8 ${colorClasses.text}`} />
            </div>

            {/* Title */}
            <h3 className="mt-6 text-xl font-bold text-gray-900 transition-colors group-hover:text-gray-900">
               {feature.title}
            </h3>

            {/* Description */}
            <p className="mt-4 leading-7 text-gray-600">
               {feature.description}
            </p>

            {/* Stats Badge */}
            <div className={`mt-5 inline-flex items-center gap-1 rounded-full ${colorClasses.bg} px-3 py-1 text-xs font-semibold ${colorClasses.text}`}>
               <FiCheckCircle className="h-3 w-3" />
               {feature.stats}
            </div>

            {/* Decorative Element */}
            <div className={`mt-5 h-1 w-12 rounded-full bg-gradient-to-r ${feature.gradient} opacity-0 transition-all duration-300 group-hover:w-20 group-hover:opacity-100`}></div>
         </div>
      </div>
   );
};

// ==================== MAIN COMPONENT ====================

const Features = () => {
   return (
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-20 lg:py-28">

         {/* Background Decorations */}
         <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/4 top-10 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            <div className="absolute right-1/4 bottom-10 h-96 w-96 rounded-full bg-green-100 opacity-20 blur-3xl"></div>
         </div>

         <div className="relative mx-auto max-w-7xl px-6">

            {/* Section Header */}
            <SectionHeader />

            {/* Feature Cards Grid */}
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
               {FEATURES_DATA.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} index={index} />
               ))}
            </div>

            {/* Optional CTA Section */}
            {/* <div className="mt-16 text-center">
               <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-r from-blue-600 via-green-500 to-emerald-600 p-1">
                  <div className="rounded-[calc(1.5rem-1px)] bg-white px-8 py-10">
                     <h3 className="text-2xl font-bold text-gray-900">
                        Ready to Transform Your Voice Communication?
                     </h3>
                     <p className="mt-4 text-gray-600">
                        Start your free trial today and experience the power of AI voice agents.
                     </p>
                     <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                        <FiZap className="h-5 w-5" />
                        Get Started Now
                     </button>
                  </div>
               </div>
            </div> */}

         </div>
      </section>
   );
};

export default Features;