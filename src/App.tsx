import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import EventsPage from "./pages/EventsPage";
import ShopPage from "./pages/ShopPage";
import JournalPage from "./pages/JournalPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import CustomCursor from "./components/drip/CustomCursor";
import ClickRipple from "./components/drip/ClickRipple";
import ScrollProgressBar from "./components/drip/ScrollProgressBar";
import SpotlightFollow from "./components/drip/SpotlightFollow";
import Preloader from "./components/drip/Preloader";
import PageTransition from "./components/drip/PageTransition";
import SkipToContent from "./components/drip/SkipToContent";
import LocalBusinessSchema from "./components/drip/LocalBusinessSchema";
import NoiseOverlay from "./components/drip/NoiseOverlay";
import { useKonamiCode } from "./hooks/useEasterEggs";

const queryClient = new QueryClient();

const KonamiWrapper = ({ children }: { children: React.ReactNode }) => {
  useKonamiCode();
  return <>{children}</>;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/menu" element={<PageTransition><MenuPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/events" element={<PageTransition><EventsPage /></PageTransition>} />
        <Route path="/shop" element={<PageTransition><ShopPage /></PageTransition>} />
        <Route path="/journal" element={<PageTransition><JournalPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LocalBusinessSchema />
          <SkipToContent />
          <NoiseOverlay />
          {!loaded && <Preloader onComplete={handleLoaded} />}
          <CustomCursor />
          <ClickRipple />
          <ScrollProgressBar />
          <SpotlightFollow />
          <KonamiWrapper>
            <BrowserRouter>
              <AnimatedRoutes />
            </BrowserRouter>
          </KonamiWrapper>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
