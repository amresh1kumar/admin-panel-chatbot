// import Navbar from "../components/Landing/Navbar";
// import Footer from "../components/Landing/Footer";

// const PrivacyPolicy = () => {
//    return (
//       <>
//          <Navbar />

//          <section className="bg-gradient-to-b from-slate-50 to-white py-20">
//             <div className="mx-auto max-w-4xl px-6">

//                <div className="mb-12 text-center">

//                   <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
//                      PRIVACY POLICY
//                   </span>

//                   <h1 className="mt-6 text-4xl font-extrabold text-gray-900 md:text-5xl">
//                      Privacy Policy
//                   </h1>

//                   <p className="mt-4 text-gray-500">
//                      Last Updated: 20 July 2026
//                   </p>

//                </div>

//                <div className="space-y-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">

//                   <section>
//                      <h2 className="text-2xl font-bold text-gray-900">
//                         1. Introduction
//                      </h2>

//                      <p className="mt-4 leading-8 text-gray-600">
//                         SP Advertising respects your privacy and is committed to
//                         protecting your personal information. This Privacy Policy
//                         explains how we collect, use, store and safeguard the
//                         information you provide while using our website and
//                         WhatsApp Business solutions.
//                      </p>
//                   </section>

//                   <section>
//                      <h2 className="text-2xl font-bold text-gray-900">
//                         2. Information We Collect
//                      </h2>

//                      <p className="mt-4 leading-8 text-gray-600">
//                         We may collect your name, email address, phone number,
//                         company details and account information when you register
//                         or contact us. Technical information such as IP address,
//                         browser type and device information may also be collected
//                         to improve our services.
//                      </p>
//                   </section>

//                   <section>
//                      <h2 className="text-2xl font-bold text-gray-900">
//                         3. How We Use Your Information
//                      </h2>

//                      <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-gray-600">
//                         <li>Provide and manage our services.</li>
//                         <li>Process registrations and subscriptions.</li>
//                         <li>Improve platform performance and security.</li>
//                         <li>Respond to customer support requests.</li>
//                         <li>Send important service updates and notifications.</li>
//                      </ul>
//                   </section>

//                   <section>
//                      <h2 className="text-2xl font-bold text-gray-900">
//                         4. Third-Party Services
//                      </h2>

//                      <p className="mt-4 leading-8 text-gray-600">
//                         We may use trusted third-party providers such as Meta
//                         (WhatsApp Business API), payment gateways, cloud hosting,
//                         analytics tools and other technology partners to operate
//                         our platform. These providers handle data according to
//                         their own privacy policies.
//                      </p>
//                   </section>

//                   <section>
//                      <h2 className="text-2xl font-bold text-gray-900">
//                         5. Data Security
//                      </h2>

//                      <p className="mt-4 leading-8 text-gray-600">
//                         We implement reasonable technical and organizational
//                         security measures to protect your information. However,
//                         no internet-based service can guarantee complete security.
//                      </p>
//                   </section>

//                   <section>
//                      <h2 className="text-2xl font-bold text-gray-900">
//                         6. Cookies
//                      </h2>

//                      <p className="mt-4 leading-8 text-gray-600">
//                         Our website may use cookies and similar technologies to
//                         improve user experience, remember preferences and analyze
//                         website performance.
//                      </p>
//                   </section>

//                   <section>
//                      <h2 className="text-2xl font-bold text-gray-900">
//                         7. Your Rights
//                      </h2>

//                      <p className="mt-4 leading-8 text-gray-600">
//                         You may request access, correction or deletion of your
//                         personal information by contacting us. We will process
//                         such requests in accordance with applicable laws.
//                      </p>
//                   </section>

//                   <section>
//                      <h2 className="text-2xl font-bold text-gray-900">
//                         8. Contact Us
//                      </h2>

//                      <p className="mt-4 leading-8 text-gray-600">
//                         If you have any questions regarding this Privacy Policy,
//                         please contact us.
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

// export default PrivacyPolicy;

import Navbar from "../components/Landing/Navbar";
import Footer from "../components/Landing/Footer";
import { Link } from "react-router-dom";
import {
   FiShield,
   FiMail,
   FiGlobe,
   FiMapPin,
   FiArrowRight,
   FiCheckCircle,
   FiFileText,
   FiInfo,
   FiUsers,
   FiServer,
   FiMonitor,
   FiHelpCircle,
   FiClock,
   FiBookOpen,
   FiLock,
   FiAlertTriangle
} from "react-icons/fi";
import {
   RiWhatsappLine,
   RiDashboardLine,
   RiSecurePaymentLine,
   RiHandCoinLine
} from "react-icons/ri";
import {
   HiOutlineDocumentText
} from "react-icons/hi";

