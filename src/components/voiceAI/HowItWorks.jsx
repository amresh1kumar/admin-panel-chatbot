// import {
//    FiPhone,
//    FiSettings,
//    FiPhoneCall,
//    FiBarChart2,
// } from "react-icons/fi";

// const steps = [
//    {
//       icon: <FiPhone size={30} />,
//       step: "01",
//       title: "Get a Business Number",
//       description:
//          "Purchase a new virtual phone number or connect your existing business number to start using AI Voice.",
//    },
//    {
//       icon: <FiSettings size={30} />,
//       step: "02",
//       title: "Configure Your AI Agent",
//       description:
//          "Customize your AI agent with prompts, business knowledge, and conversation workflows.",
//    },
//    {
//       icon: <FiPhoneCall size={30} />,
//       step: "03",
//       title: "Launch AI Calls",
//       description:
//          "Start AI-powered conversations to engage customers, qualify leads, and automate repetitive calling tasks.",
//    },
//    {
//       icon: <FiBarChart2 size={30} />,
//       step: "04",
//       title: "Track Performance",
//       description:
//          "Monitor call recordings, transcripts, analytics, and conversation outcomes from your dashboard.",
//    },
// ];

// const HowItWorks = () => {
//    return (
//       <section className="bg-gray-50 py-20">
//          <div className="max-w-7xl mx-auto px-6 lg:px-8">
//             {/* Heading */}
//             <div className="text-center max-w-3xl mx-auto">
//                <span className="text-blue-600 font-semibold uppercase tracking-wider">
//                   How It Works
//                </span>

//                <h2 className="mt-3 text-4xl font-bold text-gray-900">
//                   Launch Your AI Voice Agent in 4 Simple Steps
//                </h2>

//                <p className="mt-5 text-lg text-gray-600">
//                   Set up your AI voice platform in minutes and automate customer
//                   conversations with ease.
//                </p>
//             </div>

//             {/* Steps */}
//             <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//                {steps.map((item) => (
//                   <div
//                      key={item.step}
//                      className="relative rounded-2xl bg-white border border-gray-200 p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
//                   >
//                      {/* Step Number */}
//                      <div className="absolute top-6 right-6 text-5xl font-bold text-gray-100">
//                         {item.step}
//                      </div>

//                      {/* Icon */}
//                      <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
//                         {item.icon}
//                      </div>

//                      {/* Title */}
//                      <h3 className="mt-6 text-xl font-semibold text-gray-900">
//                         {item.title}
//                      </h3>

//                      {/* Description */}
//                      <p className="mt-3 text-gray-600 leading-7">
//                         {item.description}
//                      </p>
//                   </div>
//                ))}
//             </div>
//          </div>
//       </section>
//    );
// };

// export default HowItWorks;




import {
   FiPhone,
   FiSettings,
   FiPhoneCall,
   FiBarChart2,
   FiCheckCircle,
   FiZap,
   FiArrowRight
} from "react-icons/fi";
import {
   HiOutlineSparkles
} from "react-icons/hi";

// ==================== CONSTANTS ====================

const STEPS_DATA = [
   {
      icon: FiPhone,
      step: "01",
      title: "Get a Business Number",
      description: "Purchase a new virtual phone number or connect your existing business number to start using AI Voice.",
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      lightBg: "from-blue-50 to-indigo-50",
      features: ["Virtual Number", "Port Existing", "Instant Setup"]
   },
   {
      icon: FiSettings,
      step: "02",
      title: "Configure Your AI Agent",
      description: "Customize your AI agent with prompts, business knowledge, and conversation workflows.",
      color: "green",
      gradient: "from-green-500 to-emerald-600",
      lightBg: "from-green-50 to-emerald-50",
      features: ["Custom Prompts", "Business Knowledge", "Workflow Builder"]
   },
   {
      icon: FiPhoneCall,
      step: "03",
      title: "Launch AI Calls",
      description: "Start AI-powered conversations to engage customers, qualify leads, and automate repetitive calling tasks.",
      color: "purple",
      gradient: "from-purple-500 to-pink-600",
      lightBg: "from-purple-50 to-pink-50",
      features: ["Outbound Campaigns", "Inbound Calls", "Live Transfer"]
   },
   {
      icon: FiBarChart2,
      step: "04",
      title: "Track Performance",
      description: "Monitor call recordings, transcripts, analytics, and conversation outcomes from your dashboard.",
      color: "orange",
      gradient: "from-orange-500 to-red-600",
      lightBg: "from-orange-50 to-red-50",
      features: ["Call Recordings", "Transcripts", "Analytics"]
   },
];

