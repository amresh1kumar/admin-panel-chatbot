// import logo from "../../assets/images/logo.png";
// import { Link, useLocation } from "react-router-dom";

// const Navbar = () => {
//    const location = useLocation();
//    return (
//       <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
//          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

//             {/* Logo */}
//             <Link to="/">
//                <img
//                   src={logo}
//                   alt="SP Advertising"
//                   className="h-14 w-auto"
//                />
//             </Link>

//             {/* Menu */}
//             <nav className="hidden items-center gap-8 lg:flex">
//                <a
//                   href={location.pathname === "/" ? "#features" : "/#features"}
//                   className="font-medium text-gray-700 transition hover:text-blue-600"
//                >
//                   Features
//                </a>

//                <a
//                   href={location.pathname === "/" ? "#how-it-works" : "/#how-it-works"}
//                   className="font-medium text-gray-700 transition hover:text-blue-600"
//                >
//                   How it Works
//                </a>

//                <a
//                   href={location.pathname === "/" ? "#pricing" : "/#pricing"}
//                   className="font-medium text-gray-700 transition hover:text-blue-600"
//                >
//                   Pricing
//                </a>

//                <a
//                   href={location.pathname === "/" ? "#faq" : "/#faq"}
//                   className="font-medium text-gray-700 transition hover:text-blue-600"
//                >
//                   FAQ
//                </a>
//             </nav>

//             {/* Buttons */}
//             <div className="flex items-center gap-4">

//                <Link
//                   to="/login"
//                   className="hidden rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100 md:block"
//                >
//                   Login
//                </Link>

//                <Link
//                   to="/register"
//                   className="rounded-lg bg-green-500 px-5 py-2.5 font-semibold text-white transition hover:bg-green-600"
//                >
//                   Start Free Trial
//                </Link>

//             </div>
//          </div>
//       </header>
//    );
// };

// export default Navbar;

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
   FiChevronDown,
   FiMenu,
   FiX,
   FiMessageCircle,
   FiPhone,
   FiZap,
   FiSend,
   FiBriefcase,
   FiUsers,
   FiBarChart2,
   FiHome,
   FiBookOpen,
   FiHeart,
   FiShoppingCart,
   FiTruck,
} from "react-icons/fi";
import { RiRobot2Line, RiWhatsappLine } from "react-icons/ri";
import logo from "../../assets/images/logo.png";

// ==================== CONSTANTS ====================

const MENU_DATA = [
   {
      id: "ai",
      title: "AI Suite",
      items: [
         {
            label: "WhatsApp",
            Icon: RiWhatsappLine,
            href: "#",
            description: "Official Business API",
            badge: "OFFICIAL",
         },
         {
            label: "AI Chatbot",
            Icon: RiRobot2Line,
            href: "#",
            description: "Conversational AI",
         },
         {
            label: "Voice AI",
            Icon: FiPhone,
            href: "#",
            description: "AI calling agents",
            badge: "NEW",
         },
         {
            label: "Automations",
            Icon: FiZap,
            href: "#",
            description: "Connect & integrate",
         },
         {
            label: "Broadcast",
            Icon: FiSend,
            href: "#",
            description: "Mass messaging",
         },
         {
            label: "Shared Inbox",
            Icon: FiBriefcase,
            href: "#",
            description: "Team collaboration",
         },
         {
            label: "Contact CRM",
            Icon: FiUsers,
            href: "#",
            description: "Manage customers",
         },
         {
            label: "Analytics",
            Icon: FiBarChart2,
            href: "#",
            description: "Track performance",
         },
      ],
   },
   {
      id: "usecase",
      title: "Use Cases",
      items: [
         { label: "Real Estate", Icon: FiHome, href: "#" },
         { label: "Education", Icon: FiBookOpen, href: "#" },
         { label: "Healthcare", Icon: FiHeart, href: "#" },
         { label: "E-Commerce", Icon: FiShoppingCart, href: "#" },
         { label: "Automobile", Icon: FiTruck, href: "#" },
      ],
   },
   {
      id: "company",
      title: "Company",
      items: [
         { label: "About Us", href: "#" },
         { label: "Contact", href: "#" },
         { label: "Privacy Policy", to: "/privacy-policy" },
         { label: "Terms of Service", to: "/terms-of-service" },
      ],
   },
];

