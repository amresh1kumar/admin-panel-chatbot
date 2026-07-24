// import { Link } from "react-router-dom";

// const Footer = () => {
//    return (
//       <footer className="bg-slate-900 text-gray-300">

//          {/* Top */}

//          <div className="mx-auto max-w-7xl px-6 py-16">

//             <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

//                {/* Company */}

//                <div>

//                   <h2 className="text-2xl font-bold text-white">
//                      SP Advertising
//                   </h2>

//                   <p className="mt-5 leading-7 text-gray-400">
//                      Official WhatsApp Business API platform helping businesses
//                      automate conversations, broadcasts and customer engagement.
//                   </p>

//                </div>

//                {/* Product */}

//                <div>

//                   <h3 className="mb-5 text-lg font-semibold text-white">
//                      Product
//                   </h3>

//                   <ul className="space-y-3">

//                      <li>
//                         <a
//                            href="#features"
//                            className="hover:text-green-400 transition"
//                         >
//                            Features
//                         </a>
//                      </li>

//                      <li>
//                         <a
//                            href="#pricing"
//                            className="hover:text-green-400 transition"
//                         >
//                            Pricing
//                         </a>
//                      </li>

//                      <li>
//                         <a
//                            href="#faq"
//                            className="hover:text-green-400 transition"
//                         >
//                            FAQ
//                         </a>
//                      </li>

//                   </ul>

//                </div>

//                {/* Company */}

//                <div>

//                   <h3 className="mb-5 text-lg font-semibold text-white">
//                      Company
//                   </h3>

//                   <ul className="space-y-3">

//                      <li>
//                         <Link
//                            to="/privacy-policy"
//                            className="hover:text-green-400 transition"
//                         >
//                            Privacy Policy
//                         </Link>
//                      </li>

//                      <li>
//                         <Link
//                            to="/terms-of-service"
//                            className="hover:text-green-400 transition"
//                         >
//                            Terms of Service
//                         </Link>
//                      </li>

//                      <li>
//                         <Link
//                            to="/login"
//                            className="hover:text-green-400 transition"
//                         >
//                            Login
//                         </Link>
//                      </li>

//                      <li>
//                         <Link
//                            to="/register"
//                            className="hover:text-green-400 transition"
//                         >
//                            Register
//                         </Link>
//                      </li>

//                   </ul>

//                </div>

//                {/* Contact */}

//                <div>

//                   <h3 className="mb-5 text-lg font-semibold text-white">
//                      Contact
//                   </h3>

//                   <ul className="space-y-3">

//                      <li>
//                         📧 support@spadvertising.tech
//                      </li>

//                      <li>
//                         🌐 www.spadvertising.tech
//                      </li>

//                      <li>
//                         🇮🇳 India
//                      </li>

//                   </ul>

//                </div>

//             </div>

//          </div>

//          {/* Bottom */}

//          <div className="border-t border-slate-800">

//             <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-gray-400 md:flex-row">

//                <p>
//                   © {new Date().getFullYear()} SP Advertising. All Rights Reserved.
//                </p>

//                <div className="flex gap-6">

//                   <Link
//                      to="/privacy-policy"
//                      className="hover:text-white transition"
//                   >
//                      Privacy
//                   </Link>

//                   <Link
//                      to="/terms-of-service"
//                      className="hover:text-white transition"
//                   >
//                      Terms
//                   </Link>

//                </div>

//             </div>

//          </div>

//       </footer>
//    );
// };

// export default Footer;

import { Link } from "react-router-dom";
import {
   FiMail,
   FiGlobe,
   FiMapPin,
   FiHeart,
   FiArrowUp,
   FiGithub,
   FiTwitter,
   FiLinkedin,
   FiInstagram,
   FiMessageCircle,
   FiZap,
   FiSend,
   FiHelpCircle,
   FiFileText,
   FiShield,
   FiLogIn,
   FiUserPlus,
   FiFacebook
} from "react-icons/fi";
import {
   RiWhatsappLine,
   RiRobot2Line,
   RiDashboardLine,
   RiYoutubeFill
} from "react-icons/ri";
import logo from "../../assets/images/logo.png";


// ==================== CONSTANTS ====================

const FOOTER_LINKS = {
   product: [
      { label: "WhatsApp", href: "#whatsapp", icon: FiZap },
      { label: "Voice AI", href: "#voiceai ", icon: FiSend },
   ],
   company: [
      { label: "Privacy Policy", to: "/privacy-policy", icon: FiShield },
      { label: "Terms of Service", to: "/terms-of-service", icon: FiFileText },
      { label: "Login", to: "/login", icon: FiLogIn },
      { label: "Register", to: "/register", icon: FiUserPlus },
   ],
   contact: [
      { icon: FiMail, text: "spadvertising@live.com", href: "mailto:spadvertising@live.com" },
      { icon: FiGlobe, text: "https://spadvertising.in/", href: "https://www.spadvertising.tech" },
      { icon: FiMapPin, text: "Raipur, Chhattisgarh", href: "#" },
   ],
   social: [
      { icon: FiFacebook, href: "https://www.facebook.com/spadvertisingraipur", label: "Facebook" },
      { icon: FiLinkedin, href: "https://www.linkedin.com/company/sp-advertising20/posts/?feedView=all", label: "LinkedIn" },
      { icon: FiInstagram, href: "https://www.instagram.com/spadvertisingrpr/", label: "Instagram" },
   ],
};

const FEATURES_LIST = [
   { icon: RiWhatsappLine, text: "Official WhatsApp API" },
   { icon: RiRobot2Line, text: "AI Chatbot" },
   { icon: FiMessageCircle, text: "Live Chat" },
   { icon: FiSend, text: "Broadcast" },
   { icon: RiDashboardLine, text: "Dashboard" },
];

