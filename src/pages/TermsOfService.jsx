// import Navbar from "../components/Landing/Navbar";
// import Footer from "../components/Landing/Footer";

// const TermsOfService = () => {
//    return (
//       <>
//          <Navbar />

//          <section className="bg-gradient-to-b from-slate-50 to-white py-20">
//             <div className="mx-auto max-w-4xl px-6">

//                <div className="mb-12 text-center">

//                   <span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-600">
//                      TERMS OF SERVICE
//                   </span>

//                   <h1 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
//                      Terms of Service
//                   </h1>

//                   <p className="mt-4 text-gray-500">
//                      Last Updated: 20 July 2026
//                   </p>

//                </div>

//                <div className="space-y-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">

//                   <section>

//                      <h2 className="text-2xl font-bold text-gray-900">
//                         1. Acceptance of Terms
//                      </h2>

//                      <p className="mt-4 leading-8 text-gray-600">
//                         By accessing or using SP Advertising's website and
//                         services, you agree to comply with these Terms of
//                         Service. If you do not agree with these terms, please
//                         discontinue using our platform.
//                      </p>

//                   </section>

//                   <section>

//                      <h2 className="text-2xl font-bold text-gray-900">
//                         2. Our Services
//                      </h2>

//                      <p className="mt-4 leading-8 text-gray-600">
//                         SP Advertising provides WhatsApp Business solutions,
//                         AI chatbot automation, broadcast messaging, customer
//                         communication tools and related business services.
//                      </p>

//                   </section>

//                   <section>

//                      <h2 className="text-2xl font-bold text-gray-900">
//                         3. User Responsibilities
//                      </h2>

//                      <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-gray-600">
//                         <li>Provide accurate account information.</li>
//                         <li>Maintain the security of your account credentials.</li>
//                         <li>Use the platform only for lawful business purposes.</li>
//                         <li>Comply with Meta's WhatsApp Business policies.</li>
//                         <li>Avoid spam, fraudulent or prohibited activities.</li>
//                      </ul>

//                   </section>

//                   <section>

//                      <h2 className="text-2xl font-bold text-gray-900">
//                         4. Payments & Billing
//                      </h2>

//                      <p className="mt-4 leading-8 text-gray-600">
//                         Paid plans are billed according to the selected
//                         subscription. Fees are non-refundable unless otherwise
//                         required by applicable law or stated in a separate
//                         agreement.
//                      </p>

//                   </section>

//                   <section>

//                      <h2 className="text-2xl font-bold text-gray-900">
//                         5. Account Suspension
//                      </h2>

//                      <p className="mt-4 leading-8 text-gray-600">
//                         We reserve the right to suspend or terminate accounts
//                         that violate these terms, misuse the platform or engage
//                         in unlawful activities without prior notice.
//                      </p>

//                   </section>

//                   <section>

//                      <h2 className="text-2xl font-bold text-gray-900">
//                         6. Limitation of Liability
//                      </h2>

//                      <p className="mt-4 leading-8 text-gray-600">
//                         SP Advertising is not responsible for any indirect,
//                         incidental or consequential damages resulting from the
//                         use or inability to use our services. Service
//                         availability may depend on third-party providers such
//                         as Meta and cloud infrastructure.
//                      </p>

//                   </section>

//                   <section>

//                      <h2 className="text-2xl font-bold text-gray-900">
//                         7. Changes to Terms
//                      </h2>

//                      <p className="mt-4 leading-8 text-gray-600">
//                         We may update these Terms of Service at any time.
//                         Continued use of the platform after updates indicates
//                         your acceptance of the revised terms.
//                      </p>

//                   </section>

//                   <section>

//                      <h2 className="text-2xl font-bold text-gray-900">
//                         8. Contact Us
//                      </h2>

//                      <p className="mt-4 leading-8 text-gray-600">
//                         If you have any questions regarding these Terms of
//                         Service, please contact us.
//                      </p>

//                      <div className="mt-5 rounded-2xl bg-slate-50 p-5">

//                         <p className="font-semibold text-gray-900">
//                            SP Advertising
//                         </p>

//                         <p className="mt-2 text-gray-600">
//                            Email: support@spadvertising.tech
//                         </p>

