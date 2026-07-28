// import { useState } from "react";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// const faqs = [
//    {
//       question: "What is an AI Voice Agent?",
//       answer:
//          "An AI Voice Agent is an intelligent virtual assistant that can handle phone conversations, answer customer queries, qualify leads, schedule appointments, and automate business calls.",
//    },
//    {
//       question: "Can I use my existing business phone number?",
//       answer:
//          "Yes. You can connect your existing business phone number or purchase a new virtual number based on your requirements.",
//    },
//    {
//       question: "Does it support multiple languages?",
//       answer:
//          "Yes. AI Voice Agents can communicate in multiple languages, making it easier to serve customers across different regions.",
//    },
//    {
//       question: "Can it integrate with my CRM?",
//       answer:
//          "Yes. Our platform is designed to integrate with popular CRM systems to automatically sync customer information and call outcomes.",
//    },
//    {
//       question: "Are call recordings and transcripts available?",
//       answer:
//          "Yes. Every conversation can be recorded and transcribed, allowing your team to review interactions and improve customer experience.",
//    },
//    {
//       question: "How do I get started?",
//       answer:
//          "Simply book a demo with our team. We'll help you choose a phone number, configure your AI Voice Agent, and get your business up and running.",
//    },
// ];

// const FAQ = () => {
//    const [active, setActive] = useState(0);

//    return (
//       <section className="py-20 bg-gray-50">
//          <div className="max-w-4xl mx-auto px-6">

//             {/* Heading */}
//             <div className="text-center">
//                <span className="text-blue-600 font-semibold uppercase tracking-wider">
//                   FAQ
//                </span>

//                <h2 className="mt-3 text-4xl font-bold text-gray-900">
//                   Frequently Asked Questions
//                </h2>

//                <p className="mt-5 text-lg text-gray-600">
//                   Everything you need to know about our AI Voice Platform.
//                </p>
//             </div>

//             {/* FAQ Items */}
//             <div className="mt-14 space-y-4">
//                {faqs.map((faq, index) => (
//                   <div
//                      key={index}
//                      className="rounded-2xl border border-gray-200 bg-white"
//                   >
//                      <button
//                         onClick={() =>
//                            setActive(active === index ? null : index)
//                         }
//                         className="w-full flex items-center justify-between p-6 text-left"
//                      >
//                         <h3 className="text-lg font-semibold text-gray-900">
//                            {faq.question}
//                         </h3>

//                         {active === index ? (
//                            <FiChevronUp className="text-xl text-blue-600" />
//                         ) : (
//                            <FiChevronDown className="text-xl text-gray-500" />
//                         )}
//                      </button>

//                      {active === index && (
//                         <div className="px-6 pb-6 text-gray-600 leading-7">
//                            {faq.answer}
//                         </div>
//                      )}
//                   </div>
//                ))}
//             </div>

//          </div>
//       </section>
//    );
// };

// export default FAQ;

import { useState } from "react";
import {
   FiChevronDown,
   FiChevronUp,
   FiHelpCircle,
   FiMessageCircle,
   FiZap
} from "react-icons/fi";
import {
   HiOutlineSparkles
} from "react-icons/hi";

// ==================== CONSTANTS ====================

const FAQ_DATA = [
   {
      question: "What is an AI Voice Agent?",
      answer: "An AI Voice Agent is an intelligent virtual assistant that can handle phone conversations, answer customer queries, qualify leads, schedule appointments, and automate business calls.",
      category: "General",
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      lightBg: "from-blue-50 to-indigo-50"
   },
   {
      question: "Can I use my existing business phone number?",
      answer: "Yes. You can connect your existing business phone number or purchase a new virtual number based on your requirements.",
      category: "Setup",
      color: "green",
      gradient: "from-green-500 to-emerald-600",
      lightBg: "from-green-50 to-emerald-50"
   },
   {
      question: "Does it support multiple languages?",
      answer: "Yes. AI Voice Agents can communicate in multiple languages, making it easier to serve customers across different regions.",
      category: "Features",
      color: "purple",
      gradient: "from-purple-500 to-pink-600",
      lightBg: "from-purple-50 to-pink-50"
   },
   {
      question: "Can it integrate with my CRM?",
      answer: "Yes. Our platform is designed to integrate with popular CRM systems to automatically sync customer information and call outcomes.",
      category: "Integration",
      color: "orange",
      gradient: "from-orange-500 to-red-600",
      lightBg: "from-orange-50 to-red-50"
   },
   {
      question: "Are call recordings and transcripts available?",
      answer: "Yes. Every conversation can be recorded and transcribed, allowing your team to review interactions and improve customer experience.",
      category: "Features",
      color: "cyan",
      gradient: "from-cyan-500 to-blue-600",
      lightBg: "from-cyan-50 to-blue-50"
   },
   {
      question: "How do I get started?",
      answer: "Simply book a demo with our team. We'll help you choose a phone number, configure your AI Voice Agent, and get your business up and running.",
      category: "Getting Started",
      color: "teal",
      gradient: "from-teal-500 to-green-600",
      lightBg: "from-teal-50 to-green-50"
   },
];

