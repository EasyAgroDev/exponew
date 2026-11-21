import { NavLink } from "react-router-dom";

const highlights = [
  { number: "01", title: "Climate control", body: "Controllers and systems designed to manage ventilation, temperature, and humidity." },
  { number: "02", title: "Farm essentials", body: "Practical feeding, drinking, cooling, and ventilation equipment for poultry houses." },
  { number: "03", title: "Built around your operation", body: "Explore equipment options and find a controller experience suited to your setup." },
];

export default function AboutPage() {
  return (
    <main className="content-page about-page">
      <section className="about-hero">
        <div className="about-copy">
          <span className="eyebrow">EASY AGROTECH</span>
          <h1>Scan this <em>QR</em> for better understanding.</h1>
          <p>
            Explore innovative poultry automation solutions designed to support
            efficient ventilation, feeding, drinking, and cooling.
          </p>
          
        </div>
        <img src="/images/brochure/brochureqr.jpeg" alt="Easy Agrotech brochure QR code" />
      </section>
      
    </main>
  );
}