// ==================== SUB-COMPONENTS ====================

const DropdownMenu = ({ items, isAiSuite }) => (
   <div
      className={`invisible absolute left-0 top-10 translate-y-4 rounded-2xl border border-gray-100 bg-white p-3 opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${isAiSuite ? "w-[600px]" : "w-72"
         }`}
   >
      <div className={isAiSuite ? "grid grid-cols-2 gap-2" : "space-y-1"}>
         {items.map((item, index) => {
            const Icon = item.Icon;
            const content = (
               <div className="flex items-start gap-3">
                  {Icon && (
                     <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                        <Icon size={20} />
                     </div>
                  )}
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 text-sm">
                           {item.label}
                        </span>
                        {item.badge && (
                           <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                              {item.badge}
                           </span>
                        )}
                     </div>
                     {item.description && (
                        <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">
                           {item.description}
                        </p>
                     )}
                  </div>
               </div>
            );

            return item.to ? (
               <Link
                  key={index}
                  to={item.to}
                  className="block rounded-xl px-3 py-2.5 transition hover:bg-gray-50"
               >
                  {content}
               </Link>
            ) : (
               <a
                  key={index}
                  href={item.href}
                  className="block rounded-xl px-3 py-2.5 transition hover:bg-gray-50"
               >
                  {content}
               </a>
            );
         })}
      </div>
   </div>
);

const DesktopMenuItem = ({ section }) => (
   <div className="group relative">
      <button className="flex items-center gap-1 font-medium text-gray-700 transition hover:text-green-600">
         {section.title}
         <FiChevronDown className="transition duration-300 group-hover:rotate-180" />
      </button>
      <DropdownMenu items={section.items} isAiSuite={section.id === "ai"} />
   </div>
);

const MobileMenuItem = ({ section, isOpen, onToggle, onClose }) => {
   const isAiSuite = section.id === "ai";

   return (
      <>
         <button
            onClick={onToggle}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-semibold text-gray-900 hover:bg-gray-50"
         >
            {section.title}
            <FiChevronDown
               className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
         </button>

         {isOpen && (
            <div className="ml-2 space-y-1 pb-3">
               <div className={isAiSuite ? "grid grid-cols-2 gap-2" : "space-y-1"}>
                  {section.items.map((item, index) => {
                     const Icon = item.Icon;
                     const content = (
                        <div className="flex items-start gap-2">
                           {Icon && (
                              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                                 <Icon size={16} />
                              </div>
                           )}
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                 <span className="font-medium text-sm">{item.label}</span>
                                 {item.badge && (
                                    <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-xs text-green-600">
                                       {item.badge}
                                    </span>
                                 )}
                              </div>
                              {item.description && (
                                 <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">
                                    {item.description}
                                 </p>
                              )}
                           </div>
                        </div>
                     );

                     return item.to ? (
                        <Link
                           key={index}
                           to={item.to}
                           onClick={onClose}
                           className="block rounded-lg px-2 py-2 hover:bg-gray-50"
                        >
                           {content}
                        </Link>
                     ) : (
                        <a
                           key={index}
                           href={item.href}
                           onClick={onClose}
                           className="block rounded-lg px-2 py-2 hover:bg-gray-50"
                        >
                           {content}
                        </a>
                     );
                  })}
               </div>
            </div>
         )}
      </>
   );
};

// ==================== MAIN COMPONENT ====================

