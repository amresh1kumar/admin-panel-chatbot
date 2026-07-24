import Navbar from "../../components/Landing/Navbar";
import Footer from "../../components/Landing/Footer";
import Hero from "../../components/voiceAI/Hero";
import Features from "../../components/voiceAI/Features";
import UseCases from "../../components/voiceAI/UseCases";
import HowItWorks from "../../components/voiceAI/HowItWorks";
import DashboardPreview from "../../components/voiceAI/DashboardPreview";
import Pricing from "../../components/voiceAI/Pricing";
import FAQ from "../../components/voiceAI/FAQ";

const VoiceAI = () => {
   return (
      <>
         <Navbar />
         <Hero />
         <Features/>
         <UseCases/>
         <HowItWorks/>
         <DashboardPreview/>
         <Pricing/>
         <FAQ/>
         <Footer />
      </>
   );
};

export default VoiceAI;