//                         <p className="text-gray-600">
//                            Website: https://spadvertising.tech
//                         </p>

//                      </div>

//                   </section>

//                </div>

//             </div>
//          </section>

//          <Footer />
//       </>
//    );
// };

// export default TermsOfService;

import Navbar from "../components/Landing/Navbar";
import Footer from "../components/Landing/Footer";
import { Link } from "react-router-dom";
import {
   FiFileText,
   FiShield,
   FiMail,
   FiGlobe,
   FiMapPin,
   FiArrowRight,
   FiCheckCircle,
   FiAlertTriangle,
   FiInfo,
   FiUsers,
   FiLock,
   FiHelpCircle,
   FiClock,
   FiBookOpen
} from "react-icons/fi";
import {
   RiWhatsappLine,
   RiDashboardLine
} from "react-icons/ri";
import {
   HiOutlineDocumentText
} from "react-icons/hi";

// ==================== CONSTANTS ====================

const TERMS_SECTIONS = [
   {
      id: 1,
      title: "1. Acceptance of Terms",
      icon: FiBookOpen,
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      content: [
         "By accessing or using SP Advertising's website (spadvertising.in) and services, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue using our platform immediately.",
         "These terms apply to all visitors, users, and customers who access or use our WhatsApp Business API solutions, AI chatbot services, broadcast messaging, and other related services."
      ]
   },
   {
      id: 2,
      title: "2. Our Services",
      icon: RiDashboardLine,
      color: "green",
      gradient: "from-green-500 to-emerald-600",
      content: [
         "SP Advertising provides comprehensive WhatsApp Business solutions designed to help businesses automate and optimize their customer communication:",
      ],
      listItems: [
         "Official WhatsApp Business API integration",
         "AI-powered chatbot automation for customer support and lead generation",
         "Broadcast messaging for promotional and transactional campaigns",
         "Live chat management from a centralized dashboard",
         "Contact management and CRM tools",
         "Message templates creation and management",
         "Reports and analytics for performance tracking"
      ]
   },
   {
      id: 3,
      title: "3. User Responsibilities",
      icon: FiUsers,
      color: "purple",
      gradient: "from-purple-500 to-pink-600",
      content: [
         "As a user of SP Advertising, you agree to the following responsibilities:",
      ],
      listItems: [
         "Provide accurate, current, and complete account information during registration",
         "Maintain the confidentiality and security of your account credentials",
         "Use the platform only for lawful business purposes and in compliance with applicable laws",
         "Comply with Meta's WhatsApp Business policies and terms of service",
         "Avoid spam, fraudulent, misleading, or prohibited activities on the platform",
         "Notify us immediately of any unauthorized use of your account"
      ]
   },
   {
      id: 4,
      title: "4. Payments & Billing",
      icon: FiShield,
      color: "orange",
      gradient: "from-orange-500 to-red-600",
      content: [
         "SP Advertising offers subscription-based pricing plans for our services:",
      ],
      listItems: [
         "Paid plans are billed monthly or annually according to the selected subscription",
         "Fees are non-refundable unless otherwise required by applicable law or stated in a separate agreement",
         "We reserve the right to modify pricing with prior notice to existing customers",
         "Late payments may result in temporary suspension of services",
         "All payments are processed securely through third-party payment gateways"
      ]
   },
   {
      id: 5,
      title: "5. Account Suspension & Termination",
      icon: FiLock,
      color: "cyan",
      gradient: "from-cyan-500 to-blue-600",
      content: [
         "SP Advertising reserves the right to suspend or terminate accounts under the following circumstances:",
      ],
      listItems: [
         "Violation of these Terms of Service or applicable laws",
         "Misuse of the platform or API for unauthorized purposes",
         "Engaging in spam, fraudulent, or prohibited activities",
         "Non-payment of subscription fees after the due date",
         "Request from Meta or regulatory authorities",
         "Extended period of account inactivity"
      ],
      additionalContent: [
         "We will make reasonable efforts to notify users before account suspension, except in cases where immediate action is required to prevent harm or illegal activity."
      ]
   },
   {
      id: 6,
      title: "6. Limitation of Liability",
      icon: FiAlertTriangle,
      color: "yellow",
      gradient: "from-yellow-500 to-orange-600",
      content: [
         "SP Advertising provides its services on an 'as is' and 'as available' basis:",
      ],
      listItems: [
         "We are not responsible for any indirect, incidental, or consequential damages resulting from the use or inability to use our services",
         "Service availability may depend on third-party providers such as Meta (WhatsApp), cloud hosting services, and internet infrastructure",
         "We do not guarantee uninterrupted or error-free service at all times",
         "Our maximum liability shall not exceed the total fees paid by you in the 12 months preceding the claim"
      ]
   },
   {
      id: 7,
      title: "7. Changes to Terms",
      icon: FiClock,
      color: "teal",
      gradient: "from-teal-500 to-green-600",
      content: [
         "SP Advertising reserves the right to update or modify these Terms of Service at any time:",
      ],
      listItems: [
         "Changes will be effective immediately upon posting on our website",
         "We will notify users of material changes via email or platform notification",
         "Continued use of the platform after updates indicates your acceptance of the revised terms",
         "We recommend reviewing these terms periodically for any changes"
      ]
   },
];