// ==================== CONSTANTS ====================

const POLICY_SECTIONS = [
   {
      id: 1,
      title: "1. Introduction",
      icon: FiInfo,
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      content: [
         "SP Advertising (spadvertising.in) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and safeguard the information you provide while using our website and WhatsApp Business API solutions.",
         "By using our services, you agree to the collection and use of information in accordance with this policy. If you do not agree with any part of this policy, please refrain from using our services."
      ]
   },
   {
      id: 2,
      title: "2. Information We Collect",
      icon: FiUsers,
      color: "green",
      gradient: "from-green-500 to-emerald-600",
      content: [
         "We collect information that you voluntarily provide to us when you:",
      ],
      listItems: [
         "Register for an account (Name, Email, Phone Number, Company Name)",
         "Subscribe to our newsletter or marketing communications",
         "Contact us via email, chat, or support channels",
         "Use our WhatsApp Business API services",
         "Fill out forms on our website (spadvertising.in)"
      ],
      additionalContent: [
         "We also automatically collect certain technical information when you visit our website, including:",
      ],
      techItems: [
         "IP address and browser type",
         "Device information and operating system",
         "Pages visited and time spent on our website",
         "Referring URL and exit pages",
         "Cookies and similar tracking technologies"
      ]
   },
   {
      id: 3,
      title: "3. How We Use Your Information",
      icon: RiHandCoinLine,
      color: "purple",
      gradient: "from-purple-500 to-pink-600",
      content: [
         "SP Advertising uses the collected information for the following purposes:",
      ],
      listItems: [
         "Provide, maintain, and improve our WhatsApp Business API services",
         "Process your registration, subscriptions, and payments",
         "Send service-related notifications, updates, and promotional offers",
         "Respond to your customer support inquiries and requests",
         "Analyze usage patterns to enhance platform performance and security",
         "Comply with legal obligations and prevent fraudulent activities"
      ]
   },
   {
      id: 4,
      title: "4. Third-Party Services",
      icon: FiServer,
      color: "orange",
      gradient: "from-orange-500 to-red-600",
      content: [
         "We may share your information with trusted third-party service providers who assist us in operating our platform, including:",
      ],
      listItems: [
         "Meta (WhatsApp Business API) - For messaging and communication services",
         "Payment Gateways - For processing subscriptions and transactions",
         "Cloud Hosting Providers - For data storage and server management",
         "Analytics Tools - For tracking website performance and user behavior",
         "Email Service Providers - For sending newsletters and notifications"
      ],
      additionalContent: [
         "These third-party providers are contractually obligated to protect your data and use it only for the purposes specified by SP Advertising."
      ]
   },
   {
      id: 5,
      title: "5. Data Security",
      icon: RiSecurePaymentLine,
      color: "cyan",
      gradient: "from-cyan-500 to-blue-600",
      content: [
         "We implement industry-standard security measures to protect your personal information:",
      ],
      listItems: [
         "SSL/TLS encryption for all data transmission",
         "Secure cloud infrastructure with regular security audits",
         "Role-based access control for our team members",
         "Regular data backups and disaster recovery protocols",
         "Compliance with applicable data protection regulations"
      ],
      additionalContent: [
         "While we strive to protect your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but will notify you in case of any data breach."
      ]
   },
   {
      id: 6,
      title: "6. Cookies & Tracking Technologies",
      icon: FiMonitor,
      color: "yellow",
      gradient: "from-yellow-500 to-orange-600",
      content: [
         "SP Advertising uses cookies and similar tracking technologies to enhance your browsing experience:",
      ],
      listItems: [
         "Essential cookies for website functionality and security",
         "Analytics cookies to understand how visitors use our website",
         "Preference cookies to remember your settings and choices",
         "Marketing cookies to deliver relevant advertisements"
      ],
      additionalContent: [
         "You can control cookie preferences through your browser settings. Disabling cookies may affect some features of our website."
      ]
   },
   {
      id: 7,
      title: "7. Your Rights & Choices",
      icon: FiCheckCircle,
      color: "teal",
      gradient: "from-teal-500 to-green-600",
      content: [
         "As a user of SP Advertising, you have the following rights regarding your personal data:",
      ],
      listItems: [
         "Access: Request a copy of the personal data we hold about you",
         "Correction: Request correction of inaccurate or incomplete data",
         "Deletion: Request deletion of your personal data (subject to legal obligations)",
         "Portability: Request transfer of your data to another service provider",
         "Opt-out: Unsubscribe from marketing communications at any time",
         "Withdraw Consent: Withdraw your consent for data processing"
      ],
      additionalContent: [
         "To exercise any of these rights, please contact us at support@spadvertising.in"
      ]
   },
   {
      id: 8,
      title: "8. Contact Information",
      icon: FiHelpCircle,
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      content: [
         "If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us through the following channels:"
      ]
   }
];

