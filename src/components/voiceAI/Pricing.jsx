// import { FiCheckCircle } from "react-icons/fi";

// const features = [
//    "AI Voice Agents",
//    "Business Phone Number Support",
//    "Call Recording",
//    "Conversation Transcripts",
//    "CRM Integration",
//    "Analytics Dashboard",
//    "Priority Support",
// ];

// const Pricing = () => {
//    return (
//       <section className="py-20 bg-white">
//          <div className="max-w-7xl mx-auto px-6 lg:px-8">

//             {/* Heading */}
//             <div className="text-center max-w-3xl mx-auto">
//                <span className="text-blue-600 font-semibold uppercase tracking-wider">
//                   Pricing
//                </span>

//                <h2 className="mt-3 text-4xl font-bold text-gray-900">
//                   Flexible Pricing for Every Business
//                </h2>

//                <p className="mt-5 text-lg text-gray-600">
//                   Every business has different calling requirements. Contact our team
//                   for a customized plan that fits your needs.
//                </p>
//             </div>

//             {/* Pricing Card */}
//             <div className="mt-16 max-w-4xl mx-auto">
//                <div className="rounded-3xl border border-gray-200 shadow-xl p-10 bg-white">

//                   <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

//                      {/* Left */}
//                      <div className="flex-1">
//                         <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
//                            Custom Pricing
//                         </span>

//                         <h3 className="mt-6 text-4xl font-bold text-gray-900">
//                            Tailored for Your Business
//                         </h3>

//                         <p className="mt-4 text-gray-600 leading-8">
//                            Whether you're a startup or an enterprise, we'll recommend the
//                            right AI Voice solution based on your business size, expected
//                            call volume, and integration requirements.
//                         </p>

//                         <button className="mt-8 rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition">
//                            Contact Sales
//                         </button>
//                      </div>

//                      {/* Right */}
//                      <div className="flex-1 rounded-2xl bg-gray-50 p-8">
//                         <h4 className="text-xl font-semibold text-gray-900 mb-6">
//                            What's Included
//                         </h4>

//                         <div className="space-y-4">
//                            {features.map((feature, index) => (
//                               <div
//                                  key={index}
//                                  className="flex items-center gap-3"
//                               >
//                                  <FiCheckCircle className="text-green-500" />
//                                  <span className="text-gray-700">{feature}</span>
//                               </div>
//                            ))}
//                         </div>
//                      </div>

//                   </div>

//                </div>
//             </div>

//          </div>
//       </section>
//    );
// };

// export default Pricing;

import {
   FiCheckCircle,
   FiZap,
   FiArrowRight,
   FiStar,
   FiShield,
   FiHeadphones,
   FiMic,
   FiBarChart2,
   FiUsers,
   FiRefreshCw,
   FiPhone
} from "react-icons/fi";
import {
   HiOutlineSparkles
} from "react-icons/hi";

// ==================== CONSTANTS ====================

const FEATURES_LIST = [
   { icon: FiMic, text: "AI Voice Agents" },
   { icon: FiPhone, text: "Business Phone Number Support" },
   { icon: FiHeadphones, text: "Call Recording" },
   { icon: FiBarChart2, text: "Conversation Transcripts" },
   { icon: FiRefreshCw, text: "CRM Integration" },
   { icon: FiBarChart2, text: "Analytics Dashboard" },
   { icon: FiStar, text: "Priority Support" },
];

const ADDITIONAL_FEATURES = [
   "Outbound Calling Campaigns",
   "Inbound Call Handling",
   "Appointment Scheduling",
   "Lead Qualification"
];

const TRUST_FEATURES = [
   { icon: FiShield, text: "Secure & Compliant" },
   { icon: FiUsers, text: "Team Collaboration" },
   { icon: FiZap, text: "Fast Setup" },
];

// ==================== SUB-COMPONENTS ====================

const SectionHeader = () => (
   <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-green-50 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600 shadow-sm">
         <FiZap className="h-4 w-4" />
         Pricing
      </div>

      <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
         Flexible Pricing for
         <br />
         <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Every Business
         </span>
      </h2>

      <p className="mt-6 text-lg leading-relaxed text-gray-600">
         Every business has different calling requirements. Contact our team
         for a customized plan that fits your needs.
      </p>
   </div>
);

