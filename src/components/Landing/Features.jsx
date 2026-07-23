// const features = [
//    {
//       icon: "🤖",
//       title: "AI Chatbot",
//       desc: "Automate customer conversations with an intelligent WhatsApp chatbot.",
//    },
//    {
//       icon: "📢",
//       title: "Broadcast",
//       desc: "Send bulk promotional and transactional messages in just a few clicks.",
//    },
//    {
//       icon: "💬",
//       title: "Live Chat",
//       desc: "Manage all WhatsApp conversations from one centralized inbox.",
//    },
//    {
//       icon: "👥",
//       title: "Contact Management",
//       desc: "Store, organize and manage unlimited customer contacts.",
//    },
//    {
//       icon: "📄",
//       title: "Message Templates",
//       desc: "Create and send approved WhatsApp template messages easily.",
//    },
//    {
//       icon: "🔄",
//       title: "Auto Follow-up",
//       desc: "Automatically follow up with customers without manual work.",
//    },
//    {
//       icon: "📊",
//       title: "Reports & Analytics",
//       desc: "Track conversations, campaigns and customer engagement.",
//    },
//    {
//       icon: "📞",
//       title: "Calling Integration",
//       desc: "Connect calling services and manage customer communication.",
//    },
// ];

// const Features = () => {
//    return (
//       <section
//          id="features"
//          className="bg-white py-20 lg:py-28"
//       >
//          <div className="mx-auto max-w-7xl px-6">

//             {/* Heading */}

//             <div className="mx-auto max-w-3xl text-center">

//                <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
//                   Features
//                </span>

//                <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
//                   Everything You Need to
//                   <br />
//                   Grow Your Business
//                </h2>

//                <p className="mt-6 text-lg leading-8 text-gray-600">
//                   One platform to automate WhatsApp communication,
//                   manage leads and improve customer engagement.
//                </p>

//             </div>

//             {/* Cards */}

//             <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

//                {features.map((item, index) => (
//                   <div
//                      key={index}
//                      className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-2xl"
//                   >

//                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 text-3xl transition group-hover:scale-110">
//                         {item.icon}
//                      </div>

//                      <h3 className="mb-4 text-xl font-bold text-gray-900">
//                         {item.title}
//                      </h3>

//                      <p className="leading-7 text-gray-600">
//                         {item.desc}
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
   FiMessageCircle,
   FiSend,
   FiUsers,
   FiFileText,
   FiRepeat,
   FiBarChart2,
   FiPhone,
   FiZap
} from "react-icons/fi";
import {
   RiRobot2Line
} from "react-icons/ri";

// ==================== CONSTANTS ====================

const FEATURES_DATA = [
   {
      icon: RiRobot2Line,
      title: "AI Chatbot",
      description: "Automate customer conversations with an intelligent WhatsApp chatbot.",
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
   },
   {
      icon: FiSend,
      title: "Broadcast",
      description: "Send bulk promotional and transactional messages in just a few clicks.",
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
   },
   {
      icon: FiMessageCircle,
      title: "Live Chat",
      description: "Manage all WhatsApp conversations from one centralized inbox.",
      color: "green",
      gradient: "from-green-500 to-green-600",
   },
   {
      icon: FiUsers,
      title: "Contact Management",
      description: "Store, organize and manage unlimited customer contacts.",
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
   },
   {
      icon: FiFileText,
      title: "Message Templates",
      description: "Create and send approved WhatsApp template messages easily.",
      color: "pink",
      gradient: "from-pink-500 to-pink-600",
   },
   {
      icon: FiRepeat,
      title: "Auto Follow-up",
      description: "Automatically follow up with customers without manual work.",
      color: "indigo",
      gradient: "from-indigo-500 to-indigo-600",
   },
   {
      icon: FiBarChart2,
      title: "Reports & Analytics",
      description: "Track conversations, campaigns and customer engagement.",
      color: "cyan",
      gradient: "from-cyan-500 to-cyan-600",
   },
   {
      icon: FiPhone,
      title: "Calling Integration",
      description: "Connect calling services and manage customer communication.",
      color: "teal",
      gradient: "from-teal-500 to-teal-600",
   },
];

// ==================== HELPER FUNCTIONS ====================

