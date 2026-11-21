import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

const quotations = [
  { id: "8000", label: "8000 Birds (200*30')", image: "8000bird.png" },
  { id: "9333", label: "9333 Birds (200*35')", image: "9333bird.png" },
  { id: "10000", label: "10000 Birds (250*30')", image: "10000bird.png" },
  { id: "10667", label: "10667 Birds (200*40')", image: "10667bird.png" },
  { id: "11667", label: "11667 Birds (250*35')", image: "11667bird.png" },
  { id: "12000", label: "12000 Birds (200*45')", image: "12000bird.png" },
  { id: "12001", label: "12000 Birds (300*30')", image: "12000bird1.png" },
  { id: "13333", label: "13333 Birds (200*50')", image: "13333bird.png" },
  { id: "13334", label: "13333 Birds (250*40')", image: "13333bird1.png" },
  { id: "14000", label: "14000 Birds (300*35')", image: "14000bird.png" },
  { id: "14001", label: "14000 Birds (350*30')", image: "14000bird1.png" },
  { id: "15000", label: "15000 Birds (250*45')", image: "15000bird.png" },
  { id: "16000", label: "16000 Birds (300*40')", image: "16000bird.png" },
  { id: "16333", label: "16333 Birds (350*35')", image: "16333bird.png" },
  { id: "16667", label: "16667 Birds (250*50')", image: "16667bird.png" },
  { id: "18000", label: "18000 Birds (300*45')", image: "18000bird.png" },
  { id: "18667", label: "18667 Birds (350*40')", image: "18667bird.png" },
  { id: "20000", label: "20000 Birds (300*50')", image: "20000bird.png" },
  { id: "21000", label: "21000 Birds (350*45')", image: "21000bird.png" },
  { id: "23333", label: "23333 Birds (350*50')", image: "23333bird.png" },
];

const layerQuotations = [
  { id: "3960", label: "3960 Birds", image: "3960.png" },
  { id: "4000", label: "4000 Birds", image: "4000.png" },
  { id: "4001", label: "4001 Birds", image: "4001.png" },
  { id: "5040", label: "5040 Birds", image: "5040.png" },
  { id: "5041", label: "5041 Birds", image: "5041.png" },
  { id: "10080", label: "10080 Birds", image: "10080.png" },
  { id: "10081", label: "10081 Birds", image: "10081.png" },
  { id: "12000", label: "12000 Birds", image: "12000.png" },
  { id: "12001", label: "12001 Birds", image: "12001.png" },
  { id: "15000", label: "15000 Birds", image: "15000.png" },
  { id: "15001", label: "15001 Birds", image: "15001.png" },
  { id: "18000", label: "18000 Birds", image: "18000.png" },
];

const IDLE_RESET_MS = 90_000;

