import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = Array.from({ length: 10 }, (_, index) => `/images/${index + 1}.png`);

function Arrow({ direction }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      {direction === "left" ? (
        <path d="M19 12H5m0 0 7 7m-7-7 7-7" />
      ) : (
        <path d="M5 12h14m0 0-7-7m7 7-7 7" />
      )}
    </svg>
  );
}

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((index) => (index + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);

  const previous = (event) => {
    event.stopPropagation();
    setCurrent((index) => (index - 1 + slides.length) % slides.length);
  };
  const next = (event) => {
    event.stopPropagation();
    setCurrent((index) => (index + 1) % slides.length);
  };

  return (
    <main
      className="home-stage"
      aria-label="Featured products"
      onDoubleClick={() => navigate("/products")}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((image, index) => (
          <div className="carousel-slide" key={image} aria-hidden={index !== current}>
            <img src={image} alt={`Easy Agrotech featured product ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="double-tap-hint">
        <span aria-hidden="true">↗</span> Double tap to explore products
      </div>
      <div className="slide-count" aria-live="polite">
        <span>{String(current + 1).padStart(2, "0")}</span>
        <i />
        {String(slides.length).padStart(2, "0")}
      </div>
      <button type="button" className="carousel-control carousel-prev" aria-label="Previous slide" onClick={previous}>
        <Arrow direction="left" />
      </button>
      <button type="button" className="carousel-control carousel-next" aria-label="Next slide" onClick={next}>
        <Arrow direction="right" />
      </button>
    </main>
  );
}
