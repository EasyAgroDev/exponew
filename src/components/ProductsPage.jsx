const products = [
  { name: 'BOX FAN 40" 3PH', category: "VENTILATION SYSTEM", price: "₹25,000", image: "Box Fan 40.png" },
  { name: 'BOX FAN 54" 3PH', category: "VENTILATION SYSTEM", price: "₹40,000", image: "Box Fan 54.png" },
  { name: 'CONE FAN 54" 3PH', category: "VENTILATION SYSTEM", price: "₹45,000", image: "Cone Fan 54.png" },
  { name: "AXIAL FAN", category: "VENTILATION SYSTEM", price: "₹10,000", image: "Axial Fan.png" },
  { name: "STARTPRO FEED PAN", category: "FEED SYSTEM", price: "₹400", image: "Startpro Feed Pan.png" },
  { name: "MAXX FEED PAN", category: "FEED SYSTEM", price: "₹400", image: "Maxx Feed Pan.png" },
  { name: "TURBO FEEDER", category: "FEED SYSTEM", price: "₹140", image: "Turbo Feeder.png" },
  { name: "CHICKS DRINKER", category: "DRINK SYSTEM", price: "₹120", image: "Chicks Drinker.png" },
  { name: "DRIP CUP", category: "DRINK SYSTEM", price: "₹12", image: "Drip Cup.png" },
  { name: "NIPPLE PIN", category: "DRINK SYSTEM", price: "₹25-28", image: "Nipple Pin.png" },
  { name: 'COOLING PAD (6\'x 2\'x 6")', category: "COOLING SYSTEM", price: "₹2,500", image: "Cooling Pad.png" },
  { name: "SQUARE PIPE", category: "DRINK SYSTEM", price: "₹130", image: "Sq Pipes.png" },
  { name: "S.A AUGER (In Feet)", category: "AUGER SYSTEM", price: "₹70", image: "South Africa Augur.png" },
];

export default function ProductsPage() {
  return (
    <main className="content-page products-page">
      <section className="page-intro">
        <span className="eyebrow">BUILT FOR BETTER FARMING</span>
        <h1>Our <em>Products</em></h1>
        <p>Dependable poultry equipment designed to support every part of your operation.</p>
      </section>
      <aside className="product-info-callout" aria-label="Pricing and product information">
        <p className="product-tax-note">Prices are exclusive of GST.</p>
        <div className="product-info-qr">
          <img
            src="/images/products/productprice.png"
            alt="QR code for Easy Agrotech product prices and information"
          />
          <p>For more product information, scan this QR code.</p>
        </div>
      </aside>
      <section className="product-grid" aria-label="Product catalog">
        {products.map((product, index) => (
          <article className="product-card" key={product.name}>
            <div className="product-image-wrap">
              <img
                src={`/images/product/${encodeURIComponent(product.image)}`}
                alt={product.name}
                loading={index > 5 ? "lazy" : "eager"}
              />
              <span className="product-index">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="product-details">
              <span className="product-category">{product.category}</span>
              <h2>{product.name}</h2>
              <p className="product-price">{product.price}</p>
              <p className="product-gst-note">Exclusive of GST</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
