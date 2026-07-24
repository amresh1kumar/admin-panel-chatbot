import {
   FiHome,
   FiBookOpen,
   FiShoppingBag,
   FiTruck,
   FiBriefcase,
   FiHeart,
   FiCheckCircle,
   FiZap,
   FiArrowRight,
   FiMessageCircle,
   FiSend,
   FiUsers
} from "react-icons/fi";
import {
   RiWhatsappLine,
   RiRobot2Line
} from "react-icons/ri";
import {
   HiOutlineSparkles
} from "react-icons/hi";

// ==================== CONSTANTS ====================

const USE_CASES_DATA = [
   {
      icon: FiHome,
      title: "Real Estate",
      description: "Send property inquiries, schedule site visits, and follow up with buyers automatically via WhatsApp.",
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      lightBg: "from-blue-50 to-indigo-50",
      stats: "40% more leads",
      whatsapp: true
   },
   {
      icon: FiBookOpen,
      title: "Education",
      description: "Handle admission inquiries, send reminders, and schedule counseling sessions through WhatsApp.",
      color: "green",
      gradient: "from-green-500 to-emerald-600",
      lightBg: "from-green-50 to-emerald-50",
      stats: "60% less workload",
      whatsapp: true
   },
   {
      icon: FiShoppingBag,
      title: "E-Commerce",
      description: "Confirm orders, collect feedback, recover abandoned carts, and send promotions via WhatsApp.",
      color: "purple",
      gradient: "from-purple-500 to-pink-600",
      lightBg: "from-purple-50 to-pink-50",
      stats: "25% more sales",
      whatsapp: true
   },
   {
      icon: FiHeart,
      title: "Healthcare",
      description: "Book appointments, send reminders, share reports, and answer patient queries on WhatsApp.",
      color: "red",
      gradient: "from-red-500 to-orange-600",
      lightBg: "from-red-50 to-orange-50",
      stats: "50% faster booking",
      whatsapp: true
   },
   {
      icon: FiTruck,
      title: "Logistics",
      description: "Provide shipment updates, delivery confirmations, and real-time tracking via WhatsApp.",
      color: "orange",
      gradient: "from-orange-500 to-yellow-600",
      lightBg: "from-orange-50 to-yellow-50",
      stats: "Real-time tracking",
      whatsapp: true
   },
   {
      icon: FiBriefcase,
      title: "Recruitment",
      description: "Screen candidates, schedule interviews, send offers, and automate hiring follow-ups on WhatsApp.",
      color: "teal",
      gradient: "from-teal-500 to-green-600",
      lightBg: "from-teal-50 to-green-50",
      stats: "3x faster hiring",
      whatsapp: true
   },
];

// ==================== HELPER FUNCTIONS ====================

const getColorClasses = (color) => {
   const colors = {
      blue: { text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", hover: "hover:border-blue-300", shadow: "hover:shadow-blue-200" },
      green: { text: "text-green-600", bg: "bg-green-50", border: "border-green-200", hover: "hover:border-green-300", shadow: "hover:shadow-green-200" },
      purple: { text: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200", hover: "hover:border-purple-300", shadow: "hover:shadow-purple-200" },
      red: { text: "text-red-600", bg: "bg-red-50", border: "border-red-200", hover: "hover:border-red-300", shadow: "hover:shadow-red-200" },
      orange: { text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", hover: "hover:border-orange-300", shadow: "hover:shadow-orange-200" },
      teal: { text: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200", hover: "hover:border-teal-300", shadow: "hover:shadow-teal-200" },
   };
   return colors[color] || colors.blue;
};

// ==================== SUB-COMPONENTS ====================

const SectionHeader = () => (
   <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-green-50 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600 shadow-sm">
         <RiWhatsappLine className="h-4 w-4" />
         Use Cases
      </div>

      <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
         WhatsApp Automation for
         <br />
         <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Every Industry
         </span>
      </h2>

      <p className="mt-6 text-lg leading-relaxed text-gray-600">
         Automate customer conversations on WhatsApp across multiple
         industries, helping teams save time and improve engagement.
      </p>
   </div>
);

const UseCaseCard = ({ useCase, index }) => {
   const Icon = useCase.icon;
   const colorClasses = getColorClasses(useCase.color);

   return (
      <div
         className={`group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 ${colorClasses.hover} ${colorClasses.shadow} hover:shadow-2xl`}
      >
         {/* WhatsApp Badge */}
         {useCase.whatsapp && (
            <div className="absolute top-4 right-4 z-10">
               <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                  <RiWhatsappLine className="h-3 w-3" />
                  WhatsApp
               </div>
            </div>
         )}

         {/* Gradient Overlay on Hover */}
         <div className={`absolute inset-0 bg-gradient-to-br ${useCase.lightBg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}></div>

         {/* Content */}
         <div className="relative z-10">

            {/* Icon Container */}
            <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${useCase.lightBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
               <Icon className={`h-8 w-8 ${colorClasses.text}`} />
            </div>

            {/* Title */}
            <h3 className="mt-6 text-xl font-bold text-gray-900 transition-colors group-hover:text-gray-900">
               {useCase.title}
            </h3>

            {/* Description */}
            <p className="mt-4 leading-7 text-gray-600">
               {useCase.description}
            </p>

            {/* Stats Badge */}
            <div className={`mt-5 inline-flex items-center gap-1 rounded-full ${colorClasses.bg} px-3 py-1 text-xs font-semibold ${colorClasses.text}`}>
               <FiCheckCircle className="h-3 w-3" />
               {useCase.stats}
            </div>

            {/* Learn More Link */}
            {/* <div className="mt-5 flex items-center gap-1 text-sm font-medium text-gray-400 transition group-hover:text-green-600">
               <span>Learn more</span>
               <FiArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div> */}

            {/* Decorative Element */}
            <div className={`mt-5 h-1 w-12 rounded-full bg-gradient-to-r ${useCase.gradient} opacity-0 transition-all duration-300 group-hover:w-20 group-hover:opacity-100`}></div>
         </div>
      </div>
   );
};

// ==================== MAIN COMPONENT ====================

const UseCases = () => {
   return (
      <section id="usecases" className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-20 lg:py-28">

         {/* Background Decorations */}
         <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/4 top-10 h-96 w-96 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            <div className="absolute right-1/4 bottom-10 h-96 w-96 rounded-full bg-green-100 opacity-20 blur-3xl"></div>
         </div>

         <div className="relative mx-auto max-w-7xl px-6">

            {/* Section Header */}
            <SectionHeader />

            {/* Use Case Cards Grid */}
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
               {USE_CASES_DATA.map((useCase, index) => (
                  <UseCaseCard key={index} useCase={useCase} index={index} />
               ))}
            </div>

            {/* Bottom CTA */}
            {/* <div className="mt-16 text-center">
               <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-r from-green-600 via-blue-500 to-emerald-600 p-1">
                  <div className="rounded-[calc(1.5rem-1px)] bg-white px-8 py-10">
                     <div className="flex items-center justify-center gap-2 mb-4">
                        <RiWhatsappLine className="h-8 w-8 text-green-600" />
                        <h3 className="text-2xl font-bold text-gray-900">
                           Ready to Automate WhatsApp?
                        </h3>
                     </div>
                     <p className="text-gray-600">
                        Start your free trial today and see how WhatsApp automation can transform your business.
                     </p>
                     <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                        <RiWhatsappLine className="h-5 w-5" />
                        Start Free Trial
                        <FiArrowRight />
                     </button>
                  </div>
               </div>
            </div> */}

         </div>
      </section>
   );
};

export default UseCases;