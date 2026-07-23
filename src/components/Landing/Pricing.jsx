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
  FiSend
} from "react-icons/fi";
import {
  RiRobot2Line,
  RiWhatsappLine
} from "react-icons/ri";
import {
  HiOutlineSparkles
} from "react-icons/hi";

// ==================== CONSTANTS ====================

const PLANS = [
  {
    name: "Starter",
    price: "₹999",
    period: "/month",
    description: "Perfect for small businesses starting their WhatsApp automation journey.",
    button: "Start Free Trial",
    featured: false,
    gradient: "from-blue-500 to-blue-600",
    iconBg: "from-blue-50 to-indigo-50",
    icon: FiZap,
    features: [
      { icon: RiWhatsappLine, text: "Official WhatsApp API", included: true },
      { icon: RiRobot2Line, text: "AI Chatbot", included: true },
      { icon: FiSend, text: "Broadcast", included: true },
      { icon: FiUsers, text: "Contacts", included: true },
      { icon: FiMail, text: "1,000 Messages", included: true },
      { icon: FiMessageCircle, text: "Email Support", included: true },
    ],
  },
  {
    name: "Professional",
    price: "₹2,999",
    period: "/month",
    description: "For growing businesses that need advanced features and priority support.",
    button: "Get Started",
    featured: true,
    gradient: "from-green-500 to-emerald-600",
    iconBg: "from-green-50 to-emerald-50",
    icon: FiStar,
    features: [
      { icon: FiCheckCircle, text: "Everything in Starter", included: true },
      { icon: FiSend, text: "Unlimited Broadcast", included: true },
      { icon: FiMessageCircle, text: "Live Chat", included: true },
      { icon: FiBarChart2, text: "Reports & Analytics", included: true },
      { icon: FiFileText, text: "Message Templates", included: true },
      { icon: FiStar, text: "Priority Support", included: true },
    ],
  },
];

const ADDON_FEATURES = [
  "📞 AI Calling Integration",
  "🔄 Auto Follow-up",
  "📊 Advanced Analytics",
  "👥 Multi-Agent Access",
];

// ==================== SUB-COMPONENTS ====================

const SectionHeader = () => (
  <div className="mx-auto max-w-3xl text-center">
    <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-2 text-sm font-semibold text-green-600 shadow-sm">
      <FiZap className="h-4 w-4" />
      PRICING
    </div>

    <h2 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
      Simple &{" "}
      <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
        Transparent Pricing
      </span>
    </h2>

    <p className="mt-6 text-lg leading-relaxed text-gray-600">
      Choose the perfect plan for your business and scale with confidence.
      No hidden fees, no surprises.
    </p>
  </div>
);

