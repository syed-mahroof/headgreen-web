import Hero from "../components/Hero.jsx";
import TrustBar from "../components/TrustBar.jsx";
import Services from "../components/Services.jsx";
import SmartBooking from "../components/SmartBooking.jsx";
import HeadGreenStoryAd from "../components/HeadGreenStoryAd.jsx";
import CorporateSection from "../components/CorporateSection.jsx";
import GreenImpact from "../components/GreenImpact.jsx";
import Fleet from "../components/Fleet.jsx";
import TechPlatform from "../components/TechPlatform.jsx";
import AppShowcase from "../components/AppShowcase.jsx";
import WhyUs from "../components/WhyUs.jsx";
import Contact from "../components/Contact.jsx";

import SEO from "../components/SEO.jsx";

export default function Home() {
  return (
    <>
      <SEO 
        title="Corporate EV Fleet Kochi | Zero-Emission Employee Transport" 
        description="HeadGreen is Kochi's premier corporate EV fleet. We provide 100% zero-emission electric cab services for employee transport in Infopark & SmartCity." 
        schemaType="Organization" 
      />
      <Hero />
      <TrustBar />
      <Services />
      <SmartBooking />

      {/* ── Story Ad Banner — palate cleanser between Services and Corporate ── */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-10">
        <HeadGreenStoryAd />
      </section>

      <CorporateSection />
      <GreenImpact />
      <Fleet />
      <TechPlatform />
      <AppShowcase />
      <WhyUs />
      <Contact />
    </>
  );
}