const QUICK_LINKS = [
   { label: "Terms of Service", to: "/terms-of-service", icon: FiFileText },
   { label: "Privacy Policy", to: "/privacy-policy", icon: FiShield },
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

const PolicySection = ({ section }) => {
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

            {section.techItems && (
               <ul className="space-y-2 pl-9">
                  {section.techItems.map((item, index) => (
                     <li key={index} className="flex items-start gap-3 text-gray-500">
                        <span className="text-gray-400">•</span>
                        <span>{item}</span>
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
         If you have any questions, concerns, or requests regarding this Privacy Policy,
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
            <a href="mailto:support@spadvertising.in" className="text-blue-600 hover:underline">
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
            <a href="#" className="text-purple-600">India</a>
         </div>

         <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 p-5 border border-orange-200">
            <div className="flex items-center gap-3 mb-3">
               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white">
                  <RiWhatsappLine className="h-5 w-5" />
               </div>
               <span className="font-semibold text-gray-900">WhatsApp</span>
            </div>
            <a href="https://wa.me/91XXXXXXXXXX" className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">
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
         {POLICY_SECTIONS.map((section) => (
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

const PrivacyPolicy = () => {
   return (
      <>
         <Navbar />

         <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50 py-20 lg:py-28">

            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
               <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
               <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-green-100 opacity-20 blur-3xl"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-6">

               {/* Header */}
               <div className="mb-16 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-2 text-sm font-semibold text-blue-600 shadow-sm">
                     <FiShield className="h-4 w-4" />
                     PRIVACY POLICY
                  </div>

                  <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                     Privacy Policy
                  </h1>

                  <p className="mt-4 text-gray-500 flex items-center justify-center gap-2">
                     <FiInfo className="h-4 w-4" />
                     Last Updated: 20 July 2026
                  </p>

                  <p className="mt-2 text-gray-400 text-sm">
                     Learn how SP Advertising collects, uses, and protects your personal information.
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
                     {POLICY_SECTIONS.map((section) => (
                        <div key={section.id} id={`section-${section.id}`}>
                           <PolicySection section={section} />
                        </div>
                     ))}

                     {/* Contact Card */}
                     <ContactCard />

                     {/* Quick Links */}
                     <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
                        <div className="flex flex-wrap gap-3">
                           {QUICK_LINKS.map((link, index) => (
                              <Link
                                 key={index}
                                 to={link.to}
                                 className="inline-flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2 text-sm text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
                              >
                                 <link.icon className="h-4 w-4" />
                                 {link.label}
                              </Link>
                           ))}
                        </div>
                     </div>
                  </div>

               </div>

               {/* Bottom CTA */}
               <div className="mt-16 text-center">
                  <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-r from-blue-600 via-green-500 to-emerald-600 p-1">
                     <div className="rounded-[calc(1.5rem-1px)] bg-white px-8 py-10">
                        <h3 className="text-2xl font-bold text-gray-900">
                           Have Questions About Your Privacy?
                        </h3>
                        <p className="mt-4 text-gray-600">
                           Our team is here to help you understand how we protect your data.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                           <a
                              href="mailto:support@spadvertising.in"
                              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                           >
                              <FiMail className="h-5 w-5" />
                              Contact Support
                           </a>
                           <Link
                              to="/register"
                              className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:border-green-500 hover:text-green-600"
                           >
                              Get Started
                              <FiArrowRight />
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </section>

         <Footer />
      </>
   );
};

export default PrivacyPolicy;