const PricingCard = ({ plan, index }) => {
  const Icon = plan.icon;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${plan.featured
          ? "border-green-500 shadow-xl scale-105 lg:scale-110 z-10"
          : "border-gray-200 hover:border-blue-200"
        }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-r from-blue-400 to-green-400"></div>
        <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-gradient-to-r from-green-400 to-blue-400"></div>
      </div>

      {/* Most Popular Badge */}
      {plan.featured && (
        <div className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2 text-xs font-bold tracking-wide text-white shadow-lg">
          <div className="flex items-center gap-1">
            <HiOutlineSparkles className="h-3 w-3" />
            MOST POPULAR
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Plan Header */}
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.iconBg}`}>
            <Icon className={`h-6 w-6 ${plan.featured ? "text-green-600" : "text-blue-600"}`} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            <p className="text-sm text-gray-500">{plan.description}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mt-8">
          <div className="flex items-baseline">
            <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
            <span className="ml-2 text-lg text-gray-500">{plan.period}</span>
          </div>
          <p className="mt-2 text-sm text-gray-400">Billed monthly, cancel anytime</p>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-100"></div>

        {/* Features */}
        <div className="space-y-4">
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full ${plan.featured ? "bg-green-100" : "bg-blue-100"
                }`}>
                <feature.icon className={`h-4 w-4 ${plan.featured ? "text-green-600" : "text-blue-600"
                  }`} />
              </div>
              <span className="text-gray-700">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mt-6 rounded-2xl bg-gray-50 p-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">Add-on Features:</p>
          <div className="flex flex-wrap gap-2">
            {ADDON_FEATURES.map((addon, i) => (
              <span key={i} className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs text-gray-600 border border-gray-200">
                {addon}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Link
          to="/register"
          className={`mt-8 flex items-center justify-center gap-2 rounded-xl py-4 font-semibold transition-all duration-300 ${plan.featured
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1"
              : "border-2 border-gray-300 bg-white text-gray-900 hover:border-blue-600 hover:text-blue-600 hover:shadow-lg"
            }`}
        >
          {plan.button}
          <FiArrowRight className={`transition-transform group-hover:translate-x-1 ${plan.featured ? "text-white" : ""
            }`} />
        </Link>

        {/* Payment Methods */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="text-xs text-gray-400">Secure payment with</span>
          <div className="flex gap-2">
            <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">Visa</span>
            <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">UPI</span>
            <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">Net Banking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComparisonTable = () => (
  <div className="mt-20 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6">
      <h3 className="text-2xl font-bold text-white">Compare Plans</h3>
      <p className="mt-2 text-gray-400">Choose the right plan for your needs</p>
    </div>

    <div className="p-8">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-4 text-left font-semibold text-gray-900">Features</th>
              <th className="pb-4 text-center font-semibold text-blue-600">Starter</th>
              <th className="pb-4 text-center font-semibold text-green-600">Professional</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { feature: "Official WhatsApp API", starter: true, pro: true },
              { feature: "AI Chatbot", starter: true, pro: true },
              { feature: "Broadcast", starter: "1,000/mo", pro: "Unlimited" },
              { feature: "Contacts", starter: "5,000", pro: "Unlimited" },
              { feature: "Live Chat", starter: false, pro: true },
              { feature: "Reports & Analytics", starter: false, pro: true },
              { feature: "Priority Support", starter: false, pro: true },
            ].map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4 text-gray-700">{row.feature}</td>
                <td className="py-4 text-center">
                  {row.starter === true ? (
                    <FiCheckCircle className="mx-auto h-5 w-5 text-green-500" />
                  ) : row.starter === false ? (
                    <span className="text-gray-300">—</span>
                  ) : (
                    <span className="font-semibold text-gray-700">{row.starter}</span>
                  )}
                </td>
                <td className="py-4 text-center">
                  {row.pro === true ? (
                    <FiCheckCircle className="mx-auto h-5 w-5 text-green-500" />
                  ) : row.pro === false ? (
                    <span className="text-gray-300">—</span>
                  ) : (
                    <span className="font-semibold text-gray-700">{row.pro}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const FAQSection = () => (
  <div className="mt-20">
    <h3 className="text-center text-2xl font-bold text-gray-900 mb-10">
      Frequently Asked Questions
    </h3>

    <div className="grid gap-6 md:grid-cols-2">
      {[
        {
          q: "Can I switch plans later?",
          a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
        },
        {
          q: "Is there a free trial?",
          a: "Yes! All plans come with a 14-day free trial. No credit card required.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept Visa, Mastercard, UPI, Net Banking, and all major credit cards.",
        },
        {
          q: "Can I cancel anytime?",
          a: "Absolutely! You can cancel your subscription at any time with no hidden fees.",
        },
      ].map((faq, index) => (
        <div key={index} className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:shadow-lg">
          <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
          <p className="text-gray-600">{faq.a}</p>
        </div>
      ))}
    </div>
  </div>
);

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

      <div className="relative mx-auto max-w-5xl px-6">

        {/* Section Header */}
        <SectionHeader />

        {/* Pricing Cards - 3 columns ki jagah 2 columns */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:gap-12">
          {PLANS.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>

        {/* Comparison Table */}
        {/* <ComparisonTable /> */}

        {/* FAQ Section */}
        {/* <FAQSection /> */}

        {/* Bottom CTA */}
        {/* <div className="mt-20 text-center">
          <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-r from-blue-600 via-green-500 to-emerald-600 p-1">
            <div className="rounded-[calc(1.5rem-1px)] bg-white px-8 py-12">
              <h3 className="text-3xl font-bold text-gray-900">
                Still Have Questions?
              </h3>
              <p className="mt-4 text-gray-600">
                Our team is here to help you find the perfect plan for your business.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                >
                  Contact Sales
                  <FiArrowRight />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                >
                  Start Free Trial
                  <FiZap className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div> */}

      </div>
    </section>
  );
};

export default Pricing;