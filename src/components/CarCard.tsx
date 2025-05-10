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

  return (
    <div 
      onClick={handleCardClick}
      style={{ 
        background: "#fff", 
        borderRadius: 12, 
        boxShadow: "0 2px 7px 0 rgba(80,80,80,.07)", 
        overflow: "hidden", 
        display: "flex", 
        flexDirection: "column", 
        minHeight: 375,
        cursor: "pointer"
      }}
    >
      <img 
        src={car.img} 
        alt={car.title} 
        style={{ 
          width: "100%", 
          height: 160, 
          objectFit: "cover", 
          background: "#eee" 
        }} 
      />
      <div style={{ padding: "17px 14px 10px 14px", color: "#232323" }}>
        <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{car.title}</div>
        <div style={{ fontSize: 13, color: "#555", margin: "7px 0 2px 0" }}>{car.variant}</div>
        <div style={{ fontSize: 13, color: "#555", marginBottom: 9 }}>{car.paint}</div>
        <div style={{ color: "#0a75c9", fontWeight: 500, fontSize: 14 }}>{car.pricePerMonth}</div>
        <div style={{ fontWeight: 700, fontSize: 17, color: "#232323", marginTop: 7 }}>{car.price}</div>
      </div>
    </div>
  );
};

export default CarCard; 