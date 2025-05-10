import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Car } from "../components/CarCard";

const CarDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car } = location.state as { car: Car };

  // More realistic E-Class data for the detail page
  const specs = {
    year: "2025",
    fuelType: "Petrol",
    transmission: "Automatic",
    horsepower: "255 Horsepower",
    bodyType: "Saloon",
    exteriorColor: "Metallic Paint Graphite Grey",
    interiorColor: "Nappa Leather Tonka Brown / Black",
    vsb: "126874"
  };

  // Images for the gallery thumbnails - we'll use the same image for all in this example
  const images = [car.img, car.img, car.img, car.img, car.img];
  const [selectedImage, setSelectedImage] = React.useState(0);

  return (
    <div style={{ flex: 1, background: "#f2f2f2" }}>
      {/* Breadcrumb */}
      <div style={{ background: "#f2f2f2", borderBottom: "1px solid #e6e6e6", padding: "12px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center" }}>
          <button 
            onClick={() => navigate(-1)}
            style={{ background: "none", border: "none", display: "flex", alignItems: "center", cursor: "pointer", padding: 0, marginRight: 15 }}
          >
            <svg width="20" height="20" fill="#0a75c9"><path d="M15 10H5M8 6l-4 4 4 4" stroke="#0a75c9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
            <span style={{ marginLeft: 5, color: "#0a75c9", fontSize: 15 }}>Back</span>
          </button>
          <span style={{ color: "#777", fontSize: 14 }}>You are here:</span>
          <span style={{ color: "#777", fontSize: 14, margin: "0 5px" }}>Homepage &gt;</span>
          <span style={{ color: "#777", fontSize: 14, margin: "0 5px" }}>Stock &gt;</span>
          <span style={{ fontSize: 14 }}>Mercedes-Benz E-Class E 300 Sedan</span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "30px 16px", display: "flex", flexWrap: "wrap", gap: 30 }}>
        {/* Left column */}
        <div style={{ flex: "1 1 600px" }}>
          <h1 style={{ fontSize: 28, fontWeight: 500, color: "#333", marginBottom: 5 }}>Mercedes-Benz E-Class</h1>
          <h2 style={{ fontSize: 20, fontWeight: 400, color: "#333", marginTop: 0 }}>E 300 Sedan</h2>
          
          {/* Car image */}
          <div style={{ position: "relative", marginTop: 20, borderRadius: 12, overflow: "hidden" }}>
            <img 
              src={images[selectedImage]} 
              alt="Mercedes-Benz E-Class" 
              style={{ width: "100%", objectFit: "cover", height: "auto", background: "#f7f7f7" }} 
            />
            <button style={{ position: "absolute", right: 10, top: 10, background: "rgba(255,255,255,0.8)", border: "none", borderRadius: 5, padding: 8, cursor: "pointer" }}>
              <svg width="24" height="24" fill="none" stroke="#333"><path d="M9 3h6l2 2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-2z M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.8)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="18" height="18" fill="none"><path d="M12 3L5 10l7 7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.8)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="18" height="18" fill="none"><path d="M6 3l7 7-7 7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>

          {/* Thumbnails */}
          <div style={{ display: "flex", gap: 10, marginTop: 15, overflow: "auto", padding: "5px 0" }}>
            {images.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedImage(i)}
                style={{ 
                  width: 100, 
                  height: 70, 
                  flexShrink: 0, 
                  borderRadius: 8, 
                  overflow: "hidden", 
                  border: i === selectedImage ? "2px solid #0a75c9" : "1px solid #ddd",
                  cursor: "pointer"
                }}
              >
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>

          {/* Car specs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 30, justifyContent: "space-between" }}>
            {Object.entries(specs).slice(0, 5).map(([key, value], index) => (
              <div key={key} style={{ textAlign: "center", width: "18%", padding: "15px 0" }}>
                <div style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {index === 0 && (
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
                      <rect x="4" y="5" width="16" height="16" rx="2" />
                      <path d="M16 3v4" />
                      <path d="M8 3v4" />
                      <path d="M4 11h16" />
                      <path d="M10 16h4" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
                      <path d="M3 14h3a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2H5" />
                      <path d="M5 10V8h12v14H5v-2" />
                      <path d="M13 8V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v3" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
                      <rect x="5" y="3" width="14" height="18" rx="2" ry="2" />
                      <line x1="9" y1="7" x2="15" y2="7" />
                      <line x1="9" y1="11" x2="15" y2="11" />
                      <line x1="9" y1="15" x2="13" y2="15" />
                    </svg>
                  )}
                  {index === 3 && (
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
                      <path d="M18 20V10" />
                      <path d="M12 20V4" />
                      <path d="M6 20v-6" />
                    </svg>
                  )}
                  {index === 4 && (
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
                      <rect x="3" y="6" width="18" height="12" rx="2" />
                      <path d="M3 10h18" />
                    </svg>
                  )}
                </div>
                <div style={{ fontSize: 15, color: "#333", marginTop: 8 }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Specs table */}
          <div style={{ marginTop: 30 }}>
            {Object.entries(specs).map(([key, value], i) => (
              <div key={key} style={{ 
                display: "flex", 
                padding: "12px 0", 
                borderBottom: i < Object.entries(specs).length - 1 ? "1px solid #e6e6e6" : "none"
              }}>
                <div style={{ width: 160, color: "#666", fontSize: 15 }}>{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div style={{ flex: 1, color: "#333", fontSize: 15 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ flex: "1 1 380px", background: "#fff", borderRadius: 12, padding: 20, height: "fit-content" }}>
          <h2 style={{ fontSize: 24, fontWeight: 500, color: "#333", marginTop: 0 }}>Start your purchase</h2>
          
          {/* Price */}
          <div style={{ fontSize: 26, fontWeight: 700, marginTop: 20 }}>AED 433,900 <span style={{ fontSize: 14, fontWeight: 400 }}>incl. VAT</span></div>
          
          {/* Finance button */}
          <button style={{ 
            width: "100%", 
            background: "#0070cc", 
            color: "#fff", 
            border: "none", 
            borderRadius: 8, 
            padding: "15px 0", 
            fontSize: 18, 
            fontWeight: 600,
            marginTop: 20,
            cursor: "pointer"
          }}>
            Finance
          </button>
          <div style={{ textAlign: "center", fontSize: 14, color: "#777", marginTop: 5 }}>AED 7,882.52/month</div>
          
          {/* Reserve button */}
          <button style={{ 
            width: "100%", 
            background: "#fff", 
            color: "#0070cc", 
            border: "1px solid #0070cc", 
            borderRadius: 8, 
            padding: "15px 0", 
            fontSize: 18, 
            fontWeight: 600,
            marginTop: 15,
            cursor: "pointer"
          }}>
            Reserve
          </button>
          <div style={{ textAlign: "center", fontSize: 14, color: "#777", marginTop: 5 }}>AED 5,000</div>
          
          {/* Finance details */}
          <div style={{ marginTop: 25 }}>
            <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 10 }}>AED 7,882.52/month Finance</div>
            <p style={{ fontSize: 14, lineHeight: 1.5, color: "#555" }}>
              With Finance you pay for the car in a series of monthly payments. At the end of the term, after all payments and the purchase fee is made you take full ownership of the vehicle.
            </p>
            <a href="#" style={{ color: "#0070cc", textDecoration: "none", fontSize: 14 }}>Learn more about Finance</a>
          </div>
          
          {/* Deposit */}
          <div style={{ marginTop: 25, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>Deposit</div>
            <div style={{ color: "#0070cc", fontWeight: 500 }}>AED 86,780</div>
          </div>
          
          {/* Term Length */}
          <div style={{ marginTop: 25 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>Term Length</div>
              <div style={{ color: "#0070cc", fontWeight: 500 }}>48 months</div>
            </div>
            <div style={{ marginTop: 15, position: "relative", height: 6, background: "#e6e6e6", borderRadius: 3 }}>
              <div style={{ position: "absolute", right: 0, top: -7, width: 20, height: 20, borderRadius: "50%", background: "#0070cc" }}></div>
              <div style={{ width: "100%", height: "100%", background: "#0070cc", borderRadius: 3 }}></div>
            </div>
          </div>
          
          {/* Accessories */}
          <div style={{ marginTop: 30 }}>
            <h3 style={{ fontSize: 20, fontWeight: 500, color: "#333", marginBottom: 15 }}>Accessories</h3>
            <div style={{ background: "#f9f9f9", borderRadius: 8, padding: 15 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>None Selected</div>
                <button style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                  <svg width="24" height="24" fill="none" stroke="#333" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 5 }}>20 available</div>
              <div style={{ fontSize: 13, color: "#666", marginTop: 3 }}>AED 36.75 - AED 1,614.90</div>
            </div>
          </div>
          
          {/* Collection or delivery */}
          <div style={{ marginTop: 30 }}>
            <h3 style={{ fontSize: 20, fontWeight: 500, color: "#333", marginBottom: 15 }}>Collection or delivery</h3>
            <div style={{ display: "flex", gap: 15 }}>
              <div style={{ flex: 1, background: "#0070cc", color: "#fff", borderRadius: 8, padding: 15, cursor: "pointer" }}>
                <div style={{ fontWeight: 500, marginBottom: 5 }}>Pick up from showroom</div>
                <div style={{ fontSize: 13 }}>Free</div>
              </div>
              <div style={{ flex: 1, background: "#fff", border: "1px solid #ddd", borderRadius: 8, padding: 15, cursor: "pointer" }}>
                <div style={{ fontWeight: 500, marginBottom: 5 }}>I'd like it delivered</div>
                <div style={{ fontSize: 13 }}>Free</div>
              </div>
            </div>
          </div>
          
          {/* Preferred date */}
          <div style={{ marginTop: 30 }}>
            <h3 style={{ fontSize: 20, fontWeight: 500, color: "#333", marginBottom: 15 }}>Preferred date</h3>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #ddd", borderRadius: 8, padding: "10px 15px" }}>
              <div>11 May 2025</div>
              <svg width="20" height="20" fill="none" stroke="#333" strokeWidth="1.5">
                <rect x="3" y="4" width="14" height="14" rx="2" />
                <path d="M14 2v4" />
                <path d="M6 2v4" />
                <path d="M3 10h14" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;