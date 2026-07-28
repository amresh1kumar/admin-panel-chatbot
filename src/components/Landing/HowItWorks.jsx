// const steps = [
//    {
//       number: "01",
//       title: "Connect WhatsApp",
//       desc: "Connect your Official WhatsApp Business API in just a few clicks.",
//    },
//    {
//       number: "02",
//       title: "Setup AI Chatbot",
//       desc: "Create chatbot flows, templates and automations without writing any code.",
//    },
//    {
//       number: "03",
//       title: "Start Growing",
//       desc: "Launch broadcasts, manage conversations and track everything from one dashboard.",
//    },
// ];

// const HowItWorks = () => {
//    return (
//       <section
//          id="how-it-works"
//          className="bg-gradient-to-b from-slate-50 to-white py-24"
//       >
//          <div className="mx-auto max-w-7xl px-6">

//             {/* Heading */}

//             <div className="mx-auto max-w-3xl text-center">

//                <span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-600">
//                   HOW IT WORKS
//                </span>

//                <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
//                   Get Started in 3 Easy Steps
//                </h2>

//                <p className="mt-6 text-lg leading-8 text-gray-600">
//                   Connect your WhatsApp Business API, configure your chatbot and
//                   start engaging customers in minutes.
//                </p>

//             </div>

//             {/* Timeline */}

//             <div className="relative mt-24">

//                {/* Center Line */}

//                <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-green-500 via-blue-500 to-green-500 lg:block"></div>

//                <div className="space-y-16">

//                   {steps.map((step, index) => (

//                      <div
//                         key={index}
//                         className={`flex items-center ${index % 2 === 0
//                               ? "lg:flex-row"
//                               : "lg:flex-row-reverse"
//                            } flex-col gap-10`}
//                      >

//                         {/* Card */}

//                         <div className="w-full lg:w-5/12">

//                            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

//                               <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600">
//                                  Step {step.number}
//                               </span>

//                               <h3 className="mt-5 text-3xl font-bold text-gray-900">
//                                  {step.title}
//                               </h3>

//                               <p className="mt-4 leading-8 text-gray-600">
//                                  {step.desc}
//                               </p>

//                            </div>

//                         </div>

//                         {/* Circle */}

//                         <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-2xl font-bold text-white shadow-2xl">
//                            {step.number}
//                         </div>

//                         {/* Empty Side */}

//                         <div className="hidden lg:block lg:w-5/12"></div>

//                      </div>

//                   ))}

//                </div>

//             </div>

//          </div>
//       </section>
//    );
// };

// export default HowItWorks;

import {
   FiMessageCircle,
   FiZap,
   FiTrendingUp,
   FiArrowDown,
   FiCheckCircle,
   FiArrowRight
} from "react-icons/fi";
import {
   RiWhatsappLine,
   RiRobot2Line
} from "react-icons/ri";
import {
   HiOutlineSparkles
} from "react-icons/hi";

// ==================== CONSTANTS ====================

const STEPS_DATA = [
   {
      number: "01",
      title: "Connect WhatsApp",
      description: "Connect your Official WhatsApp Business API in just a few clicks. No technical knowledge required.",
      icon: RiWhatsappLine,
      color: "green",
      gradient: "from-green-500 to-emerald-600",
      lightBg: "from-green-50 to-emerald-50",
      features: [
         "Official Meta API",
         "Quick Integration",
         "Secure Connection"
      ]
   },
   {
      number: "02",
      title: "Setup AI Chatbot",
      description: "Create chatbot flows, templates and automations without writing any code. AI-powered conversations.",
      icon: RiRobot2Line,
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      lightBg: "from-blue-50 to-indigo-50",
      features: [
         "Drag & Drop Builder",
         "Smart Responses",
         "24/7 Automation"
      ]
   },
   {
      number: "03",
      title: "Start Growing",
      description: "Launch broadcasts, manage conversations and track everything from one powerful dashboard.",
      icon: FiTrendingUp,
      color: "purple",
      gradient: "from-purple-500 to-pink-600",
      lightBg: "from-purple-50 to-pink-50",
      features: [
         "Real-time Analytics",
         "Team Collaboration",
         "Scale Easily"
      ]
   }
];

const CONNECTORS = [
   {
      icon: FiArrowDown,
      label: "Integration",
      color: "from-green-400 to-blue-400"
   },
   {
      icon: FiArrowDown,
      label: "Automation",
      color: "from-blue-400 to-purple-400"
   }
];

// ==================== HELPER FUNCTIONS ====================

const getGradientClasses = (gradient) => {
   return `bg-gradient-to-r ${gradient}`;
};

// ==================== SUB-COMPONENTS ====================

const SectionHeader = () => (
   <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-2 text-sm font-semibold text-green-600 shadow-sm">
         <HiOutlineSparkles className="h-4 w-4" />
         HOW IT WORKS
      </div>

      <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
         Get Started in
         <span className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            {" "}3 Easy Steps
         </span>
      </h2>

      <p className="mt-6 text-lg leading-relaxed text-gray-600">
         Connect your WhatsApp Business API, configure your chatbot and
         start engaging customers in minutes. No coding required.
      </p>
   </div>
);

