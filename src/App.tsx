import React from "react";

const NAV_ITEMS = [
  { label: "Our Models" },
  { label: "Buy", active: true },
  { label: "Services" },
  { label: "Our Brands" },
  { label: "Technology" },
];

const CARS = [
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

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f2f2f2", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <header style={{ background: "#040404", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", height: 70, maxWidth: 1400, margin: "0 auto", padding: "0 30px", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <img src="https://ext.same-assets.com/1815046438/2150039358.svg" alt="Mercedes Logo" style={{ height: 54, width: 54 }} />
            <span style={{ fontFamily: '"MBCorpoATitleCond-Regular-Web", Tajawal, Arial, sans-serif', fontSize: 22, fontWeight: 400, letterSpacing: 1 }}>Mercedes-Benz</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
            <span style={{ marginRight: 8, fontSize: 15 }}>عربى</span>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 36, width: 36, borderRadius: "50%", background: "#222" }}>
              <svg width="20" height="20" fill="#fff" style={{ display: "block" }}><circle cx="10" cy="7" r="3.5" stroke="#fff" strokeWidth="1" fill="none"/><rect x="4" y="12" width="12" height="5" rx="2.5" stroke="#fff" strokeWidth="1" fill="none"/></svg>
            </span>
          </div>
        </div>
      </header>
      {/* Navbar */}
      <nav style={{ background: "#1a1a1a", borderBottom: "1px solid #232323" }}>
        <div style={{ display: "flex", alignItems: "center", height: 54, maxWidth: 1400, margin: "0 auto", padding: "0 30px" }}>
          {NAV_ITEMS.map((item, i) => (
            <div key={item.label}
              style={{
                color: item.active ? "#fff" : "#b0b0b0",
                fontWeight: item.active ? 700 : 400,
                borderBottom: item.active ? "3px solid #0a75c9" : "none",
                padding: "0 18px",
                fontSize: 17,
                lineHeight: "52px",
                cursor: "pointer",
                transition: "color 0.15s"
              }}>
              {item.label}
            </div>
          ))}
        </div>
      </nav>
      {/* Main Content */}
      <main style={{ flex: 1, width: "100%", background: "#f2f2f2", marginTop: 0, position: "relative" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "36px 16px 0 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h1 style={{ fontSize: 30, fontWeight: 400, color: "#333", letterSpacing: 1 }}>164 vehicles available</h1>
            <div style={{ background: "#fff", borderRadius: 22, padding: "7px 20px", fontSize: 15, color: "#0a75c9", display: "flex", alignItems: "center", border: "1px solid #e8e8e8", cursor: "pointer" }}>
              Lowest Price First
              <svg width="17" height="17" fill="#333" style={{ marginLeft: 8 }}><path d="M4 7 l4 4 4-4" stroke="#0a75c9" strokeWidth="1.5" fill="none"/></svg>
            </div>
          </div>
          {/* Fake blurb for monthly payment disclaimer */}
          <div style={{ background: "#fff", borderRadius: 11, padding: "18px 14px", color: "#4d4d4d", marginBottom: 20, fontSize: 14, boxShadow: "0 1px 5px 0 rgba(0,0,0,0.04)" }}>
            <b>Finance representative example:</b> For display. Payable by 60 payments. All terms for Payment are based on a Selection of agreement of all Models, a total Price 20% of price paid up with a deposit of price at leasing or amount of credit of the price set. The agreement is calculated using a fixed rate of interest at 0.99% per year resulting in a Representative in the APR and a total amount payable of 20,000 AED.
          </div>
          {/* Cars grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(235px, 1fr))", gap: 25 }}>
            {CARS.map((car, idx) => (
              <div key={car.img} style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 7px 0 rgba(80,80,80,.07)", overflow: "hidden", display: "flex", flexDirection: "column", minHeight: 375 }}>
                <a href={car.link} style={{ textDecoration: "none" }}>
                  <img src={car.img} alt={car.title} style={{ width: "100%", height: 160, objectFit: "cover", background: "#eee" }} />
                  <div style={{ padding: "17px 14px 10px 14px", color: "#232323" }}>
                    <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{car.title}</div>
                    <div style={{ fontSize: 13, color: "#555", margin: "7px 0 2px 0" }}>{car.variant}</div>
                    <div style={{ fontSize: 13, color: "#555", marginBottom: 9 }}>{car.paint}</div>
                    <div style={{ color: "#0a75c9", fontWeight: 500, fontSize: 14 }}>{car.pricePerMonth}</div>
                    <div style={{ fontWeight: 700, fontSize: 17, color: "#232323", marginTop: 7 }}>{car.price}</div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
      {/* Cookie consent bar */}
      <div style={{ position: "fixed", left: 0, bottom: 0, width: "100%", zIndex: 20, background: "#3c3c44", color: "#ededed", padding: "22px 16px 19px 16px", display: "flex", justifyContent: "center", alignItems: "center", gap: 18, boxShadow: "0 -3px 12px 0 rgba(0,0,0,0.09)" }}>
        <span style={{ maxWidth: 670, fontSize: 15, lineHeight: 1.7 }}>
          This site uses cookies and related technologies for site operation, analytics and third party advertising purposes as described in our <a href="#" style={{ color: "#67b7fd", textDecoration: "underline" }}>Privacy and Data Processing Policy</a>. You may choose to consent to our use of these technologies, or further manage your preferences.
        </span>
        <button style={{ background: "#217ce5", color: "#fff", border: "none", borderRadius: 14, padding: "9px 23px", marginLeft: 14, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
          Manage Settings
        </button>
        <button style={{ background: "#1f85fc", color: "#fff", border: "none", borderRadius: 14, padding: "9px 23px", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
          Accept All
        </button>
      </div>
      {/* Footer */}
      <footer style={{ background: "#040404", color: "#ededed", display: "block", fontSize: 15, padding: "46px 16px 0 16px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 34, justifyContent: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Buy Online</div>
            <div><a href="#" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Find New Cars</a></div>
            <div><a href="#" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Find Pre-Owned Cars</a></div>
            <div><a href="#" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Contact us</a></div>
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div><a href="#" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Book a Test Drive</a></div>
            <div><a href="#" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Car Configurator</a></div>
            <div><a href="#" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Current Vehicle Offers</a></div>
            <div><a href="#" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Find a Showroom</a></div>
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div><a href="#" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Book a Service</a></div>
            <div><a href="#" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Accessories</a></div>
            <div><a href="#" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Roadside Assistance</a></div>
            <div><a href="#" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>GenuineParts</a></div>
            <div><a href="#" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Owner's Manuals</a></div>
          </div>
        </div>
        <div style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #222", paddingTop: 19, flexWrap: "wrap", fontSize: 15, color: "#888" }}>
          <span>© Gargash Enterprise LLC 2025. All rights reserved</span>
          <div style={{ display: "flex", gap: 15 }}>
            <a href="#" aria-label="Facebook"><svg fill="#ededed" height="21" width="21" viewBox="0 0 24 24"><path d="M17 2h-3c-3.866 0-7 3.134-7 7v3H2v4h5v8h4v-8h3l1-4h-4V9c0-1.103.897-2 2-2h2V2z"/></svg></a>
            <a href="#" aria-label="X"><svg fill="#ededed" height="21" width="21" viewBox="0 0 1000 1000"><path d="M229.2 285.1h165.8l157.1 240.7L718.7 285h161.2L635.7 553.3 902.6 885.8H738.9L562.3 631 364.2 885.8H205.7l282.4-316.2L112.7 285.1z"/></svg></a>
            <a href="#" aria-label="YouTube"><svg fill="#ededed" height="21" width="21" viewBox="0 0 24 24"><path d="M23.498 6.186C23.348 5.68 22.991 5.278 22.499 5.125 21.102 4.75 12 4.75 12 4.75s-9.102 0-10.5.375c-.492.153-.849.555-.999 1.061C.004 7.604 0 9.764 0 11.998c0 2.236.004 4.396.501 5.813.15.505.507.908.999 1.061 1.398.375 10.5.375 10.5.375s9.102 0 10.499-.375c.494-.153.85-.555.999-1.061.498-1.417.502-3.577.502-5.813 0-2.234-.004-4.394-.502-5.812zM9.77 15.709V8.291l7.455 3.709-7.455 3.709z"/></svg></a>
            <a href="#" aria-label="Instagram"><svg fill="#ededed" width="21" height="21" viewBox="0 0 24 24"><path d="M12 3c2.5 0 2.8 0 3.8.054 1 .052 1.542.23 1.903.385a3.6 3.6 0 0 1 1.304.852 3.601 3.601 0 0 1 .852 1.304c.155.361.333.903.385 1.903C21 8.2 21 8.5 21 12c0 3.5 0 3.8-.054 4.8-.052 1-.23 1.542-.385 1.903a3.601 3.601 0 0 1-.852 1.304 3.59 3.59 0 0 1-1.304.852c-.361.155-.903.333-1.903.385-1 .055-1.3.055-3.8.055s-2.8 0-3.8-.054c-1-.052-1.542-.23-1.903-.385a3.57 3.57 0 0 1-1.304-.852A3.601 3.601 0 0 1 3.634 18.7c-.155-.36-.333-.902-.385-1.903C3 15.8 3 15.5 3 12c0-3.5 0-3.8.054-4.8.052-1 .23-1.542.385-1.903A3.57 3.57 0 0 1 4.97 3.993a3.601 3.601 0 0 1 1.304-.852c.361-.155.903-.333 1.903-.385C8.2 3.05 8.5 3 12 3zm0 2.163c-2.46 0-2.748.009-3.712.053-.956.045-1.47.197-1.818.33-.425.165-.73.364-1.05.684a1.946 1.946 0 0 0-.684 1.05c-.132.347-.285.862-.33 1.818C4.01 9.253 4 9.54 4 12c0 2.46.009 2.748.053 3.712.045.956.197 1.47.33 1.818.165.425.364.73.684 1.05.32.32.625.519 1.05.684.347.132.862.285 1.818.33.964.044 1.252.053 3.712.053s2.748-.009 3.712-.053c.956-.045 1.47-.197 1.818-.33.425-.165.73-.364 1.05-.684a1.95 1.95 0 0 0 .684-1.05c.132-.347.285-.862.33-1.818.045-.964.053-1.252.053-3.712s-.008-2.748-.053-3.712c-.045-.956-.197-1.47-.33-1.818a1.946 1.946 0 0 0-.684-1.05 1.98 1.98 0 0 0-1.05-.684c-.348-.133-.862-.285-1.818-.33C14.748 5.172 14.461 5.163 12 5.163zm0 2.274a4.563 4.563 0 1 1 0 9.127 4.563 4.563 0 0 1 0-9.127zm0 1.477a3.086 3.086 0 0 0 0 6.173 3.086 3.086 0 0 0 0-6.173zm6.406-1.823a1.07 1.07 0 1 1-2.141 0 1.07 1.07 0 0 1 2.141 0z"/></svg></a>
          </div>
          <div style={{ display: "flex", gap: 15, fontSize: 15 }}>
            <a href="#" style={{ color: "#ededed", textDecoration: "none" }}>Terms & Conditions</a>
            <a href="#" style={{ color: "#ededed", textDecoration: "none" }}>Cookie Policy</a>
            <a href="#" style={{ color: "#ededed", textDecoration: "none" }}>Data Protection</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