export default function QuotationPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get("number");
  const hasInitialQuotation = quotations.some(({ id }) => id === initialId);
  const [selectedId, setSelectedId] = useState(hasInitialQuotation ? initialId : null);
  const [selectedCategory, setSelectedCategory] = useState(hasInitialQuotation ? "broiler" : null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [status, setStatus] = useState(
    initialId && !hasInitialQuotation
      ? "That quotation number is not available. Please choose one from the list."
      : "",
  );
  const [fullScreen, setFullScreen] = useState(Boolean(document.fullscreenElement));
  const idleTimer = useRef(null);
  const selected = selectedCategory === "layer"
    ? layerQuotations.find(({ id }) => id === selectedId)
    : quotations.find(({ id }) => id === selectedId);

  const clearSelection = useCallback((message = "Ready for the next visitor. Select a quotation to begin.") => {
    setSelectedId(null);
    setImageLoaded(false);
    setImageError(false);
    setStatus(message);
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const selectQuotation = (quotation) => {
    setSelectedId(quotation.id);
    setImageLoaded(false);
    setImageError(false);
    setStatus("");
    setSearchParams({ number: quotation.id }, { replace: true });
  };

  const selectLayerQuotation = (quotation) => {
    selectQuotation(quotation);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedId(null);
    setImageLoaded(false);
    setImageError(false);
    setStatus("");
    setSearchParams({}, { replace: true });
  };

  useEffect(() => {
    const resetIdleTimer = () => {
      window.clearTimeout(idleTimer.current);
      if (!document.hidden) {
        idleTimer.current = window.setTimeout(() => clearSelection(), IDLE_RESET_MS);
      }
    };
    const handleVisibility = () => {
      if (document.hidden) {
        window.clearTimeout(idleTimer.current);
      } else {
        resetIdleTimer();
      }
    };
    document.addEventListener("pointerdown", resetIdleTimer, { passive: true });
    document.addEventListener("keydown", resetIdleTimer);
    document.addEventListener("visibilitychange", handleVisibility);
    resetIdleTimer();
    return () => {
      window.clearTimeout(idleTimer.current);
      document.removeEventListener("pointerdown", resetIdleTimer);
      document.removeEventListener("keydown", resetIdleTimer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [clearSelection]);

  useEffect(() => {
    const handleFullscreen = () => {
      setFullScreen(Boolean(document.fullscreenElement));
      setStatus("");
    };
    document.addEventListener("fullscreenchange", handleFullscreen);
    return () => document.removeEventListener("fullscreenchange", handleFullscreen);
  }, []);

  const toggleFullScreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else {
        throw new Error("Fullscreen is not supported by this browser.");
      }
    } catch (error) {
      setStatus(`${error.message} Use the browser's kiosk setting if needed.`);
    }
  };

  return (
    <main className="quotation-app">
      <header className="quotation-topbar">
        <h1>Easy Agrotech <span aria-hidden="true">|</span> Quotations</h1>
        <div className="quotation-topbar-actions">
          <p role="status" aria-live="polite">{status}</p>
          <NavLink to="/" className="quotation-return">Back to site</NavLink>
          <button type="button" onClick={toggleFullScreen}>
            {fullScreen ? "Exit full screen" : "Enter full screen"}
          </button>
        </div>
      </header>
      <div className="quotation-main">
        <section className="quotation-chooser" aria-labelledby="quotation-heading">
          <h2 id="quotation-heading">
            {selectedCategory === null
              ? "Choose a category"
              : selectedCategory === "broiler"
                ? "Choose a house size"
                : "Layer quotations"}
          </h2>
          <p className="quotation-help">
            {selectedCategory === null
              ? "Select Broiler or Layer to continue."
              : selectedCategory === "broiler"
                ? "Tap a quotation to display its QR code."
                  : "Tap a Layer quotation to display its QR code."}
          </p>
          <div className="quotation-categories" aria-label="Quotation categories">
            {selectedCategory === null ? (
              <div className="quotation-category-buttons" aria-label="Quotation categories">
                <button
                  type="button"
                  className="quotation-category-button"
                  onClick={() => selectCategory("broiler")}
                >
                  <span className="quotation-category-number">1.</span>
                  <span>Broiler</span>
                </button>
                <button
                  type="button"
                  className="quotation-category-button"
                  onClick={() => selectCategory("layer")}
                >
                  <span className="quotation-category-number">2.</span>
                  <span>Layer</span>
                </button>
              </div>
            ) : (
              <section className="quotation-category" aria-labelledby="selected-category-heading">
                <button
                  type="button"
                  className="quotation-category-back"
                  onClick={() => selectCategory(null)}
                >
                  ← All categories
                </button>
                <h3 id="selected-category-heading">
                  {selectedCategory === "broiler" ? "Broiler" : "Layer"}
                </h3>
                {selectedCategory === "broiler" ? (
                  <div className="quotation-list" aria-label="Broiler quotations">
                    {quotations.map((quotation) => (
                      <button
                        key={quotation.id}
                        className="quotation-button"
                        type="button"
                        aria-pressed={selectedId === quotation.id}
                        onClick={() => selectQuotation(quotation)}
                      >
                        {quotation.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="quotation-list" aria-label="Layer quotations">
                    {layerQuotations.map((quotation) => (
                      <button
                        key={quotation.id}
                        className="quotation-button"
                        type="button"
                        aria-pressed={selectedId === quotation.id}
                        onClick={() => selectLayerQuotation(quotation)}
                      >
                        {quotation.label}
                      </button>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
          <p className="quotation-note">
            For kiosk installation, launch the browser in kiosk mode. The full-screen
            button hides browser controls when supported.
          </p>
        </section>
        <section className="quotation-viewer" aria-labelledby="qr-heading" aria-live="polite">
          <h2 id="qr-heading">Quotation QR code</h2>
          <div className="quotation-image-stage">
            {!selected && (
              <p className="quotation-empty">
                {status || (
                  selectedCategory === "layer"
                    ? "Select a Layer quotation to display its QR code here."
                    : selectedCategory === "broiler"
                      ? "Select a Broiler quotation to display its QR code here."
                      : "Choose Broiler or Layer to begin."
                )}
              </p>
            )}
            {selected && !imageLoaded && !imageError && (
              <p className="quotation-empty">Loading {selected.label}...</p>
            )}
            {selected && (
              <img
                className={`quotation-image ${imageLoaded ? "quotation-image-visible" : ""}`}
                src={`/images/${selectedCategory === "layer" ? "layerscanner" : "scanner"}/${encodeURIComponent(selected.image)}`}
                alt={`Quotation QR code for ${selected.label}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setStatus("");
                }}
              />
            )}
            {selected && imageError && (
              <p className="quotation-empty" role="alert">
                The QR image for {selected.label} could not be loaded. Please contact staff.
              </p>
            )}
          </div>
          {selected && imageLoaded && <p className="quotation-caption">{selected.label}</p>}
        </section>
      </div>
    </main>
  );
}