const getColorClasses = (color) => {
   const colors = {
      blue: {
         bg: "bg-blue-50",
         text: "text-blue-600",
         iconBg: "from-blue-50 to-blue-100",
         hoverBorder: "hover:border-blue-200",
      },
      purple: {
         bg: "bg-purple-50",
         text: "text-purple-600",
         iconBg: "from-purple-50 to-purple-100",
         hoverBorder: "hover:border-purple-200",
      },
      green: {
         bg: "bg-green-50",
         text: "text-green-600",
         iconBg: "from-green-50 to-green-100",
         hoverBorder: "hover:border-green-200",
      },
      orange: {
         bg: "bg-orange-50",
         text: "text-orange-600",
         iconBg: "from-orange-50 to-orange-100",
         hoverBorder: "hover:border-orange-200",
      },
      pink: {
         bg: "bg-pink-50",
         text: "text-pink-600",
         iconBg: "from-pink-50 to-pink-100",
         hoverBorder: "hover:border-pink-200",
      },
      indigo: {
         bg: "bg-indigo-50",
         text: "text-indigo-600",
         iconBg: "from-indigo-50 to-indigo-100",
         hoverBorder: "hover:border-indigo-200",
      },
      cyan: {
         bg: "bg-cyan-50",
         text: "text-cyan-600",
         iconBg: "from-cyan-50 to-cyan-100",
         hoverBorder: "hover:border-cyan-200",
      },
      teal: {
         bg: "bg-teal-50",
         text: "text-teal-600",
         iconBg: "from-teal-50 to-teal-100",
         hoverBorder: "hover:border-teal-200",
      },
   };
   return colors[color] || colors.blue;
};

// ==================== SUB-COMPONENTS ====================

const SectionHeader = () => (
   <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-green-50 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
         <FiZap className="h-4 w-4" />
         Features
      </div>

      <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
         Everything You Need to
         <br />
         <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Grow Your Business
         </span>
      </h2>

      <p className="mt-6 text-lg leading-relaxed text-gray-600">
         One platform to automate WhatsApp communication,
         manage leads and improve customer engagement.
      </p>
   </div>
);

const FeatureCard = ({ icon: Icon, title, description, color, gradient }) => {
   const colorClasses = getColorClasses(color);

   return (
      <div
         className={`group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 ${colorClasses.hoverBorder} hover:shadow-2xl`}
      >
         {/* Gradient Overlay on Hover */}
         <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

         {/* Content */}
         <div className="relative z-10">

            {/* Icon Container */}
            <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${colorClasses.iconBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
               <Icon className={`h-8 w-8 ${colorClasses.text}`} />
            </div>

            {/* Title */}
            <h3 className="mb-4 text-xl font-bold text-gray-900 transition-colors group-hover:text-gray-900">
               {title}
            </h3>

            {/* Description */}
            <p className="leading-7 text-gray-600">
               {description}
            </p>

            {/* Decorative Element */}
            <div className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${gradient} opacity-0 transition-all duration-300 group-hover:w-20 group-hover:opacity-100`}></div>
         </div>
      </div>
   );
};

// ==================== MAIN COMPONENT ====================

const Features = () => {
   return (
      <section
         id="features"
         className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-20 lg:py-28"
      >
         {/* Background Decorations */}
         <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/4 top-10 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            <div className="absolute right-1/4 bottom-10 h-96 w-96 rounded-full bg-green-100 opacity-20 blur-3xl"></div>
         </div>

         <div className="relative mx-auto max-w-7xl px-6">

            {/* Section Header */}
            <SectionHeader />

            {/* Feature Cards Grid */}
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
               {FEATURES_DATA.map((feature, index) => (
                  <FeatureCard
                     key={index}
                     icon={feature.icon}
                     title={feature.title}
                     description={feature.description}
                     color={feature.color}
                     gradient={feature.gradient}
                  />
               ))}
            </div>

            {/* Optional CTA Section */}
            {/* <div className="mt-16 text-center">
               <p className="text-gray-600">
                  Want to see all features in action?
               </p>
               <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                  <FiZap className="h-5 w-5" />
                  Explore All Features
               </button>
            </div> */}

         </div>
      </section>
   );
};

export default Features;