const StepCard = ({ step, index, isReversed }) => {
   const Icon = step.icon;

   return (
      <div className="group relative w-full lg:w-5/12">
         {/* Card */}
         <div className={`relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${index === 0 ? "hover:border-green-200" :
               index === 1 ? "hover:border-blue-200" :
                  "hover:border-purple-200"
            }`}>

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${step.lightBg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}></div>

            {/* Content */}
            <div className="relative z-10">
               {/* Step Badge */}
               <div className={`inline-flex items-center gap-2 rounded-full ${getGradientClasses(step.gradient)} px-4 py-2 text-sm font-bold text-white shadow-lg`}>
                  <Icon className="h-4 w-4" />
                  Step {step.number}
               </div>

               {/* Title */}
               <h3 className="mt-5 text-2xl font-bold text-gray-900 lg:text-3xl">
                  {step.title}
               </h3>

               {/* Description */}
               <p className="mt-4 leading-relaxed text-gray-600">
                  {step.description}
               </p>

               {/* Feature List */}
               <div className="mt-6 space-y-2">
                  {step.features.map((feature, idx) => (
                     <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                        <FiCheckCircle className={`h-4 w-4 ${index === 0 ? "text-green-500" :
                              index === 1 ? "text-blue-500" :
                                 "text-purple-500"
                           }`} />
                        {feature}
                     </div>
                  ))}
               </div>

               {/* Decorative Line */}
               <div className={`mt-6 h-1 w-16 rounded-full ${getGradientClasses(step.gradient)} opacity-0 transition-all duration-300 group-hover:w-24 group-hover:opacity-100`}></div>
            </div>
         </div>

         {/* Hover Arrow */}
         <div className={`absolute top-1/2 -translate-y-1/2 hidden lg:block ${isReversed ? "-left-12" : "-right-12"
            } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            <FiArrowRight className={`h-8 w-8 ${index === 0 ? "text-green-500" :
                  index === 1 ? "text-blue-500" :
                     "text-purple-500"
               }`} />
         </div>
      </div>
   );
};

const TimelineNode = ({ step, index }) => {
   const Icon = step.icon;

   return (
      <div className={`relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-3xl ${getGradientClasses(step.gradient)
         }`}>
         <Icon className="h-8 w-8 text-white" />

         {/* Pulse Effect */}
         <div className={`absolute inset-0 rounded-full ${getGradientClasses(step.gradient)} animate-ping opacity-20`}></div>

         {/* Number Badge */}
         <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-gray-700 shadow-lg">
            {step.number}
         </div>
      </div>
   );
};

const Connector = ({ connector, index }) => {
   const Icon = connector.icon;

   return (
      <div className="relative z-0 flex flex-col items-center">
         <div className={`h-16 w-1 ${getGradientClasses(connector.color)} rounded-full transition-all duration-500 hover:h-20`}></div>
         <div className={`mt-2 flex h-10 w-10 items-center justify-center rounded-full ${getGradientClasses(connector.color)} p-2 shadow-lg animate-bounce`}>
            <Icon className="h-5 w-5 text-white" />
         </div>
         <span className="mt-1 text-xs font-medium text-gray-400">{connector.label}</span>
      </div>
   );
};

// ==================== MAIN COMPONENT ====================

const HowItWorks = () => {
   return (
      <section
         id="how-it-works"
         className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24 lg:py-10"
      >
         {/* Background Decorations */}
         <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-green-100 opacity-20 blur-3xl"></div>
            <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            <div className="absolute left-1/2 top-1/2 h-64 w-64 rounded-full bg-purple-100 opacity-20 blur-3xl"></div>
         </div>

         <div className="relative mx-auto max-w-7xl px-6">

            {/* Section Header */}
            <SectionHeader />

            {/* Timeline */}
            <div className="relative mt-24">

               {/* Center Line */}
               <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 opacity-30 lg:block"></div>

               {/* Steps Container */}
               <div className="space-y-0 lg:space-y-24">
                  {STEPS_DATA.map((step, index) => (
                     <div key={index}>
                        {/* Desktop Layout */}
                        <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-12">

                           {/* Step Card */}
                           <StepCard
                              step={step}
                              index={index}
                              isReversed={index % 2 !== 0}
                           />

                           {/* Timeline Node */}
                           <TimelineNode step={step} index={index} />

                           {/* Empty Space */}
                           <div className="w-5/12">
                              {/* Connector for next step */}
                              {index < STEPS_DATA.length - 1 && (
                                 <div className="flex justify-center">
                                    <Connector connector={CONNECTORS[index]} index={index} />
                                 </div>
                              )}
                           </div>

                        </div>

                        {/* Mobile Layout */}
                        <div className="flex flex-col items-center gap-8 lg:hidden">

                           {/* Step Number */}
                           <div className="flex items-center gap-4">
                              <TimelineNode step={step} index={index} />
                              {index < STEPS_DATA.length - 1 && (
                                 <Connector connector={CONNECTORS[index]} index={index} />
                              )}
                           </div>

                           {/* Step Card */}
                           <StepCard step={step} index={index} />

                        </div>
                     </div>
                  ))}
               </div>

            </div>

            {/* Bottom CTA */}
            {/* <div className="mt-20 text-center">
               <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 p-1">
                  <div className="rounded-[calc(1.5rem-1px)] bg-white px-8 py-10">
                     <h3 className="text-2xl font-bold text-gray-900">
                        Ready to Get Started?
                     </h3>
                     <p className="mt-4 text-gray-600">
                        Join thousands of businesses already using SP Advertising.
                     </p>
                     <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                        <FiZap className="h-5 w-5" />
                        Start Free Trial
                        <FiArrowRight className="h-5 w-5" />
                     </button>
                  </div>
               </div>
            </div> */}

         </div>
      </section>
   );
};

export default HowItWorks;