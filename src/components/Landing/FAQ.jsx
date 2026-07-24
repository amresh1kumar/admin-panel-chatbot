// import { useState } from "react";

// const faqs = [
//    {
//       q: "What is WhatsApp Business API?",
//       a: "It is the official API provided by Meta that enables businesses to automate customer communication on WhatsApp securely.",
//    },
//    {
//       q: "Can I send bulk messages?",
//       a: "Yes. You can send broadcast campaigns using approved WhatsApp template messages.",
//    },
//    {
//       q: "Does it support AI Chatbot?",
//       a: "Yes. You can create AI-powered chatbot flows for customer support, lead generation and automation.",
//    },
//    {
//       q: "Do I need coding knowledge?",
//       a: "No. Everything can be managed from an easy-to-use dashboard without writing code.",
//    },
// ];

// const FAQ = () => {
//    const [open, setOpen] = useState(0);

//    return (
//       <section
//          id="faq"
//          className="bg-gradient-to-b from-slate-50 to-white py-24"
//       >
//          <div className="mx-auto max-w-4xl px-6">

//             {/* Heading */}

//             <div className="text-center">

//                <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
//                   FAQ
//                </span>

//                <h2 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
//                   Frequently Asked Questions
//                </h2>

//                <p className="mt-6 text-lg text-gray-600">
//                   Everything you need to know before getting started.
//                </p>

//             </div>

//             {/* FAQ */}

//             <div className="mt-16 space-y-5">

//                {faqs.map((item, index) => {

//                   const isOpen = open === index;

//                   return (
//                      <div
//                         key={index}
//                         className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
//                      >

//                         <button
//                            onClick={() =>
//                               setOpen(isOpen ? -1 : index)
//                            }
//                            className="flex w-full items-center justify-between p-6 text-left"
//                         >

//                            <h3 className="text-lg font-semibold text-gray-900">
//                               {item.q}
//                            </h3>

//                            <span
//                               className={`text-2xl font-bold text-blue-600 transition-transform duration-300 ${isOpen ? "rotate-45" : ""
//                                  }`}
//                            >
//                               +
//                            </span>

//                         </button>

//                         <div
//                            className={`grid transition-all duration-300 ${isOpen
//                               ? "grid-rows-[1fr]"
//                               : "grid-rows-[0fr]"
//                               }`}
//                         >

//                            <div className="overflow-hidden">

//                               <p className="px-6 pb-6 leading-8 text-gray-600">
//                                  {item.a}
//                               </p>

//                            </div>

//                         </div>

//                      </div>
//                   );
//                })}

//             </div>

//          </div>
//       </section>
//    );
// };

// export default FAQ;

import { useState } from "react";
import {
   FiChevronDown,
   FiHelpCircle,
   FiMessageCircle,
   FiSend,
   FiCode,
   FiZap,
   FiPlus,
   FiMinus
} from "react-icons/fi";
import {
   RiRobot2Line,
   RiWhatsappLine
} from "react-icons/ri";
import {
   HiOutlineSparkles
} from "react-icons/hi";

// ==================== CONSTANTS ====================

const FAQ_DATA = [
   {
      question: "What is WhatsApp Business API?",
      answer: "It is the official API provided by Meta that enables businesses to automate customer communication on WhatsApp securely. SP Advertising provides a 100% compliant integration.",
      icon: RiWhatsappLine,
      color: "green",
      gradient: "from-green-500 to-emerald-600",
      lightBg: "from-green-50 to-emerald-50",
      category: "Getting Started"
   },
   {
      question: "Can I send bulk messages?",
      answer: "Yes. You can send broadcast campaigns using approved WhatsApp template messages. Our platform supports both promotional and transactional messaging with proper compliance.",
      icon: FiSend,
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      lightBg: "from-blue-50 to-indigo-50",
      category: "Features"
   },
   {
      question: "Does it support AI Chatbot?",
      answer: "Yes. You can create AI-powered chatbot flows for customer support, lead generation and automation. Our drag-and-drop builder makes it easy to create intelligent conversations.",
      icon: RiRobot2Line,
      color: "purple",
      gradient: "from-purple-500 to-pink-600",
      lightBg: "from-purple-50 to-pink-50",
      category: "Features"
   },
   {
      question: "Do I need coding knowledge?",
      answer: "No. Everything can be managed from an easy-to-use dashboard without writing code. Our platform is designed for both technical and non-technical users.",
      icon: FiCode,
      color: "orange",
      gradient: "from-orange-500 to-red-600",
      lightBg: "from-orange-50 to-red-50",
      category: "Setup"
   },
];

const ADDITIONAL_FAQ = [
   "How does pricing work?",
   "Can I integrate with other tools?",
   "Is my data secure?",
   "What kind of support do you offer?"
];

// ==================== HELPER FUNCTIONS ====================

const getColorClasses = (color) => {
   const colors = {
      green: { text: "text-green-600", bg: "bg-green-50", border: "border-green-200", hover: "hover:border-green-300" },
      blue: { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", hover: "hover:border-blue-300" },
      purple: { text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200", hover: "hover:border-purple-300" },
      orange: { text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", hover: "hover:border-orange-300" },
   };
   return colors[color] || colors.blue;
};

// ==================== SUB-COMPONENTS ====================

const SectionHeader = () => (
   <div className="text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-2 text-sm font-semibold text-blue-600 shadow-sm">
         <FiHelpCircle className="h-4 w-4" />
         FAQ
      </div>

      <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
         Frequently Asked{" "}
         <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Questions
         </span>
      </h2>

      <p className="mt-6 text-lg leading-relaxed text-gray-600">
         Everything you need to know before getting started.
         Can't find what you're looking for? Contact our support team.
      </p>
   </div>
);

const FAQItem = ({ faq, index, isOpen, onToggle }) => {
   const Icon = faq.icon;
   const colorClasses = getColorClasses(faq.color);

   return (
      <div
         className={`group relative overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:shadow-xl ${isOpen
               ? `${colorClasses.border} shadow-lg ${colorClasses.hover}`
               : "border-gray-200 hover:border-gray-300"
            }`}
      >
         {/* Category Badge */}
         <div className="absolute right-4 top-4">
            <span className={`rounded-full px-3 py-0.5 text-xs font-medium ${colorClasses.bg} ${colorClasses.text}`}>
               {faq.category}
            </span>
         </div>

         <button
            onClick={() => onToggle(index)}
            className="flex w-full items-center justify-between p-6 text-left"
         >
            <div className="flex items-center gap-4">
               {/* Icon */}
               <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${faq.lightBg} transition-all duration-300 ${isOpen ? "scale-110" : ""
                  }`}>
                  <Icon className={`h-6 w-6 ${colorClasses.text}`} />
               </div>

               {/* Question */}
               <div>
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
                  <FiMinus className={`h-5 w-5 ${colorClasses.text}`} />
               ) : (
                  <FiPlus className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
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
                           <button className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                              <FiMessageCircle className="h-4 w-4" />
                              Get Started
                           </button>
                           <button className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700">
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
            {ADDITIONAL_FAQ.map((faq, index) => (
               <button
                  key={index}
                  className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 transition hover:border-blue-200 hover:text-blue-600 hover:shadow-sm"
               >
                  <FiHelpCircle className="h-4 w-4" />
                  {faq}
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
   const [openIndex, setOpenIndex] = useState(0);

   const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? -1 : index);
   };

   return (
      <section
         id="faq"
         className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50 py-24 lg:py-32"
      >
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
                     isOpen={openIndex === index}
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