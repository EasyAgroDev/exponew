import { NavLink } from "react-router-dom";

const controllers = [
  {
    label: "EV-16",
    to: "/controller/ev-16",
    image: "/Controller/productscontroller/EV-16.jpeg",
    specifications: [
      "16 Relay Outputs",
      "RS485 Digital Sensor Support",
      "IoT Enabled",
      "Smart Emergency Alerts",
      "User-Friendly Firmware",
    ],
  },
  {
    label: "EV-06",
    image: "/Controller/productscontroller/EV-06.jpeg",
    specifications: [
      "6 Relay Outputs",
      "Smart Temperature & Humidity Monitoring",
      "Intelligent Fan Control",
      "Smart Emergency Alerts",
      "User-Friendly Firmware",
    ],
  },
  {
    label: "EV-04",
    image: "/Controller/productscontroller/EV-04.jpeg",
    specifications: [
      "4 Relay Outputs",
      "Wi-Fi Configuration",
      "Smart Temperature Monitoring",
      "Automated Fan Control",
      "Smart Emergency Alerts",
    ],
  },
  {
    label: "EV-02",
    image: "/Controller/productscontroller/EV-02.png",
    specifications: [
      "2 Relay Outputs",
      "Smart Temperature & Humidity Monitoring",
      "Wi-Fi Configuration",
      "Automated Fan & Coolpad Control",
      "Real-Time Monitoring & Control",
    ],
  },
  {
    label: "VEE-1314",
    to: "/controller/vee-1314",
    image: "/Controller/productscontroller/VEE-1314.jpeg",
    specifications: [
      "14 Relay Outputs",
      "Advanced Temperature & Humidity Monitoring",
      "Remote Monitoring & Control",
      "Smart Emergency Alerts",
      "User-Friendly Firmware",
    ],
  },
];

const sensors = ["TS-EV", "HS-EV", "CO2-EV", "NH3-EV"];

function ControllerCard({ model, to, image, specifications }) {
  const card = (
    <>
      <div
        className={`controller-card-image${image ? " controller-card-image-with-image" : ""}`}
        aria-hidden={image ? undefined : "true"}
      >
        {image && <img src={image} alt={`${model} controller`} loading="lazy" />}
      </div>
      <div className="controller-card-details">
        <span className="controller-card-type">POULTRY CONTROLLER</span>
        <h3>{model}</h3>
        {specifications && (
          <div className="controller-card-specifications">
            <h4>Specifications</h4>
            <ul>
              {specifications.map((specification) => (
                <li key={specification}><strong>{specification}</strong></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );

  return to ? (
    <NavLink className="controller-catalog-card" to={to}>{card}</NavLink>
  ) : (
    <article className="controller-catalog-card controller-catalog-card-unavailable">{card}</article>
  );
}

function SensorCard({ model }) {
  return (
    <article className="sensor-catalog-card">
      <strong>{model}</strong>
    </article>
  );
}

export default function ControllerCatalogPage() {
  return (
    <main className="content-page controller-catalog-page">
      <section className="page-intro">
        <span className="eyebrow">CLIMATE CONTROL SOLUTIONS</span>
        <h1>Our <em>Controllers</em></h1>
        <p>Choose a controller to explore its simulator.</p>
      </section>
      <section className="controller-catalog-section" aria-labelledby="controllers-heading">
        <h2 className="controller-catalog-heading" id="controllers-heading">Controllers</h2>
        <div className="controller-catalog-grid">
          {controllers.map((controller) => (
            <ControllerCard
              key={controller.label}
              model={controller.label}
              to={controller.to}
              image={controller.image}
              specifications={controller.specifications}
            />
          ))}
        </div>
      </section>
      <section className="controller-catalog-section" aria-labelledby="sensors-heading">
        <h2 className="controller-catalog-heading" id="sensors-heading">Sensors</h2>
        <div className="sensor-catalog-grid">
          {sensors.map((sensor) => (
            <SensorCard key={sensor} model={sensor} />
          ))}
        </div>
      </section>
    </main>
  );
}