const QUICK_LINKS = [
   { label: "Privacy Policy", to: "/privacy-policy", icon: FiShield },
   { label: "Terms of Service", to: "/terms-of-service", icon: FiFileText },
   { label: "FAQ", to: "/#faq", icon: FiHelpCircle },
];

// ==================== HELPER FUNCTIONS ====================

const getColorClasses = (color) => {
   const colors = {
      blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
      green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
      purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
      orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
      cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200" },
      yellow: { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200" },
      teal: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200" },
   };
   return colors[color] || colors.blue;
};

// ==================== SUB-COMPONENTS ====================

const TermsSection = ({ section }) => {
   const Icon = section.icon;
   const colorClasses = getColorClasses(section.color);

   return (
      <section className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
         {/* Section Header */}
         <div className="flex items-center gap-4 mb-6">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${section.gradient} text-white shadow-lg transition-transform group-hover:scale-110`}>
               <Icon className="h-6 w-6" />
            </div>
            <div>
               <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
               <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${section.gradient} mt-1`}></div>
            </div>
         </div>

         {/* Content */}
         <div className="space-y-4">
            {section.content?.map((text, index) => (
               <p key={index} className="leading-8 text-gray-600">{text}</p>
            ))}

            {section.listItems && (
               <ul className="space-y-3">
                  {section.listItems.map((item, index) => (
                     <li key={index} className="flex items-start gap-3">
                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${colorClasses.bg} mt-0.5`}>
                           <FiCheckCircle className={`h-3.5 w-3.5 ${colorClasses.text}`} />
                        </div>
                        <span className="text-gray-600">{item}</span>
                     </li>
                  ))}
               </ul>
            )}

            {section.additionalContent?.map((text, index) => (
               <div key={index} className={`rounded-2xl ${colorClasses.bg} p-4 border ${colorClasses.border}`}>
                  <p className="text-sm text-gray-700">{text}</p>
               </div>
            ))}
         </div>
      </section>
   );
};

const ContactCard = () => (
   <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-4 mb-6">
         <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 text-white shadow-lg">
            <FiHelpCircle className="h-6 w-6" />
         </div>
         <div>
            <h2 className="text-2xl font-bold text-gray-900">8. Contact Information</h2>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mt-1"></div>
         </div>
      </div>

      <p className="leading-8 text-gray-600 mb-6">
         If you have any questions, concerns, or requests regarding these Terms of Service,
         please contact us through the following channels:
      </p>

      <div className="grid gap-4 md:grid-cols-2">
         <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-5 border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <FiMail className="h-5 w-5" />
               </div>
               <span className="font-semibold text-gray-900">Email</span>
            </div>
            <a href="mailto:spadvertising@live.com" className="text-blue-600 hover:underline">
               support@spadvertising.in
            </a>
         </div>

         <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-5 border border-green-200">
            <div className="flex items-center gap-3 mb-3">
               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                  <FiGlobe className="h-5 w-5" />
               </div>
               <span className="font-semibold text-gray-900">Website</span>
            </div>
            <a href="https://spadvertising.in" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">
               https://spadvertising.in
            </a>
         </div>

         <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-5 border border-purple-200">
            <div className="flex items-center gap-3 mb-3">
               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                  <FiMapPin className="h-5 w-5" />
               </div>
               <span className="font-semibold text-gray-900">Location</span>
            </div>
            <a href="#" className="text-purple-600">Raipur, Chhattisgarh, India</a>
         </div>

         <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 p-5 border border-orange-200">
            <div className="flex items-center gap-3 mb-3">
               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white">
                  <RiWhatsappLine className="h-5 w-5" />
               </div>
               <span className="font-semibold text-gray-900">WhatsApp</span>
            </div>
            <a href="https://wa.me/918085354646" className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">
               Chat on WhatsApp
            </a>
         </div>
      </div>
   </section>
);

const TableOfContents = () => (
   <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
         <HiOutlineDocumentText className="h-5 w-5 text-blue-600" />
         Table of Contents
      </h3>

      <nav className="space-y-2">
         {TERMS_SECTIONS.map((section) => (
            <a
               key={section.id}
               href={`#section-${section.id}`}
               className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition py-1"
            >
               <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${section.gradient}`}></div>
               {section.title}
            </a>
         ))}
      </nav>
   </div>
);

// ==================== MAIN COMPONENT ====================

const TermsOfService = () => {
   return (
      <>
         <Navbar />

         <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-green-50 py-20 lg:py-28">

            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
               <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-green-100 opacity-20 blur-3xl"></div>
               <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-6">

               {/* Header */}
               <div className="mb-16 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-2 text-sm font-semibold text-green-600 shadow-sm">
                     <FiFileText className="h-4 w-4" />
                     TERMS OF SERVICE
                  </div>

                  <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                     Terms of Service
                  </h1>

                  <p className="mt-4 text-gray-500 flex items-center justify-center gap-2">
                     <FiInfo className="h-4 w-4" />
                     Last Updated: 20 July 2026
                  </p>

                  <p className="mt-2 text-gray-400 text-sm">
                     Please read these terms carefully before using SP Advertising's services.
                  </p>
               </div>

               {/* Main Content Grid */}
               <div className="grid gap-8 lg:grid-cols-4">

                  {/* Sidebar - Table of Contents */}
                  <div className="hidden lg:block lg:col-span-1">
                     <TableOfContents />
                  </div>

                  {/* Main Content */}
                  <div className="lg:col-span-3 space-y-6">
                     {TERMS_SECTIONS.map((section) => (
                        <div key={section.id} id={`section-${section.id}`}>
                           <TermsSection section={section} />
                        </div>
                     ))}

                     {/* Contact Card */}
                     <ContactCard />

                     {/* Quick Links */}
                     {/* <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
                        <div className="flex flex-wrap gap-3">
                           {QUICK_LINKS.map((link, index) => (
                              <Link
                                 key={index}
                                 to={link.to}
                                 className="inline-flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2 text-sm text-gray-600 transition hover:bg-green-50 hover:text-green-600"
                              >
                                 <link.icon className="h-4 w-4" />
                                 {link.label}
                              </Link>
                           ))}
                        </div>
                     </div> */}
                  </div>

               </div>

               {/* Bottom CTA */}
               {/* <div className="mt-16 text-center">
                  <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-r from-green-600 via-blue-500 to-indigo-600 p-1">
                     <div className="rounded-[calc(1.5rem-1px)] bg-white px-8 py-10">
                        <h3 className="text-2xl font-bold text-gray-900">Ready to Get Started?</h3>
                        <p className="mt-4 text-gray-600">Join thousands of businesses using SP Advertising to automate their WhatsApp communication.</p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                           <a href="https://spadvertising.in/register" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                              Start Free Trial
                              <FiArrowRight />
                           </a>
                           <Link to="/privacy-policy" className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:border-blue-500 hover:text-blue-600">
                              <FiShield className="h-5 w-5" />
                              View Privacy Policy
                           </Link>
                        </div>
                     </div>
                  </div>
               </div> */}

            </div>
         </section>

         <Footer />
      </>
   );
};

export default TermsOfService;