const Navbar = () => {
   const [mobileOpen, setMobileOpen] = useState(false);
   const [openMenu, setOpenMenu] = useState("");
   const [scrolled, setScrolled] = useState(false);
   const location = useLocation();

   // Handle scroll effect
   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY > 20);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   // Prevent body scroll when mobile menu is open
   useEffect(() => {
      if (mobileOpen) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "unset";
      }

      return () => {
         document.body.style.overflow = "unset";
      };
   }, [mobileOpen]);

   // Toggle mobile menu
   const toggleMobileMenu = () => {
      setMobileOpen((prev) => !prev);
      setOpenMenu(""); // Reset submenu when closing
   };

   // Toggle sub-menu
   const toggleSubMenu = (menuId) => {
      setOpenMenu((prev) => (prev === menuId ? "" : menuId));
   };

   // Close mobile menu
   const closeMobileMenu = () => {
      setMobileOpen(false);
      setOpenMenu("");
   };

   // Pricing link based on current route
   const pricingHref = location.pathname === "/" ? "#pricing" : "/#pricing";

   return (
      <>
         {/* ==================== HEADER ==================== */}
         <header
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                  ? "border-b border-gray-200 bg-white/90 shadow-lg backdrop-blur-xl"
                  : "bg-white/70 backdrop-blur-md"
               }`}
         >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
               {/* Logo */}
               <Link to="/" className="flex items-center">
                  <img
                     src={logo}
                     alt="SP Advertising"
                     className="h-14 w-auto transition duration-300 hover:scale-110"
                  />
               </Link>

               {/* Desktop Navigation */}
               <nav className="hidden items-center gap-8 lg:flex">
                  {/* AI Suite & Use Cases Dropdowns */}
                  {MENU_DATA.slice(0, 2).map((section) => (
                     <DesktopMenuItem key={section.id} section={section} />
                  ))}

                  {/* Pricing Link */}
                  <a
                     href={pricingHref}
                     className="font-medium text-gray-700 transition hover:text-green-600"
                  >
                     Pricing
                  </a>

                  {/* Company Dropdown */}
                  <DesktopMenuItem section={MENU_DATA[2]} />
               </nav>

               {/* Action Buttons */}
               <div className="flex items-center gap-3">
                  <Link
                     to="/login"
                     className="hidden rounded-xl px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100 lg:block"
                  >
                     Login
                  </Link>

                  <Link
                     to="/register"
                     className="hidden rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 lg:block"
                  >
                     Start Free Trial
                  </Link>

                  {/* Mobile Menu Toggle */}
                  <button
                     onClick={toggleMobileMenu}
                     className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
                     aria-label="Toggle mobile menu"
                  >
                     {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                  </button>
               </div>
            </div>
         </header>

         {/* ==================== MOBILE MENU FULL PAGE ==================== */}
         {mobileOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
               {/* Backdrop */}
               <div
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={closeMobileMenu}
               />

               {/* Menu Content */}
               <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl">
                  <div className="flex h-full flex-col">
                     {/* Header with Logo & Close Button */}
                     <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                        <Link to="/" onClick={closeMobileMenu}>
                           <img
                              src={logo}
                              alt="SP Advertising"
                              className="h-12 w-auto"
                           />
                        </Link>
                        <button
                           onClick={closeMobileMenu}
                           className="rounded-lg p-2 transition hover:bg-gray-100"
                           aria-label="Close menu"
                        >
                           <FiX size={28} />
                        </button>
                     </div>

                     {/* Scrollable Menu Content */}
                     <div className="flex-1 overflow-y-auto px-6 py-6">
                        <div className="space-y-2">
                           {/* AI Suite & Use Cases */}
                           {MENU_DATA.slice(0, 2).map((section) => (
                              <MobileMenuItem
                                 key={section.id}
                                 section={section}
                                 isOpen={openMenu === section.id}
                                 onToggle={() => toggleSubMenu(section.id)}
                                 onClose={closeMobileMenu}
                              />
                           ))}

                           {/* Pricing Link */}
                           <a
                              href={pricingHref}
                              onClick={closeMobileMenu}
                              className="block rounded-xl px-4 py-3 font-semibold text-gray-900 hover:bg-gray-50"
                           >
                              Pricing
                           </a>

                           {/* Company Menu */}
                           <MobileMenuItem
                              section={MENU_DATA[2]}
                              isOpen={openMenu === "company"}
                              onToggle={() => toggleSubMenu("company")}
                              onClose={closeMobileMenu}
                           />
                        </div>
                     </div>

                     {/* Bottom Action Buttons */}
                     <div className="border-t border-gray-200 p-6">
                        <Link
                           to="/login"
                           onClick={closeMobileMenu}
                           className="mb-3 block rounded-xl border-2 border-gray-200 py-3 text-center font-semibold text-gray-900 transition hover:bg-gray-50"
                        >
                           Login
                        </Link>

                        <Link
                           to="/register"
                           onClick={closeMobileMenu}
                           className="block rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 py-3 text-center font-semibold text-white shadow-lg transition hover:shadow-xl"
                        >
                           Start Free Trial
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default Navbar;
