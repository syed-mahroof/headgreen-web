import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Corporate from "./pages/Corporate.jsx";
import BookTrip from "./pages/BookTrip.jsx";
import Partner from "./pages/Partner.jsx";
import NotFound from "./pages/NotFound.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import Careers from "./components/Careers.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import Blog from "./pages/Blog.jsx";
import LocationInfopark from "./pages/LocationInfopark.jsx";
import LocationSmartCity from "./pages/LocationSmartCity.jsx";

// Show splash once per browser session (not on every SPA navigation)
const SPLASH_KEY = "hg_splash_done";
const shouldShowSplash = !sessionStorage.getItem(SPLASH_KEY);

export default function App() {
  const [splashDone, setSplashDone] = useState(!shouldShowSplash);

  const handleSplashDone = () => {
    sessionStorage.setItem(SPLASH_KEY, "1");
    // state update happens via AnimatePresence exit — no forced re-render needed
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!splashDone && (
          <SplashScreen
            key="splash"
            onDone={() => {
              handleSplashDone();
              // Defer state update so AnimatePresence catches the exit motion first
              setTimeout(() => setSplashDone(true), 50);
            }}
          />
        )}
      </AnimatePresence>

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/book" element={<BookTrip />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/kochi-infopark" element={<LocationInfopark />} />
          <Route path="/smartcity-kakkanad" element={<LocationSmartCity />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