// ==================== SUB-COMPONENTS ====================

const BrandSection = () => (
   <div>
      <div className="flex items-center gap-3">
         {/* <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-green-500">
            <RiWhatsappLine className="h-7 w-7 text-white" />
         </div> */}
         {/* <h2 className="text-2xl font-bold text-white">SP Advertising</h2> */}
         <Link to="/" className="flex items-center">
            <img
               src={logo}
               alt="SP Advertising"
               className="h-14 w-auto transition duration-300 hover:scale-110"
            />
         </Link>
      </div>

      <p className="mt-5 leading-7 text-gray-400">
         Official WhatsApp Business API platform helping businesses
         automate conversations, broadcasts and customer engagement.
      </p>

      {/* Features List */}
      {/* <div className="mt-6 space-y-2">
         {FEATURES_LIST.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
               <feature.icon className="h-4 w-4 text-green-500" />
               {feature.text}
            </div>
         ))}
      </div> */}

      {/* Social Icons */}
      <div className="mt-6 flex gap-3">
         {FOOTER_LINKS.social.map((social, index) => (
            <a
               key={index}
               href={social.href}
               aria-label={social.label}
               className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-gray-400 transition hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 hover:text-white hover:-translate-y-1"
            >
               <social.icon className="h-5 w-5" />
            </a>
         ))}
      </div>
   </div>
);

const FooterLinkGroup = ({ title, links }) => (
   <div>
      <h3 className="mb-6 text-lg font-semibold text-white">{title}</h3>
      <ul className="space-y-3">
         {links.map((link, index) => {
            const Icon = link.icon;
            return link.to ? (
               <li key={index}>
                  <Link
                     to={link.to}
                     className="group flex items-center gap-2 text-gray-400 transition hover:text-green-400"
                  >
                     {/* <Icon className="h-4 w-4 text-gray-600 transition group-hover:text-green-400" /> */}
                     {link.label}
                  </Link>
               </li>
            ) : (
               <li key={index}>
                  <a
                     href={link.href}
                     className="group flex items-center gap-2 text-gray-400 transition hover:text-green-400"
                  >
                     {/* <Icon className="h-4 w-4 text-gray-600 transition group-hover:text-green-400" /> */}
                     {link.label}
                  </a>
               </li>
            );
         })}
      </ul>
   </div>
);

const ContactSection = () => (
   <div>
      <h3 className="mb-6 text-lg font-semibold text-white">Contact</h3>
      <ul className="space-y-4">
         {FOOTER_LINKS.contact.map((item, index) => (
            <li key={index}>
               <a
                  href={item.href}
                  className="group flex items-center gap-3 text-gray-400 transition hover:text-green-400"
               >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 transition group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-green-500">
                     <item.icon className="h-5 w-5" />
                  </div>
                  <span>{item.text}</span>
               </a>
            </li>
         ))}
      </ul>

      {/* Newsletter */}
      {/* <div className="mt-8">
         <h4 className="mb-3 text-sm font-semibold text-gray-300">Subscribe to Newsletter</h4>
         <div className="flex">
            <input
               type="email"
               placeholder="Enter your email"
               className="flex-1 rounded-l-xl bg-slate-800 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="rounded-r-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 text-white transition hover:from-green-600 hover:to-emerald-700">
               <FiSend className="h-5 w-5" />
            </button>
         </div>
      </div> */}
   </div>
);

const ScrollToTop = () => {
   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   return (
      <button
         onClick={scrollToTop}
         className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-2xl transition hover:-translate-y-1 hover:shadow-3xl"
         aria-label="Scroll to top"
      >
         <FiArrowUp className="h-6 w-6" />
      </button>
   );
};

// ==================== MAIN COMPONENT ====================

const Footer = () => {
   const currentYear = new Date().getFullYear();

   return (
      <>
         <footer className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-16">

            {/* Top Wave Effect */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-slate-900/50"></div>

            {/* Top Section */}
            <div className="relative mx-auto max-w-7xl px-6 pb-16">
               <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                  {/* Brand Section */}
                  <BrandSection />

                  {/* Product Links */}
                  <FooterLinkGroup title="Product" links={FOOTER_LINKS.product} />

                  {/* Company Links */}
                  <FooterLinkGroup title="Company" links={FOOTER_LINKS.company} />

                  {/* Contact Section */}
                  <ContactSection />

               </div>
            </div>

            {/* Divider */}
            <div className="relative mx-auto max-w-7xl px-6">
               <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
            </div>

            {/* Bottom Section */}
            <div className="relative mx-auto max-w-7xl px-6 py-8">
               <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

                  {/* Copyright */}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                     <span>© {currentYear} SP Advertising.</span>

                  </div>

                  {/* Bottom Links */}
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                     <Link
                        to="/privacy-policy"
                        className="flex items-center gap-1 text-gray-400 transition hover:text-white"
                     >
                        <FiShield className="h-4 w-4" />
                        Privacy Policy
                     </Link>
                     <Link
                        to="/terms-of-service"
                        className="flex items-center gap-1 text-gray-400 transition hover:text-white"
                     >
                        <FiFileText className="h-4 w-4" />
                        Terms of Service
                     </Link>
                     <span className="text-gray-600">|</span>
                     {/* <span className="text-gray-500">Version 2.0.0</span> */}
                  </div>

               </div>
            </div>

            {/* Scroll to Top Button */}
            <ScrollToTop />

         </footer>

         {/* Add this to your global CSS for animation */}
         <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      </>
   );
};

export default Footer;