const FeatureItem = ({ icon: Icon, text }) => (
   <div className="flex items-center gap-3 group">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 group-hover:bg-green-200 transition">
         <FiCheckCircle className="h-4 w-4 text-green-600" />
      </div>
      <span className="text-gray-700 group-hover:text-gray-900 transition">{text}</span>
   </div>
);

const TrustBadge = ({ icon: Icon, text }) => (
   <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="rounded-lg bg-blue-50 p-1.5">
         <Icon className="h-4 w-4 text-blue-600" />
      </div>
      {text}
   </div>
);

// ==================== MAIN COMPONENT ====================

const Pricing = () => {
   return (
      <section  className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-20 lg:py-10">

         {/* Background Decorations */}
         <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/4 top-10 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            <div className="absolute right-1/4 bottom-10 h-96 w-96 rounded-full bg-green-100 opacity-20 blur-3xl"></div>
         </div>

         <div className="relative mx-auto max-w-7xl px-6">

            {/* Section Header */}
            <SectionHeader />

            {/* Pricing Card */}
            <div className="mt-16 max-w-5xl mx-auto">
               <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">

                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-emerald-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

                  <div className="relative p-10">

                     <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">

                        {/* ==================== LEFT SIDE ==================== */}
                        <div className="flex-1 space-y-6">

                           {/* Badge */}
                           <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                              <HiOutlineSparkles className="h-4 w-4" />
                              Custom Pricing
                           </div>

                           {/* Title */}
                           <h3 className="text-4xl font-bold text-gray-900">
                              Tailored for Your Business
                           </h3>

                           {/* Description */}
                           <p className="text-gray-600 leading-8 max-w-lg">
                              Whether you're a startup or an enterprise, we'll recommend the
                              right AI Voice solution based on your business size, expected
                              call volume, and integration requirements.
                           </p>

                           {/* Trust Badges */}
                           <div className="flex flex-wrap gap-4">
                              {TRUST_FEATURES.map((feature, index) => (
                                 <TrustBadge key={index} {...feature} />
                              ))}
                           </div>

                           {/* CTA Button */}
                           <button className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                              Contact Sales
                              <FiArrowRight className="transition group-hover:translate-x-1" />
                           </button>

                           {/* Additional Info */}
                           <p className="text-sm text-gray-400">
                              Response within 2 hours • No commitment required
                           </p>

                        </div>

                        {/* ==================== RIGHT SIDE ==================== */}
                        <div className="flex-1 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-8 shadow-sm">

                           {/* Header */}
                           <div className="flex items-center gap-2 mb-6">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-green-500 text-white">
                                 <FiStar className="h-4 w-4" />
                              </div>
                              <h4 className="text-xl font-bold text-gray-900">
                                 What's Included
                              </h4>
                           </div>

                           {/* Features List */}
                           <div className="space-y-4">
                              {FEATURES_LIST.map((feature, index) => (
                                 <FeatureItem key={index} icon={feature.icon} text={feature.text} />
                              ))}
                           </div>

                           {/* Divider */}
                           <div className="my-6 border-t border-gray-200"></div>

                           {/* Additional Features */}
                           {/* <div>
                              <p className="text-sm font-semibold text-gray-900 mb-3">Plus:</p>
                              <div className="flex flex-wrap gap-2">
                                 {ADDITIONAL_FEATURES.map((feature, index) => (
                                    <span key={index} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                       <FiCheckCircle className="h-3 w-3" />
                                       {feature}
                                    </span>
                                 ))}
                              </div>
                           </div> */}

                           {/* Bottom Badge */}
                           {/* <div className="mt-6 pt-6 border-t border-gray-200">
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                 <FiShield className="h-4 w-4 text-green-500" />
                                 <span>No hidden fees • Cancel anytime</span>
                              </div>
                           </div> */}

                        </div>

                     </div>

                  </div>
               </div>
            </div>

            {/* Bottom CTA */}
            {/* <div className="mt-16 text-center">
               <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-r from-blue-600 via-green-500 to-emerald-600 p-1">
                  <div className="rounded-[calc(1.5rem-1px)] bg-white px-8 py-10">
                     <h3 className="text-2xl font-bold text-gray-900">
                        Not Sure What You Need?
                     </h3>
                     <p className="mt-4 text-gray-600">
                        Schedule a free consultation and we'll help you find the perfect plan.
                     </p>
                     <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                        <FiZap className="h-5 w-5" />
                        Book a Consultation
                     </button>
                  </div>
               </div>
            </div> */}

         </div>
      </section>
   );
};

export default Pricing;