const QUICK_LINKS = [
   "What is Voice AI?",
   "Pricing Plans",
   "Integration Options",
   "Support"
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
         <FiHelpCircle className="h-4 w-4" />
         FAQ
      </div>

      <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
         Frequently Asked
         <br />
         <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Questions
         </span>
      </h2>

      <p className="mt-6 text-lg leading-relaxed text-gray-600">
         Everything you need to know about our AI Voice Platform.
      </p>
   </div>
);

const FAQItem = ({ faq, index, isOpen, onToggle }) => {
   const colorClasses = getColorClasses(faq.color);

   return (
      <div
         className={`group relative overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:shadow-xl ${isOpen
               ? `${colorClasses.border} shadow-lg`
               : "border-gray-200 hover:border-gray-300"
            }`}
      >
         {/* Category Badge */}
         <div className="absolute right-4 top-4 z-10">
            <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${colorClasses.bg} ${colorClasses.text}`}>
               {faq.category}
            </span>
         </div>

         <button
            onClick={() => onToggle(index)}
            className="w-full flex items-center justify-between p-6 text-left"
         >
            <div className="flex items-center gap-4 flex-1">
               {/* Icon */}
               <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${faq.lightBg} transition-all duration-300 ${isOpen ? "scale-110" : ""
                  }`}>
                  <FiHelpCircle className={`h-5 w-5 ${colorClasses.text}`} />
               </div>

               {/* Question */}
               <div className="flex-1">
                  <h3 className={`text-lg font-semibold transition-colors ${isOpen ? colorClasses.text : "text-gray-900"
                     }`}>
                     {faq.question}
                  </h3>
                  {isOpen && (
                     <p className="mt-1 text-sm text-gray-400">Click to close</p>
                  )}
               </div>
            </div>

            {/* Toggle Icon */}
            <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${isOpen
                  ? `${colorClasses.bg} rotate-180`
                  : "bg-gray-100 group-hover:bg-gray-200"
               }`}>
               {isOpen ? (
                  <FiChevronUp className={`h-5 w-5 ${colorClasses.text}`} />
               ) : (
                  <FiChevronDown className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
               )}
            </div>
         </button>

         {/* Answer */}
         <div
            className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
               }`}
         >
            <div className="overflow-hidden">
               <div className="px-6 pb-6">
                  <div className="flex gap-4">
                     {/* Vertical Line */}
                     <div className={`w-1 rounded-full bg-gradient-to-b ${faq.gradient} opacity-30`}></div>

                     {/* Answer Content */}
                     <div className="flex-1">
                        <p className="leading-8 text-gray-600">
                           {faq.answer}
                        </p>

                        {/* Action Buttons */}
                        {/* <div className="mt-4 flex gap-3">
                           <button className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition">
                              <FiMessageCircle className="h-4 w-4" />
                              Get Started
                           </button>
                           <button className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition">
                              <FiHelpCircle className="h-4 w-4" />
                              Learn More
                           </button>
                        </div> */}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

const QuickLinks = () => (
   <div className="mt-12 rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
         <div>
            <h3 className="text-xl font-bold text-gray-900">Quick Links</h3>
            <p className="mt-1 text-gray-600">Can't find your question?</p>
         </div>
         <div className="flex flex-wrap gap-3">
            {QUICK_LINKS.map((link, index) => (
               <button
                  key={index}
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 transition hover:border-blue-200 hover:text-blue-600 hover:shadow-sm"
               >
                  <FiHelpCircle className="h-4 w-4" />
                  {link}
               </button>
            ))}
         </div>
      </div>
   </div>
);

const ContactSupport = () => (
   <div className="mt-12 text-center">
      <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-r from-blue-600 via-green-500 to-emerald-600 p-1">
         <div className="rounded-[calc(1.5rem-1px)] bg-white px-8 py-10">
            <div className="flex items-center justify-center gap-3">
               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-green-50">
                  <FiMessageCircle className="h-6 w-6 text-blue-600" />
               </div>
               <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900">Still Have Questions?</h3>
                  <p className="text-gray-600">Our team is here to help you 24/7</p>
               </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
               <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                  <FiMessageCircle className="h-5 w-5" />
                  Live Chat
               </button>
               <button className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600">
                  <FiHelpCircle className="h-5 w-5" />
                  Email Support
               </button>
            </div>
         </div>
      </div>
   </div>
);

// ==================== MAIN COMPONENT ====================

const FAQ = () => {
   const [activeIndex, setActiveIndex] = useState(0);

   const toggleFAQ = (index) => {
      setActiveIndex(activeIndex === index ? -1 : index);
   };

   return (
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-blue-50 py-20 lg:py-10">

         {/* Background Decorations */}
         <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-green-100 opacity-20 blur-3xl"></div>
         </div>

         <div className="relative mx-auto max-w-4xl px-6">

            {/* Section Header */}
            <SectionHeader />

            {/* FAQ Items */}
            <div className="mt-16 space-y-4">
               {FAQ_DATA.map((faq, index) => (
                  <FAQItem
                     key={index}
                     faq={faq}
                     index={index}
                     isOpen={activeIndex === index}
                     onToggle={toggleFAQ}
                  />
               ))}
            </div>

            {/* Quick Links */}
            {/* <QuickLinks /> */}

            {/* Contact Support */}
            {/* <ContactSupport /> */}

         </div>
      </section>
   );
};

export default FAQ;