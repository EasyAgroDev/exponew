import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AboutPage from "./components/AboutPage.jsx";
import ControllerCatalogPage from "./components/ControllerCatalogPage.jsx";
import ControllerPage from "./components/ControllerPage.jsx";
import HomePage from "./components/HomePage.jsx";
import Navigation from "./components/Navigation.jsx";
import ProductsPage from "./components/ProductsPage.jsx";
import QuotationPage from "./components/QuotationPage.jsx";

const KIOSK_IDLE_TIMEOUT_MS = 60_000;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function KioskIdleRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    let idleTimer;
    const resetIdleTimer = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(
        () => navigate("/", { replace: true }),
        KIOSK_IDLE_TIMEOUT_MS,
      );
    };
    const interactionEvents = ["pointerdown", "keydown", "wheel"];

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetIdleTimer, { passive: true });
    });
    resetIdleTimer();

    return () => {
      window.clearTimeout(idleTimer);
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetIdleTimer);
      });
    };
  }, [navigate]);

  return null;
}

export default function App() {
  const location = useLocation();
  const isQuotation = location.pathname === "/quotation";

  return (
    <div className="app-shell">
      <ScrollToTop />
      <KioskIdleRedirect />
      {!isQuotation && <Navigation />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/controller" element={<ControllerCatalogPage />} />
        <Route path="/controller/old" element={<ControllerPage version="old" />} />
        <Route path="/controller/new" element={<ControllerPage version="new" />} />
        <Route path="/controller/ev-16" element={<ControllerPage version="new" />} />
        <Route path="/controller/vee-1314" element={<ControllerPage version="old" />} />
        <Route path="/quotation" element={<QuotationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
