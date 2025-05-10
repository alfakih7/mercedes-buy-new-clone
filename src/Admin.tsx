import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import gargashLogo from './gragsh-logo.png';
import sixtLogo from './sixt logo.png';
import gacLogo from './Gac motors.png';
import alfaRomeoLogo from './alfa Romero.png';

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Placeholder stats for the dashboard
  const stats = [
    { label: "Cars Sold", value: 24 },
    { label: "Total Leads", value: 120 },
    { label: "Conversion Rate", value: "20%" },
  ];

  // Brand logos for the footer
  const brands = [
    { name: "Mercedes-Benz", logo: "https://ext.same-assets.com/1815046438/2150039358.svg" },
    { name: "Alfa Romeo", logo: alfaRomeoLogo },
    { name: "GAC Motor", logo: gacLogo },
    { name: "Sixt Rent a Car", logo: sixtLogo },
    { name: "Sixt Leasing", logo: sixtLogo },
    { name: "Purple by Gargash", logo: "https://i.ibb.co/nzNJ9wd/purple-by-gargash.png" }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // No real authentication, just a demo
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center", 
        background: "linear-gradient(135deg, #372163 0%, #4a2b8a 100%)",
        padding: "20px"
      }}>
        {/* Logo header */}
        <div style={{ marginBottom: 40 }}>
          <img 
            src={gargashLogo}
            alt="Gargash Logo" 
            style={{ height: 80 }}
          />
        </div>
        
        <form 
          onSubmit={handleLogin} 
          style={{ 
            background: "rgba(255,255,255,0.95)", 
            padding: 40, 
            borderRadius: 12, 
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)", 
            minWidth: 380,
            maxWidth: 450,
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #372163 0%, #b8a039 100%)"
          }}></div>
          
          <h2 style={{ 
            textAlign: "center", 
            marginBottom: 30, 
            color: "#372163", 
            fontSize: 28,
            fontWeight: 600
          }}>
            Admin Portal
          </h2>
          
          <p style={{ 
            textAlign: "center", 
            marginBottom: 30, 
            color: "#666", 
            fontSize: 15 
          }}>
            Sign in to access the customer value management dashboard
          </p>
          
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", marginBottom: 8, color: "#333", fontSize: 14, fontWeight: 500 }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{ 
                width: "100%", 
                padding: "12px 16px", 
                borderRadius: 8, 
                border: "1px solid #ddd",
                fontSize: 15,
                outline: "none",
                transition: "border 0.2s",
                boxSizing: "border-box"
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: 30 }}>
            <label style={{ display: "block", marginBottom: 8, color: "#333", fontSize: 14, fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ 
                width: "100%", 
                padding: "12px 16px", 
                borderRadius: 8, 
                border: "1px solid #ddd",
                fontSize: 15,
                outline: "none",
                transition: "border 0.2s",
                boxSizing: "border-box"
              }}
              required
            />
          </div>
          
          <button
            type="submit"
            style={{ 
              width: "100%", 
              padding: "14px 10px", 
              borderRadius: 8, 
              background: "#372163", 
              color: "#fff", 
              border: "none", 
              fontWeight: 600, 
              fontSize: 16, 
              cursor: "pointer",
              transition: "background 0.2s ease",
              boxShadow: "0 4px 10px rgba(55, 33, 99, 0.3)"
            }}
          >
            Login
          </button>
        </form>
        
        {/* Brands Section */}
        <div style={{ marginTop: 60, textAlign: "center" }}>
          <h3 style={{ color: "#fff", marginBottom: 20, fontWeight: 400, fontSize: 16 }}>
            Proud Distributor of Premium Brands
          </h3>
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            flexWrap: "wrap", 
            gap: 30,
            maxWidth: 800
          }}>
            {/* Mercedes */}
            <div style={{ background: "#fff", padding: "10px 15px", borderRadius: 8, width: 130, height: 70, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="https://ext.same-assets.com/1815046438/2150039358.svg" alt="Mercedes-Benz" style={{ height: 45 }} />
            </div>
            
            {/* Alfa Romeo */}
            <div style={{ background: "#fff", padding: "10px 15px", borderRadius: 8, width: 130, height: 70, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={alfaRomeoLogo} alt="Alfa Romeo" style={{ height: 45 }} />
            </div>
            
            {/* GAC */}
            <div style={{ background: "#fff", padding: "10px 15px", borderRadius: 8, width: 130, height: 70, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={gacLogo} alt="GAC Motor" style={{ height: 35 }} />
            </div>
            
            {/* Sixt */}
            <div style={{ background: "#fff", padding: "10px 15px", borderRadius: 8, width: 130, height: 70, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={sixtLogo} alt="Sixt" style={{ height: 25 }} />
            </div>
            
            {/* Purple */}
            <div style={{ background: "#fff", padding: "10px 15px", borderRadius: 8, width: 130, height: 70, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="https://i.ibb.co/nzNJ9wd/purple-by-gargash.png" alt="Purple" style={{ height: 45 }} />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div style={{ marginTop: 40, color: "rgba(255,255,255,0.7)", fontSize: 13, textAlign: "center" }}>
          © Gargash Enterprises LLC {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    );
  }

  // Admin dashboard after login
  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", padding: "0" }}>
      {/* Header */}
      <header style={{ 
        background: "#372163", 
        padding: "16px 24px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1200,
          margin: "0 auto"
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img 
              src={gargashLogo} 
              alt="Gargash" 
              style={{ height: 40 }}
            />
            <span style={{ 
              marginLeft: 20, 
              color: "#fff", 
              fontSize: 18, 
              fontWeight: 500,
              borderLeft: "1px solid rgba(255,255,255,0.3)",
              paddingLeft: 20
            }}>
              Admin Dashboard
            </span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 8, 
              color: "rgba(255,255,255,0.8)",
              fontSize: 14
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Last updated: Today, 10:45 AM
            </div>
            <button 
              onClick={() => setLoggedIn(false)}
              style={{ 
                padding: "8px 16px", 
                background: "rgba(255,255,255,0.15)", 
                border: "1px solid rgba(255,255,255,0.3)", 
                borderRadius: 6, 
                cursor: "pointer",
                color: "#fff",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 8
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <div style={{ 
        maxWidth: 1200, 
        margin: "24px auto", 
        padding: "0 24px"
      }}>
        <h1 style={{ 
          fontSize: 28, 
          color: "#333", 
          marginBottom: 24, 
          fontWeight: 600 
        }}>
          <span style={{ color: "#372163" }}>CVM</span> Dashboard
        </h1>
        
        {/* Enhanced Stats Section with mini charts */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: 24,
          marginBottom: 30
        }}>
          {/* Cars Sold Card */}
          <div style={{ 
            background: "#fff", 
            borderRadius: 12, 
            padding: 24, 
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: "linear-gradient(90deg, #372163 0%, #b8a039 100%)"
            }}></div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 15 }}>
              <div>
                <div style={{ fontSize: 40, fontWeight: 700, color: "#372163", marginBottom: 5 }}>24</div>
                <div style={{ color: "#666", fontSize: 16 }}>Cars Sold</div>
              </div>
              <div style={{ 
                background: "#e6f7ee", 
                color: "#1eb980", 
                padding: "4px 10px", 
                borderRadius: 20, 
                fontSize: 13, 
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                12%
              </div>
            </div>
            
            {/* Mini Line Chart */}
            <div style={{ height: 60 }}>
              <svg width="100%" height="100%" viewBox="0 0 300 60" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#372163" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,50 L30,45 L60,48 L90,40 L120,42 L150,38 L180,30 L210,25 L240,20 L270,15 L300,10" 
                      fill="none" stroke="#372163" strokeWidth="2" />
                <path d="M0,50 L30,45 L60,48 L90,40 L120,42 L150,38 L180,30 L210,25 L240,20 L270,15 L300,10 L300,60 L0,60 Z" 
                      fill="url(#gradient1)" />
              </svg>
            </div>
            
            <div style={{ fontSize: 13, color: "#888", textAlign: "center", marginTop: 5 }}>
              Last 30 days
            </div>
          </div>
          
          {/* Total Leads Card */}
          <div style={{ 
            background: "#fff", 
            borderRadius: 12, 
            padding: 24, 
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: "linear-gradient(90deg, #372163 0%, #b8a039 100%)"
            }}></div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 15 }}>
              <div>
                <div style={{ fontSize: 40, fontWeight: 700, color: "#372163", marginBottom: 5 }}>120</div>
                <div style={{ color: "#666", fontSize: 16 }}>Total Leads</div>
              </div>
              <div style={{ 
                background: "#e6f7ee", 
                color: "#1eb980", 
                padding: "4px 10px", 
                borderRadius: 20, 
                fontSize: 13, 
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                18%
              </div>
            </div>
            
            {/* Bar Chart */}
            <div style={{ height: 60, display: "flex", alignItems: "flex-end", gap: 5, padding: "0 10px" }}>
              {[35, 45, 30, 50, 40, 60, 55, 45, 70, 65, 75, 80].map((height, i) => (
                <div key={i} style={{ 
                  height: `${height}%`, 
                  flex: 1, 
                  background: i === 11 ? "#372163" : "rgba(55, 33, 99, 0.15)",
                  borderRadius: "3px 3px 0 0"
                }}></div>
              ))}
            </div>
            
            <div style={{ fontSize: 13, color: "#888", textAlign: "center", marginTop: 5 }}>
              Month by month growth
            </div>
          </div>
          
          {/* Conversion Rate Card */}
          <div style={{ 
            background: "#fff", 
            borderRadius: 12, 
            padding: 24, 
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: "linear-gradient(90deg, #372163 0%, #b8a039 100%)"
            }}></div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 15 }}>
              <div>
                <div style={{ fontSize: 40, fontWeight: 700, color: "#372163", marginBottom: 5 }}>20%</div>
                <div style={{ color: "#666", fontSize: 16 }}>Conversion Rate</div>
              </div>
              <div style={{ 
                background: "#ffebee", 
                color: "#f44336", 
                padding: "4px 10px", 
                borderRadius: 20, 
                fontSize: 13, 
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 4
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                  <polyline points="17 18 23 18 23 12"></polyline>
                </svg>
                5%
              </div>
            </div>
            
            {/* Donut Chart */}
            <div style={{ height: 60, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ 
                width: 60, 
                height: 60, 
                borderRadius: "50%", 
                background: "conic-gradient(#372163 0% 20%, #f0f0f0 20% 100%)",
                position: "relative"
              }}>
                <div style={{ 
                  position: "absolute", 
                  top: "50%", 
                  left: "50%", 
                  transform: "translate(-50%, -50%)", 
                  width: 40, 
                  height: 40, 
                  borderRadius: "50%", 
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#372163"
                }}>
                  20%
                </div>
              </div>
              
              <div style={{ width: 100, marginLeft: 20, fontSize: 12, color: "#666" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#372163", marginRight: 5 }}></div>
                  <span>Converted</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f0f0f0", marginRight: 5 }}></div>
                  <span>Potential</span>
                </div>
              </div>
            </div>
            
            <div style={{ fontSize: 13, color: "#888", textAlign: "center", marginTop: 5 }}>
              Current quarter
            </div>
          </div>
        </div>
        
        {/* Main Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginBottom: 30 }}>
          {/* Performance by Vehicle Type */}
          <div style={{ 
            background: "#fff", 
            borderRadius: 12, 
            padding: 24, 
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Performance by Vehicle Type</h2>
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#666" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#372163" }}></div>
                  <span>Sedan</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#666" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#b8a039" }}></div>
                  <span>SUV</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#666" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#7e57c2" }}></div>
                  <span>Sports</span>
                </div>
              </div>
            </div>
            
            {/* Bar Chart */}
            <div style={{ 
              height: 250, 
              position: "relative", 
              paddingLeft: 40,
              paddingBottom: 30
            }}>
              {/* Y-axis labels */}
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 30, width: 40, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#999", transform: "translateY(-50%)" }}>100</span>
                <span style={{ fontSize: 12, color: "#999", transform: "translateY(-50%)" }}>80</span>
                <span style={{ fontSize: 12, color: "#999", transform: "translateY(-50%)" }}>60</span>
                <span style={{ fontSize: 12, color: "#999", transform: "translateY(-50%)" }}>40</span>
                <span style={{ fontSize: 12, color: "#999", transform: "translateY(-50%)" }}>20</span>
                <span style={{ fontSize: 12, color: "#999", transform: "translateY(-50%)" }}>0</span>
              </div>
              
              {/* Horizontal grid lines */}
              <div style={{ position: "absolute", left: 40, right: 0, top: 0, bottom: 30, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <div key={i} style={{ width: "100%", height: 1, background: i === 5 ? "#ddd" : "#f0f0f0" }}></div>
                ))}
              </div>
              
              {/* X-axis */}
              <div style={{ position: "absolute", left: 40, right: 0, bottom: 0, height: 30, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(month => (
                  <span key={month} style={{ fontSize: 12, color: "#999" }}>{month}</span>
                ))}
              </div>
              
              {/* Bars */}
              <div style={{ height: "100%", display: "flex", justifyContent: "space-around", alignItems: "flex-end" }}>
                {/* January */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                  <div style={{ width: 20, height: "60%", background: "#372163", borderRadius: "4px 4px 0 0" }}></div>
                  <div style={{ width: 20, height: "40%", background: "#b8a039", borderRadius: "4px 4px 0 0" }}></div>
                  <div style={{ width: 20, height: "20%", background: "#7e57c2", borderRadius: "4px 4px 0 0" }}></div>
                </div>
                
                {/* February */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                  <div style={{ width: 20, height: "70%", background: "#372163", borderRadius: "4px 4px 0 0" }}></div>
                  <div style={{ width: 20, height: "50%", background: "#b8a039", borderRadius: "4px 4px 0 0" }}></div>
                  <div style={{ width: 20, height: "25%", background: "#7e57c2", borderRadius: "4px 4px 0 0" }}></div>
                </div>
                
                {/* March */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                  <div style={{ width: 20, height: "65%", background: "#372163", borderRadius: "4px 4px 0 0" }}></div>
                  <div style={{ width: 20, height: "55%", background: "#b8a039", borderRadius: "4px 4px 0 0" }}></div>
                  <div style={{ width: 20, height: "30%", background: "#7e57c2", borderRadius: "4px 4px 0 0" }}></div>
                </div>
                
                {/* April */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                  <div style={{ width: 20, height: "80%", background: "#372163", borderRadius: "4px 4px 0 0" }}></div>
                  <div style={{ width: 20, height: "60%", background: "#b8a039", borderRadius: "4px 4px 0 0" }}></div>
                  <div style={{ width: 20, height: "40%", background: "#7e57c2", borderRadius: "4px 4px 0 0" }}></div>
                </div>
                
                {/* May */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                  <div style={{ width: 20, height: "75%", background: "#372163", borderRadius: "4px 4px 0 0" }}></div>
                  <div style={{ width: 20, height: "65%", background: "#b8a039", borderRadius: "4px 4px 0 0" }}></div>
                  <div style={{ width: 20, height: "45%", background: "#7e57c2", borderRadius: "4px 4px 0 0" }}></div>
                </div>
                
                {/* June */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
                  <div style={{ width: 20, height: "90%", background: "#372163", borderRadius: "4px 4px 0 0" }}></div>
                  <div style={{ width: 20, height: "70%", background: "#b8a039", borderRadius: "4px 4px 0 0" }}></div>
                  <div style={{ width: 20, height: "50%", background: "#7e57c2", borderRadius: "4px 4px 0 0" }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Brand Distribution */}
          <div style={{ 
            background: "#fff", 
            borderRadius: 12, 
            padding: 24, 
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
          }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Brand Distribution</h2>
            
            {/* Pie Chart */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ 
                position: "relative", 
                width: 180, 
                height: 180, 
                borderRadius: "50%", 
                background: "conic-gradient(#372163 0% 45%, #b8a039 45% 70%, #7e57c2 70% 85%, #e0e0e0 85% 100%)",
                marginBottom: 20
              }}>
                <div style={{ 
                  position: "absolute", 
                  top: "50%", 
                  left: "50%", 
                  transform: "translate(-50%, -50%)", 
                  width: 70, 
                  height: 70, 
                  borderRadius: "50%", 
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column"
                }}>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>180</div>
                  <div style={{ fontSize: 12, color: "#666" }}>Total</div>
                </div>
              </div>
              
              <div style={{ width: "100%" }}>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  marginBottom: 12, 
                  padding: "8px 0", 
                  borderBottom: "1px solid #f0f0f0" 
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#372163" }}></div>
                    <span style={{ fontSize: 14 }}>Mercedes</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>45%</div>
                </div>
                
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  marginBottom: 12, 
                  padding: "8px 0", 
                  borderBottom: "1px solid #f0f0f0" 
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#b8a039" }}></div>
                    <span style={{ fontSize: 14 }}>Alfa Romeo</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>25%</div>
                </div>
                
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  marginBottom: 12, 
                  padding: "8px 0", 
                  borderBottom: "1px solid #f0f0f0" 
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#7e57c2" }}></div>
                    <span style={{ fontSize: 14 }}>GAC</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>15%</div>
                </div>
                
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  padding: "8px 0"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#e0e0e0" }}></div>
                    <span style={{ fontSize: 14 }}>Other</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>15%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* User List Section */}
        <div style={{ marginBottom: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, color: "#333", fontWeight: 600 }}>Active Customers</h2>
            <div style={{ display: "flex", gap: 12 }}>
              <button style={{ 
                padding: "8px 16px", 
                borderRadius: 8, 
                background: "rgba(55, 33, 99, 0.05)", 
                border: "none",
                color: "#372163",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="10" x2="6" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="18" y1="18" x2="6" y2="18"></line>
                </svg>
                Filter
              </button>
              <button style={{ 
                padding: "8px 16px", 
                borderRadius: 8, 
                background: "#372163", 
                border: "none",
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Customer
              </button>
            </div>
          </div>
          
          <div style={{ 
            background: "#fff", 
            borderRadius: 12, 
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            overflow: "hidden"
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9f9f9" }}>
                  <th style={{ padding: "16px", textAlign: "left", color: "#666", fontWeight: 600, fontSize: 14 }}>Customer</th>
                  <th style={{ padding: "16px", textAlign: "left", color: "#666", fontWeight: 600, fontSize: 14 }}>Contact</th>
                  <th style={{ padding: "16px", textAlign: "left", color: "#666", fontWeight: 600, fontSize: 14 }}>Interest</th>
                  <th style={{ padding: "16px", textAlign: "left", color: "#666", fontWeight: 600, fontSize: 14 }}>Status</th>
                  <th style={{ padding: "16px", textAlign: "left", color: "#666", fontWeight: 600, fontSize: 14 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Customer 1 */}
                <tr 
                  style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} 
                  onClick={() => navigate('/user/AM001')}
                >
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: "50%", 
                        background: "#e6e1f2", 
                        color: "#372163",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        fontSize: 16
                      }}>
                        AM
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>Ahmed Al Mansouri</div>
                        <div style={{ fontSize: 13, color: "#888" }}>Last interaction: 2 days ago</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div>ahmed.almansouri@gmail.com</div>
                    <div style={{ fontSize: 13, color: "#888" }}>+971 55 123 4567</div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ fontWeight: 500 }}>Mercedes-Benz S-Class</div>
                    <div style={{ fontSize: 13, color: "#888" }}>Budget: 400-500K AED</div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ 
                      display: "inline-block",
                      padding: "6px 12px",
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 500,
                      background: "#e6f7ee",
                      color: "#1eb980"
                    }}>
                      Test Drive Scheduled
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ 
                        padding: "8px", 
                        borderRadius: 8, 
                        background: "rgba(55, 33, 99, 0.05)", 
                        border: "none",
                        color: "#372163",
                        cursor: "pointer" 
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button style={{ 
                        padding: "8px", 
                        borderRadius: 8, 
                        background: "rgba(55, 33, 99, 0.05)", 
                        border: "none",
                        color: "#372163",
                        cursor: "pointer" 
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Customer 2 */}
                <tr style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onClick={() => navigate('/user/LK001')}>
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: "50%", 
                        background: "#e6e1f2", 
                        color: "#372163",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        fontSize: 16
                      }}>
                        LK
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>Layla Khan</div>
                        <div style={{ fontSize: 13, color: "#888" }}>Last interaction: Today</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div>layla.k@company.ae</div>
                    <div style={{ fontSize: 13, color: "#888" }}>+971 50 987 6543</div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ fontWeight: 500 }}>Alfa Romeo Giulia</div>
                    <div style={{ fontSize: 13, color: "#888" }}>Budget: 200-250K AED</div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ 
                      display: "inline-block",
                      padding: "6px 12px",
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 500,
                      background: "#fff8e1",
                      color: "#ffa000"
                    }}>
                      Negotiation
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ 
                        padding: "8px", 
                        borderRadius: 8, 
                        background: "rgba(55, 33, 99, 0.05)", 
                        border: "none",
                        color: "#372163",
                        cursor: "pointer" 
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button style={{ 
                        padding: "8px", 
                        borderRadius: 8, 
                        background: "rgba(55, 33, 99, 0.05)", 
                        border: "none",
                        color: "#372163",
                        cursor: "pointer" 
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Customer 3 */}
                <tr style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onClick={() => navigate('/user/RP001')}>
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: "50%", 
                        background: "#e6e1f2", 
                        color: "#372163",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        fontSize: 16
                      }}>
                        RP
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>Raj Patel</div>
                        <div style={{ fontSize: 13, color: "#888" }}>Last interaction: 5 days ago</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div>raj.p@outlook.com</div>
                    <div style={{ fontSize: 13, color: "#888" }}>+971 54 567 8901</div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ fontWeight: 500 }}>GAC GS8</div>
                    <div style={{ fontSize: 13, color: "#888" }}>Budget: 150-180K AED</div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ 
                      display: "inline-block",
                      padding: "6px 12px",
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 500,
                      background: "#e8eaf6",
                      color: "#3f51b5"
                    }}>
                      Initial Contact
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ 
                        padding: "8px", 
                        borderRadius: 8, 
                        background: "rgba(55, 33, 99, 0.05)", 
                        border: "none",
                        color: "#372163",
                        cursor: "pointer" 
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button style={{ 
                        padding: "8px", 
                        borderRadius: 8, 
                        background: "rgba(55, 33, 99, 0.05)", 
                        border: "none",
                        color: "#372163",
                        cursor: "pointer" 
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Customer 4 */}
                <tr style={{ borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onClick={() => navigate('/user/MF001')}>
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ 
                        width: 40, 
                        height: 40, 
                        borderRadius: "50%", 
                        background: "#e6e1f2", 
                        color: "#372163",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        fontSize: 16
                      }}>
                        MF
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>Mohammed Al Farsi</div>
                        <div style={{ fontSize: 13, color: "#888" }}>Last interaction: 3 days ago</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div>m.alfarsi@etisalat.ae</div>
                    <div style={{ fontSize: 13, color: "#888" }}>+971 56 789 0123</div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ fontWeight: 500 }}>Multiple Models</div>
                    <div style={{ fontSize: 13, color: "#888" }}>Budget: 350-450K AED</div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ 
                      display: "inline-block",
                      padding: "6px 12px",
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 500,
                      background: "#fce4ec",
                      color: "#e91e63"
                    }}>
                      Follow Up Required
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{ 
                        padding: "8px", 
                        borderRadius: 8, 
                        background: "rgba(55, 33, 99, 0.05)", 
                        border: "none",
                        color: "#372163",
                        cursor: "pointer" 
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button style={{ 
                        padding: "8px", 
                        borderRadius: 8, 
                        background: "rgba(55, 33, 99, 0.05)", 
                        border: "none",
                        color: "#372163",
                        cursor: "pointer" 
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Recent Conversations Section */}
        <div style={{ marginBottom: 30 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, color: "#333", fontWeight: 600 }}>Recent Customer Interactions</h2>
            <button style={{ 
              padding: "8px 16px", 
              borderRadius: 8, 
              background: "#fff", 
              border: "1px solid #eee",
              color: "#372163",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer"
            }}>
              View All
            </button>
          </div>
          
          <div style={{ 
            background: "#fff", 
            borderRadius: 12, 
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            overflow: "hidden"
          }}>
            <div style={{ 
              padding: 20, 
              borderBottom: "1px solid #f0f0f0" 
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ 
                    width: 36, 
                    height: 36, 
                    borderRadius: "50%", 
                    background: "#e6e1f2", 
                    color: "#372163",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    fontSize: 16
                  }}>
                    JD
                  </div>
                  <strong>John Doe</strong>
                </div>
                <span style={{ color: "#888", fontSize: 14 }}>Today, 2:30 PM</span>
              </div>
              <p style={{ margin: "8px 0", color: "#444", lineHeight: 1.6 }}>
                Interested in Mercedes A-Class but concerned about price point. Looking for premium features but within a lower budget.
              </p>
              <div style={{ 
                fontSize: 14, 
                color: "#fff", 
                background: "#372163", 
                display: "inline-block", 
                padding: "4px 12px", 
                borderRadius: 20,
                marginTop: 4
              }}>
                Potential for GAC alternative model
              </div>
            </div>
            
            <div style={{ 
              padding: 20, 
              borderBottom: "1px solid #f0f0f0" 
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ 
                    width: 36, 
                    height: 36, 
                    borderRadius: "50%", 
                    background: "#e6e1f2", 
                    color: "#372163",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    fontSize: 16
                  }}>
                    SS
                  </div>
                  <strong>Sarah Smith</strong>
                </div>
                <span style={{ color: "#888", fontSize: 14 }}>Yesterday, 11:15 AM</span>
              </div>
              <p style={{ margin: "8px 0", color: "#444", lineHeight: 1.6 }}>
                Looking for SUV with good fuel economy. Discussed Mercedes GLA but was also interested in more environmentally friendly options.
              </p>
              <div style={{ 
                fontSize: 14, 
                color: "#fff", 
                background: "#b8a039", 
                display: "inline-block", 
                padding: "4px 12px", 
                borderRadius: 20,
                marginTop: 4
              }}>
                High interest - Test drive scheduled
              </div>
            </div>
          </div>
        </div>
        
        {/* CVM Insights Section */}
        <div>
          <h2 style={{ fontSize: 20, color: "#333", marginBottom: 16, fontWeight: 600 }}>CVM Insights</h2>
          <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24
          }}>
            <div style={{ 
              background: "#fff", 
              padding: 24, 
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
            }}>
              <h3 style={{ fontSize: 16, color: "#372163", marginBottom: 16, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Top Customer Objections
              </h3>
              <ul style={{ margin: "0", paddingLeft: 0, listStyleType: "none" }}>
                <li style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between" }}>
                  <span>Price range higher than expected</span>
                  <span style={{ fontWeight: 600, color: "#372163" }}>42%</span>
                </li>
                <li style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between" }}>
                  <span>Financing terms too restrictive</span>
                  <span style={{ fontWeight: 600, color: "#372163" }}>28%</span>
                </li>
                <li style={{ padding: "10px 0", display: "flex", justifyContent: "space-between" }}>
                  <span>Preferred color not available</span>
                  <span style={{ fontWeight: 600, color: "#372163" }}>15%</span>
                </li>
              </ul>
            </div>
            
            <div style={{ 
              background: "#fff", 
              padding: 24, 
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)"
            }}>
              <h3 style={{ fontSize: 16, color: "#b8a039", marginBottom: 16, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
                Cross-Sell Opportunities
              </h3>
              <ul style={{ margin: "0", paddingLeft: 0, listStyleType: "none" }}>
                <li style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between" }}>
                  <span>Customers interested in service packages</span>
                  <span style={{ fontWeight: 600, color: "#b8a039" }}>18</span>
                </li>
                <li style={{ padding: "10px 0", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between" }}>
                  <span>Potential leads for GAC from Mercedes inquiries</span>
                  <span style={{ fontWeight: 600, color: "#b8a039" }}>12</span>
                </li>
                <li style={{ padding: "10px 0", display: "flex", justifyContent: "space-between" }}>
                  <span>Customers asked about leasing options</span>
                  <span style={{ fontWeight: 600, color: "#b8a039" }}>8</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 