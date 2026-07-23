import Navbar from "../../components/Landing/Navbar";
import Hero from "../../components/Landing/Hero";
import Features from "../../components/Landing/Features";
import HowItWorks from "../../components/Landing/HowItWorks";
import DashboardPreview from "../../components/Landing/DashboardPreview";
import WhyUs from "../../components/Landing/WhyUs";
import Pricing from "../../components/Landing/Pricing";
import FAQ from "../../components/Landing/FAQ";
import Footer from "../../components/Landing/Footer";

const Landing = () => {
   return (
      <>
         <Navbar />
         <Hero />
         <Features />
         <HowItWorks />
         <DashboardPreview />
         <WhyUs />
         <Pricing />
         <FAQ />
         <Footer />
      </>
   );
};

export default Landing;