const CONNECTORS = [
   { label: "Setup", color: "from-blue-400 to-green-400" },
   { label: "Configure", color: "from-green-400 to-purple-400" },
   { label: "Monitor", color: "from-purple-400 to-orange-400" },
];

// ==================== HELPER FUNCTIONS ====================

const getColorClasses = (color) => {
   const colors = {
      blue: { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
      green: { text: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
      purple: { text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" },
      orange: { text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
   };
   return colors[color] || colors.blue;
};

// ==================== SUB-COMPONENTS ====================

const SectionHeader = () => (
   <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-green-50 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600 shadow-sm">
         <HiOutlineSparkles className="h-4 w-4" />
         How It Works
      </div>

      <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
         Launch Your AI Voice Agent
         <br />
         <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            in 4 Simple Steps
         </span>
      </h2>

      <p className="mt-6 text-lg leading-relaxed text-gray-600">
         Set up your AI voice platform in minutes and automate customer
         conversations with ease.
      </p>
   </div>
);

const StepCard = ({ step, index }) => {
   const Icon = step.icon;
   const colorClasses = getColorClasses(step.color);

   return (
      <div className="group relative">
         <div className={`relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${colorClasses.border}`}>

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${step.lightBg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}></div>

            {/* Content */}
            <div className="relative z-10">

               {/* Step Number */}
               <div className="absolute top-0 right-0 text-7xl font-bold text-gray-100/50 transition group-hover:text-gray-200/70">
                  {step.step}
               </div>

               {/* Icon Container */}
               <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.lightBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <Icon className={`h-8 w-8 ${colorClasses.text}`} />
               </div>

               {/* Title */}
               <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {step.title}
               </h3>

               {/* Description */}
               <p className="mt-4 leading-7 text-gray-600">
                  {step.description}
               </p>

               {/* Feature List */}
               <div className="mt-6 space-y-2">
                  {step.features.map((feature, idx) => (
                     <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <FiCheckCircle className={`h-4 w-4 ${index === 0 ? "text-blue-500" :
                              index === 1 ? "text-green-500" :
                                 index === 2 ? "text-purple-500" :
                                    "text-orange-500"
                           }`} />
                        {feature}
                     </div>
                  ))}
               </div>

               {/* Decorative Line */}
               <div className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${step.gradient} opacity-0 transition-all duration-300 group-hover:w-24 group-hover:opacity-100`}></div>
            </div>
         </div>

         {/* Connector Arrow */}
         {index < STEPS_DATA.length - 1 && (
            <div className="hidden lg:flex justify-center my-4">
               <div className="flex flex-col items-center">
                  <div className={`h-8 w-1 bg-gradient-to-b ${CONNECTORS[index].color} rounded-full`}></div>
                  <div className={`mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r ${CONNECTORS[index].color} shadow-lg`}>
                     <FiArrowRight className="h-4 w-4 text-white" />
                  </div>
                  <span className="mt-1 text-xs font-medium text-gray-400">{CONNECTORS[index].label}</span>
               </div>
            </div>
         )}
      </div>
   );
};

// ==================== MAIN COMPONENT ====================

const HowItWorks = () => {
   return (
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 lg:py-28">

         {/* Background Decorations */}
         <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/4 top-10 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            <div className="absolute right-1/4 bottom-10 h-96 w-96 rounded-full bg-green-100 opacity-20 blur-3xl"></div>
         </div>

         <div className="relative mx-auto max-w-7xl px-6">

            {/* Section Header */}
            <SectionHeader />

            {/* Steps Grid */}
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
               {STEPS_DATA.map((step, index) => (
                  <StepCard key={index} step={step} index={index} />
               ))}
            </div>

            {/* Bottom CTA */}
            {/* <div className="mt-16 text-center">
               <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-r from-blue-600 via-green-500 to-emerald-600 p-1">
                  <div className="rounded-[calc(1.5rem-1px)] bg-white px-8 py-10">
                     <h3 className="text-2xl font-bold text-gray-900">
                        Ready to Get Started?
                     </h3>
                     <p className="mt-4 text-gray-600">
                        Set up your AI voice agent in minutes and start automating calls today.
                     </p>
                     <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                        <FiZap className="h-5 w-5" />
                        Start Free Trial
                     </button>
                  </div>
               </div>
            </div> */}

         </div>
      </section>
   );
};

export default HowItWorks;