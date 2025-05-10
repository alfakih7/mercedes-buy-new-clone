import React from "react";
import CarCard, { Car } from "../components/CarCard";

// Updated car data based on actual Mercedes-Benz listings
const CARS: Car[] = [
  {
    img: "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCMFNKNDk3MDUxXzQ5NzA1MV8xLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzQ2MjU4NzE5IiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxOTA5LCJoZWlnaHQiOjEwNzQsImZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfX19fQ==",
    title: "Mercedes-Benz A-Class",
    link: "#",
    variant: "A 200 Saloon",
    paint: "Solid Paint Night Black",
    pricePerMonth: "3,543.67 / month Finance",
    price: "AED 238,899",
    availability: "Available",
    year: "2025",
    interior: "Leather, Two-Tone Red Pepper / Black"
  },
  {
    img: "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCOFNKNDk4NjA5XzQ5ODYwOV8xLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzQ2MTcyMjA1IiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxOTA5LCJoZWlnaHQiOjEwNzQsImZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfX19fQ==",
    title: "Mercedes-Benz A-Class",
    link: "#",
    variant: "A 200 Saloon",
    paint: "Solid Paint Polar White",
    pricePerMonth: "3,558.52 / month Finance",
    price: "AED 239,900",
    availability: "Available",
    year: "2025",
    interior: "Leather, Two-Tone Red Pepper / Black"
  },
  {
    img: "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCN1NKNDk1NDYwXzQ5NTQ2MF8xLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzM5ODY3OTA1IiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxOTA5LCJoZWlnaHQiOjEwNzQsImZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfX19fQ==",
    title: "Mercedes-Benz A-Class",
    link: "#",
    variant: "A 200 Saloon",
    paint: "Solid Paint Night Black",
    pricePerMonth: "3,617.84 / month Finance",
    price: "AED 243,899",
    availability: "Available",
    year: "2025",
    interior: "Leather, Two-Tone Red Pepper / Black"
  },
  {
    img: "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCN1NKNDk1MTY2XzQ5NTE2Nl8xLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzM5ODY3OTAzIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxOTA5LCJoZWlnaHQiOjEwNzQsImZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfX19fQ==",
    title: "Mercedes-Benz A-Class",
    link: "#",
    variant: "A 200 Saloon",
    paint: "Solid Paint Polar White",
    pricePerMonth: "3,632.68 / month Finance",
    price: "AED 244,900",
    availability: "Available",
    year: "2025",
    interior: "Leather, Two-Tone Red Pepper / Black"
  },
  {
    img: "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxTjROOEhCN1NKNzMxNDExXzczMTQxMV8xLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzM5ODY3OTQ0IiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxOTA5LCJoZWlnaHQiOjEwNzQsImZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfX19fQ==",
    title: "Mercedes-Benz GLA",
    link: "#",
    variant: "GLA 200",
    paint: "Solid Paint Night Black",
    pricePerMonth: "4,003.50 / month Finance",
    price: "AED 269,899",
    availability: "Available",
    year: "2025",
    interior: "Leather, Two-Tone Red Pepper / Black"
  },
  {
    img: "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxTjI0NzY4NzFXNDE3MjI4XzQxNzIyOF8xLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzQ1MDQ4ODgxIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxOTA5LCJoZWlnaHQiOjEwNzQsImZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfX19fQ==",
    title: "Mercedes-Benz GLB",
    link: "#",
    variant: "GLB 200",
    paint: "Solid Paint Polar White",
    pricePerMonth: "4,003.50 / month Finance",
    price: "AED 269,899",
    availability: "Available",
    year: "2025",
    interior: "Artico Man-Made Leather / Dinamica Microfibre Black"
  },
];

// Filter component for the sidebar
const FilterOption: React.FC<{ title: string, showIcon?: boolean }> = ({ title, showIcon = true }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "8px 0",
        borderBottom: "1px solid #eee",
        marginBottom: 10
      }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: "#333" }}>{title}</span>
        {showIcon && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9L12 16L5 9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <main style={{ flex: 1, width: "100%", background: "#f8f9fa", marginTop: 0, position: "relative" }}>
      <div style={{ 
        width: "100%", 
        display: "flex", 
        margin: "0 auto", 
        padding: "0"
      }}>
        {/* Sidebar Filters */}
        <div style={{ 
          width: "250px", 
          minWidth: "250px",
          background: "#fff", 
          padding: "25px 20px", 
          borderRight: "1px solid #eee",
          minHeight: "calc(100vh - 72px)"
        }}>
          <div style={{ 
            fontSize: 22, 
            fontWeight: 500, 
            marginBottom: 20, 
            color: "#333",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center" 
          }}>
            Search
            <button style={{ 
              border: "none", 
              background: "none", 
              color: "#0a75c9", 
              fontSize: 14, 
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: 0
            }}>
              Clear Search
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 5 }}>
                <path d="M18 6L6 18" stroke="#0a75c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="#0a75c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <FilterOption title="Model" />
          <FilterOption title="Trim" />
          
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            border: "1px solid #ddd", 
            borderRadius: 4, 
            padding: "8px 12px", 
            marginBottom: 20 
          }}>
            <input 
              type="text" 
              placeholder="Keyword Search" 
              style={{ 
                border: "none", 
                outline: "none", 
                width: "100%",
                fontSize: 14
              }} 
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <FilterOption title="Fuel Type" />
          <FilterOption title="Budget" />
          <FilterOption title="Colours" />
          <FilterOption title="Body Styles" />
          <FilterOption title="Features" />
          
          <button style={{ 
            width: "100%", 
            background: "#0a75c9", 
            color: "#fff", 
            border: "none", 
            padding: "12px 0", 
            borderRadius: 4, 
            fontSize: 15, 
            fontWeight: 500, 
            cursor: "pointer",
            marginTop: 20
          }}>
            More options
          </button>
        </div>
        
        {/* Main content */}
        <div style={{ flex: 1, padding: "24px 30px 24px 30px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
            <h1 style={{ fontSize: 24, fontWeight: 600, color: "#333", letterSpacing: 0.3, margin: 0 }}>164 vehicles available</h1>
            <div style={{ 
              background: "#fff", 
              borderRadius: 4, 
              padding: "10px 16px", 
              fontSize: 15, 
              color: "#0a75c9", 
              display: "flex", 
              alignItems: "center", 
              border: "1px solid #e8e8e8", 
              cursor: "pointer" 
            }}>
              Lowest Price First
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 8 }}>
                <path d="M6 9L12 15L18 9" stroke="#0a75c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {/* Cars grid with adjusted spacing and layout */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: "20px",
            maxWidth: "100%"
          }}>
            {CARS.map((car, idx) => (
              <CarCard key={idx} car={car} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage; 