import React from "react";
import { useNavigate } from "react-router-dom";

// Define the Car interface
export interface Car {
  id?: string;
  img: string;
  title: string;
  link: string;
  variant: string;
  paint: string;
  pricePerMonth: string;
  price: string;
  category?: string;
  availability?: string;
  year?: string;
  interior?: string;
  galleryImages?: string[];
}

interface CarCardProps {
  car: Car;
  index: number;
}

const CarCard: React.FC<CarCardProps> = ({ car, index }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    // Navigate to the car details page with the car's data
    navigate(`/car/${index}`, { state: { car } });
  };

  // Extract vehicle type (Saloon, Off-Roader, etc.)
  const vehicleType = car.variant.includes('Saloon') ? 'Saloon' : 
                     car.variant.includes('Off-Roader') ? 'Off-Roader' : 
                     car.variant.includes('GLB') || car.variant.includes('GLA') ? 'Off-Roader' : 'Saloon';
  
  // Extract paint color
  const paintColor = car.paint.includes('Paint') ? car.paint.split('Paint')[1]?.trim() : 'Polar White';

  return (
    <div 
      onClick={handleCardClick}
      style={{ 
        background: "#fff", 
        borderRadius: 0, 
        boxShadow: "0 1px 3px 0 rgba(80,80,80,.1)", 
        overflow: "hidden", 
        display: "flex", 
        flexDirection: "column", 
        height: "100%",
        cursor: "pointer",
        margin: "0",
        padding: "0",
      }}
    >
      {/* Car image */}
      <div style={{ 
        width: "100%", 
        height: 0,
        paddingTop: "56.25%", // 16:9 aspect ratio 
        position: "relative",
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <img 
          src={car.img}
          alt={`${car.variant} - ${car.title}`} 
          style={{ 
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%", 
            height: "100%", 
            objectFit: "contain",
            backgroundColor: "white"
          }}
          loading="lazy"
        />
      </div>
      
      <div style={{ padding: "18px 16px 16px", color: "#232323" }}>
        {/* Title and variant */}
        <div style={{ 
          fontWeight: 600, 
          fontSize: 18, 
          marginBottom: 3,
          color: "#333"
        }}>
          {car.variant}
        </div>
        
        <div style={{ 
          fontSize: 14, 
          color: "#333", 
          marginBottom: 5,
          display: "flex",
          alignItems: "center"
        }}>
          {car.title}
          <span style={{ 
            display: "inline-block", 
            background: "#eef7ff", 
            color: "#0a6ebd", 
            padding: "2px 7px", 
            borderRadius: 4, 
            fontSize: 12, 
            fontWeight: 500,
            marginLeft: 4
          }}>
            {car.availability}
          </span>
        </div>

        {/* Car specifications */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 16px", margin: "14px 0 12px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ display: "inline-flex", marginRight: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V6" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 2V6" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 10H21" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span style={{ fontSize: 14, color: "#555" }}>{car.year}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ display: "inline-flex", marginRight: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.29 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 16C5.67 16 5 15.33 5 14.5C5 13.67 5.67 13 6.5 13C7.33 13 8 13.67 8 14.5C8 15.33 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5C16 13.67 16.67 13 17.5 13C18.33 13 19 13.67 19 14.5C19 15.33 18.33 16 17.5 16ZM5 11L6.5 6.5H17.5L19 11H5Z" fill="#555"/>
              </svg>
            </span>
            <span style={{ fontSize: 14, color: "#555" }}>{vehicleType}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ display: "inline-flex", marginRight: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19Z" fill="#555"/>
                <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="#555"/>
              </svg>
            </span>
            <span style={{ fontSize: 14, color: "#555" }}>
              {paintColor}
            </span>
          </div>
        </div>

        {/* Interior material - new row */}
        {car.interior && (
          <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
            <span style={{ display: "inline-flex", marginRight: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18Z" stroke="#555" strokeWidth="1.5"/>
                <path d="M8 12H16" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 16H12" stroke="#555" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            <span style={{ fontSize: 14, color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {car.interior}
            </span>
          </div>
        )}

        {/* Price information */}
        <div style={{ color: "#0a75c9", fontWeight: 500, fontSize: 14, display: "flex", alignItems: "center" }}>
          AED {car.pricePerMonth}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 5 }}>
            <circle cx="12" cy="12" r="10" stroke="#0a75c9" strokeWidth="1.5"/>
            <path d="M12 7V12" stroke="#0a75c9" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="12" cy="16" r="1" fill="#0a75c9"/>
          </svg>
        </div>
        
        <div style={{ fontWeight: 700, fontSize: 17, color: "#232323", marginTop: 5 }}>{car.price}</div>
      </div>
    </div>
  );
};

export default CarCard; 