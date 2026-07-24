// import { Link } from "react-router-dom";

// const plans = [
//   {
//     name: "Starter",
//     price: "₹999",
//     period: "/month",
//     button: "Start Now",
//     featured: false,
//     features: [
//       "Official WhatsApp API",
//       "AI Chatbot",
//       "Broadcast",
//       "Contacts",
//       "1000 Messages",
//       "Email Support",
//     ],
//   },
//   {
//     name: "Professional",
//     price: "₹2999",
//     period: "/month",
//     button: "Get Started",
//     featured: true,
//     features: [
//       "Everything in Starter",
//       "Unlimited Broadcast",
//       "Live Chat",
//       "Reports",
//       "Templates",
//       "Priority Support",
//     ],
//   },
//   {
//     name: "Enterprise",
//     price: "Custom",
//     period: "",
//     button: "Contact Sales",
//     featured: false,
//     features: [
//       "Unlimited Everything",
//       "Dedicated Manager",
//       "API Integration",
//       "Custom Development",
//       "Multi Agent",
//       "24×7 Support",
//     ],
//   },
// ];

// const Pricing = () => {
//   return (
//     <section
//       id="pricing"
//       className="bg-gradient-to-b from-slate-50 to-white py-24"
//     >
//       <div className="mx-auto max-w-7xl px-6">

//         {/* Heading */}

//         <div className="mx-auto max-w-3xl text-center">

//           <span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-600">
//             PRICING
//           </span>

//           <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
//             Simple & Transparent Pricing
//           </h2>

//           <p className="mt-6 text-lg text-gray-600">
//             Choose the perfect plan for your business and scale with confidence.
//           </p>

//         </div>

//         {/* Plans */}

//         <div className="mt-20 grid gap-8 lg:grid-cols-3">

//           {plans.map((plan, index) => (

//             <div
//               key={index}
//               className={`relative overflow-hidden rounded-3xl border bg-white p-8 transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${plan.featured
//                 ? "border-blue-600 shadow-2xl scale-105"
//                 : "border-gray-200"
//                 }`}
//             >

//               {plan.featured && (
//                 <div className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-r from-blue-600 to-green-500 px-5 py-2 text-xs font-bold tracking-wide text-white">
//                   MOST POPULAR
//                 </div>
//               )}

//               <h3 className="text-2xl font-bold text-gray-900">
//                 {plan.name}
//               </h3>

//               <div className="mt-6">

//                 <span className="text-5xl font-extrabold text-gray-900">
//                   {plan.price}
//                 </span>

//                 <span className="ml-2 text-lg text-gray-500">
//                   {plan.period}
//                 </span>

//               </div>

//               <ul className="mt-8 space-y-4">

//                 {plan.features.map((feature, i) => (

//                   <li
//                     key={i}
//                     className="flex items-center gap-3 text-gray-700"
//                   >

//                     <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600">
//                       ✓
//                     </div>

//                     {feature}

//                   </li>

//                 ))}

//               </ul>

//               <Link
//                 to="/register"
//                 className={`mt-10 block rounded-xl py-4 text-center font-semibold transition ${plan.featured
//                   ? "bg-gradient-to-r from-blue-600 to-green-500 text-white hover:opacity-90"
//                   : "border border-gray-300 bg-white text-gray-900 hover:border-blue-600 hover:text-blue-600"
//                   }`}
//               >
//                 {plan.button}
//               </Link>

//             </div>

//           ))}

//         </div>

//       </div>
//     </section>
//   );
// };

// export default Pricing;

import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiZap,
  FiArrowRight,
  FiStar,
  FiMessageCircle,
  FiUsers,
  FiBarChart2,
  FiFileText,
  FiMail,
  FiSend,
  FiPhoneCall
} from "react-icons/fi";
import {
  RiRobot2Line,
  RiWhatsappLine
} from "react-icons/ri";
import {
  HiOutlineSparkles
} from "react-icons/hi";

// ==================== CONSTANTS ====================

const PLAN = {
  name: "Professional",
  description: "Everything you need to automate your WhatsApp communication.",
  button: "Contact Sales",
  featured: true,
  gradient: "from-green-500 to-emerald-600",
  iconBg: "from-green-50 to-emerald-50",
  icon: FiStar,
  features: [
    { icon: RiWhatsappLine, text: "Official WhatsApp API", included: true },
    { icon: RiRobot2Line, text: "AI Chatbot", included: true },
    { icon: FiSend, text: "Broadcast", included: true },
    { icon: FiUsers, text: "Unlimited Contacts", included: true },
    { icon: FiMessageCircle, text: "Live Chat", included: true },
    { icon: FiBarChart2, text: "Reports & Analytics", included: true },
    { icon: FiFileText, text: "Message Templates", included: true },
    { icon: FiStar, text: "Priority Support", included: true },
  ],
  addonFeatures: [
    "📞 AI Calling Integration",
    "🔄 Auto Follow-up",
    "📊 Advanced Analytics",
  ],
};

// ==================== SUB-COMPONENTS ====================

const SectionHeader = () => (
  <div className="mx-auto max-w-3xl text-center">
    <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-2 text-sm font-semibold text-green-600 shadow-sm">
      <FiZap className="h-4 w-4" />
      PRICING
    </div>

    <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
      Simple Pricing for
      <br />
      <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
        Your Business
      </span>
    </h2>

    <p className="mt-6 text-lg leading-relaxed text-gray-600">
      Get everything you need in one plan.
      <span className="font-semibold text-blue-600"> Contact our sales team</span> for custom pricing.
    </p>
  </div>
);

const PricingCard = () => {
  const Icon = PLAN.icon;

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-green-500 bg-white p-10 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-r from-blue-400 to-green-400"></div>
        <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-gradient-to-r from-green-400 to-blue-400"></div>
      </div>

      {/* Most Popular Badge */}
      <div className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 text-sm font-bold tracking-wide text-white shadow-lg">
        <div className="flex items-center gap-1">
          <HiOutlineSparkles className="h-4 w-4" />
          RECOMMENDED PLAN
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">

        {/* Plan Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${PLAN.iconBg}`}>
            <Icon className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">{PLAN.name}</h3>
            <p className="text-base text-gray-500">{PLAN.description}</p>
          </div>
        </div>

        {/* Custom Pricing Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 px-5 py-2.5 mb-2">
          <HiOutlineSparkles className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">Custom Pricing</span>
        </div>

        <p className="text-sm text-gray-500 mb-8">
          Contact our team for personalized pricing based on your requirements.
          We'll create a plan that fits your business perfectly.
        </p>

        {/* Divider */}
        <div className="mb-8 border-t border-gray-100"></div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          {PLAN.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <feature.icon className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700 text-sm">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-5 border border-green-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">Add-on Features:</p>
          <div className="flex flex-wrap gap-2">
            {PLAN.addonFeatures.map((addon, i) => (
              <span key={i} className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200">
                {addon}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button - Contact Sales */}
        <Link
          to="/contact"
          className="mt-8 flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <FiPhoneCall className="h-5 w-5" />
          Contact Sales
          <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Response Time */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            <FiCheckCircle className="inline h-4 w-4 text-green-500 mr-1" />
            Response within 2 hours • No commitment required
          </p>
        </div>

      </div>
    </div>
  );
};


// ==================== MAIN COMPONENT ====================

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50 py-24 lg:py-32"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-green-100 opacity-20 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-3xl px-6">

        {/* Section Header */}
        <SectionHeader />

        {/* Single Pricing Card */}
        <div className="mt-16">
          <PricingCard />
        </div>

        

      </div>
    </section>
  );
};

export default Pricing;