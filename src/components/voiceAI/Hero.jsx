// import { FiPlay, FiCheckCircle } from "react-icons/fi";
// import { BsStars } from "react-icons/bs";

// const Hero = () => {
//    return (
//       <section className="bg-white pt-24 pb-20">
//          <div className="max-w-7xl mx-auto px-6 lg:px-8">
//             <div className="grid lg:grid-cols-2 gap-16 items-center">
//                {/* Left Content */}
//                <div>
//                   <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700">
//                      <BsStars />
//                      NEW • AI Voice Platform
//                   </div>

//                   <h1 className="mt-6 text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
//                      AI Voice Agents for
//                      <span className="text-blue-600"> Modern Businesses</span>
//                   </h1>

//                   <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl">
//                      Automate customer conversations with intelligent AI voice agents.
//                      Qualify leads, schedule appointments, transfer calls, and integrate
//                      seamlessly with your CRM—all from one powerful platform.
//                   </p>

//                   {/* CTA */}
//                   <div className="mt-8 flex flex-wrap gap-4">
//                      <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
//                         Book a Demo
//                      </button>

//                      <button className="flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600">
//                         <FiPlay />
//                         Watch Demo
//                      </button>
//                   </div>

//                   {/* Highlights */}
//                   <div className="mt-10 grid grid-cols-2 gap-4 text-gray-700">
//                      <div className="flex items-center gap-2">
//                         <FiCheckCircle className="text-green-500" />
//                         Human-like Conversations
//                      </div>

//                      <div className="flex items-center gap-2">
//                         <FiCheckCircle className="text-green-500" />
//                         Lead Qualification
//                      </div>

//                      <div className="flex items-center gap-2">
//                         <FiCheckCircle className="text-green-500" />
//                         Appointment Booking
//                      </div>

//                      <div className="flex items-center gap-2">
//                         <FiCheckCircle className="text-green-500" />
//                         CRM Integration
//                      </div>

//                      <div className="flex items-center gap-2">
//                         <FiCheckCircle className="text-green-500" />
//                         Multi-language Support
//                      </div>

//                      <div className="flex items-center gap-2">
//                         <FiCheckCircle className="text-green-500" />
//                         Live Call Analytics
//                      </div>
//                   </div>
//                </div>

//                {/* Right Side */}
//                <div className="relative">
//                   <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
//                      {/* Header */}
//                      <div className="flex items-center justify-between">
//                         <div>
//                            <h3 className="text-xl font-semibold text-gray-900">
//                               AI Voice Dashboard
//                            </h3>
//                            <p className="mt-1 text-sm text-gray-500">
//                               Manage your AI voice agents from one place.
//                            </p>
//                         </div>

//                         <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
//                            Preview
//                         </span>
//                      </div>

//                      {/* Dashboard Cards */}
//                      <div className="mt-8 grid grid-cols-2 gap-4">
//                         <div className="rounded-2xl bg-gray-50 p-5">
//                            <p className="text-sm text-gray-500">AI Agents</p>
//                            <h4 className="mt-2 text-2xl font-bold text-gray-900">03</h4>
//                         </div>

//                         <div className="rounded-2xl bg-gray-50 p-5">
//                            <p className="text-sm text-gray-500">Live Calls</p>
//                            <h4 className="mt-2 text-2xl font-bold text-gray-900">08</h4>
//                         </div>

//                         <div className="rounded-2xl bg-gray-50 p-5">
//                            <p className="text-sm text-gray-500">Call Recordings</p>
//                            <h4 className="mt-2 text-2xl font-bold text-gray-900">
//                               Available
//                            </h4>
//                         </div>

//                         <div className="rounded-2xl bg-gray-50 p-5">
//                            <p className="text-sm text-gray-500">CRM Status</p>
//                            <h4 className="mt-2 text-2xl font-bold text-green-600">
//                               Connected
//                            </h4>
//                         </div>
//                      </div>

//                      {/* Bottom Preview */}
//                      <div className="mt-6 rounded-2xl bg-blue-50 p-5 border border-blue-100">
//                         <div className="flex items-center justify-between">
//                            <span className="font-medium text-gray-800">
//                               AI Voice Assistant
//                            </span>

//                            <span className="text-sm font-medium text-green-600">
//                               ● Active
//                            </span>
//                         </div>

//                         <div className="mt-4 h-2 w-full rounded-full bg-blue-100">
//                            <div className="h-2 w-2/3 rounded-full bg-blue-600"></div>
//                         </div>

//                         <p className="mt-3 text-sm text-gray-600">
//                            Intelligent conversations powered by AI.
//                         </p>
//                      </div>
//                   </div>
//                </div>
//             </div>
//          </div>
//       </section>
//    );
// };

// export default Hero;

import { Link } from "react-router-dom";
import {
   FiPhoneCall,
   FiHeadphones,
   FiMic,
   FiCheckCircle,
   FiTrendingUp,
   FiZap,
   FiArrowRight,
   FiCalendar,
   FiTarget
} from "react-icons/fi";
import {
   RiVoiceprintLine,
   RiCustomerServiceLine
} from "react-icons/ri";
import {
   HiOutlineSparkles
} from "react-icons/hi";

// Import your voice AI dashboard image
import voiceAIImage from "../../assets/images/Dashboard.png";

// ==================== CONSTANTS ====================

const FEATURES = [
   { icon: RiVoiceprintLine, label: "Voice AI Agent" },
   { icon: FiTarget, label: "Lead Qualification" },
   { icon: FiCalendar, label: "Appointment Booking" },
   { icon: FiHeadphones, label: "Call Management" },
];

const BENEFITS = [
   { icon: FiCheckCircle, text: "Human-like Conversations" },
   { icon: FiCheckCircle, text: "24×7 Availability" },
   { icon: FiCheckCircle, text: "CRM Integration" },
];

const FLOATING_STATS = [
   {
      position: "-left-8 top-10",
      label: "Calls Today",
      value: "+2,480",
      icon: FiTrendingUp,
      color: "green",
   },
   {
      position: "-right-8 bottom-10",
      label: "Success Rate",
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
                  <RiVoiceprintLine className="h-5 w-5" />
                  NEW • AI Voice Calling Platform
               </div>

               {/* Heading - Changed */}
               <h1 className="text-5xl font-extrabold leading-tight text-gray-900 lg:text-6xl xl:text-7xl">
                  AI Voice Agents
                  <br />
                  for
                  <span className="relative">
                     <span className="text-blue-600"> Modern Businesses</span>
                     <HiOutlineSparkles className="absolute -right-8 -top-2 h-8 w-8 text-yellow-400 animate-pulse" />
                  </span>
               </h1>

               {/* Description */}
               <p className="max-w-xl text-lg leading-relaxed text-gray-600">
                  Automate inbound and outbound calls with intelligent AI voice agents.
                  Qualify leads, book appointments, transfer calls, and integrate
                  with your CRM — all from one powerful dashboard.
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
                     <span className="ml-2 font-semibold">SP Advertising Voice AI</span>
                  </div>

                  {/* Dashboard Image */}
                  <div className="relative overflow-hidden bg-gray-50">
                     <img
                        src={voiceAIImage}
                        alt="SP Advertising Voice AI Dashboard Preview"
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