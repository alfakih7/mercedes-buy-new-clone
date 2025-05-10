import React from "react";
import CarCard, { Car } from "../components/CarCard";

// Same car data from App.tsx
const CARS: Car[] = [
  {
    img: "https://ext.same-assets.com/1815046438/4108292102.jpeg",
    title: "Mercedes-Benz A-Class A 200 Saloon",
    link: "#",
    variant: "2025 | Saloon | Leather, Two-Tone Red Pepper/Black",
    paint: "Solid Paint Night Black",
    pricePerMonth: "AED3,543.67 / month Finance",
    price: "AED238,899",
  },
  {
    img: "https://ext.same-assets.com/1815046438/3115599979.jpeg",
    title: "Mercedes-Benz A-Class A 200 Saloon",
    link: "#",
    variant: "2025 | Saloon | Leather, Two-Tone Red Pepper/Black",
    paint: "Solid Paint Polar White",
    pricePerMonth: "AED3,558.52 / month Finance",
    price: "AED239,900",
  },
  {
    img: "https://ext.same-assets.com/1815046438/2962248577.jpeg",
    title: "Mercedes-Benz A-Class A 200 Saloon",
    link: "#",
    variant: "2025 | Saloon | Leather, Two-Tone Red Pepper/Black",
    paint: "Solid Paint Night Black",
    pricePerMonth: "AED3,617.84 / month Finance",
    price: "AED243,899",
  },
  {
    img: "https://ext.same-assets.com/1815046438/225971229.jpeg",
    title: "Mercedes-Benz A-Class A 200 Saloon",
    link: "#",
    variant: "2025 | Saloon | Leather, Two-Tone Red Pepper/Black",
    paint: "Solid Paint Polar White",
    pricePerMonth: "AED3,632.68 / month Finance",
    price: "AED244,900",
  },
];

const HomePage: React.FC = () => {
  return (
    <main style={{ flex: 1, width: "100%", background: "#f2f2f2", marginTop: 0, position: "relative" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "36px 16px 0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <h1 style={{ fontSize: 30, fontWeight: 400, color: "#333", letterSpacing: 1 }}>164 vehicles available</h1>
          <div style={{ background: "#fff", borderRadius: 22, padding: "7px 20px", fontSize: 15, color: "#0a75c9", display: "flex", alignItems: "center", border: "1px solid #e8e8e8", cursor: "pointer" }}>
            Lowest Price First
            <svg width="17" height="17" fill="#333" style={{ marginLeft: 8 }}><path d="M4 7 l4 4 4-4" stroke="#0a75c9" strokeWidth="1.5" fill="none"/></svg>
          </div>
        </div>
        {/* Cars grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(235px, 1fr))", gap: 25 }}>
          {CARS.map((car, idx) => (
            <CarCard key={idx} car={car} index={idx} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomePage; 