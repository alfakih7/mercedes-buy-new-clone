import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gargashLogo from './gragsh-logo.png';
import sixtLogo from './sixt logo.png';
import gacLogo from './Gac motors.png';
import alfaRomeoLogo from './alfa Romero.png';

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [animationsReady, setAnimationsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      const timer = setTimeout(() => {
        setAnimationsReady(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setAnimationsReady(false);
    }
  }, [loggedIn]);

  const lightThemeColors = {
    background: "#F0F2F5", 
    cardBackground: "#FFFFFF", 
    cardBackgroundLighter: "#F9F9F9", 
    textPrimary: "#1A1A1A", 
    textSecondary: "#555555", 
    accentPurple: "#6A1B9A", 
    accentGold: "#FFA000", 
    accentCyan: "#00796B", 
    positive: "#1E8E3E", 
    negative: "#D32F2F", 
    inputBackground: "#E9ECEF", 
    borderColor: "#DDE2E5", 
    white: "#FFFFFF",
    black: "#000000",
    headerGradient: "linear-gradient(90deg, #6A1B9A 0%, #00796B 100%)", 
    logoFilter: 'none', 
    statIconColor: "#1A1A1A",
    tableHeaderBg: "#F5F5F5",
  };

  const themeColors = lightThemeColors;

  const stats = [
    { label: "Cars Sold", value: 24 },
    { label: "Total Leads", value: 120 },
    { label: "Conversion Rate", value: "20%" },
    { label: "Loyalty Points", value: "30,250" },
  ];

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
    setLoggedIn(true);
  };

  if (!loggedIn) {
    // Mercedes-Benz SVG Icon (simplified for animation)
    const MercedesLogo = ({ style }: { style: React.CSSProperties }) => (
      <svg style={style} viewBox="0 0 100 100" fill="rgba(0, 0, 0, 0.05)" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 0C22.386 0 0 22.386 0 50s22.386 50 50 50 50-22.386 50-50S77.614 0 50 0zm0 90C27.944 90 10 72.056 10 50S27.944 10 50 10s40 17.944 40 40-17.944 40-40 40z"/>
        <path d="M50 15l25.98 45H24.02L50 15zm0 9l-15.588 27h31.176L50 24zM50 67.5c-9.665 0-17.5-7.835-17.5-17.5S40.335 32.5 50 32.5s17.5 7.835 17.5 17.5S59.665 67.5 50 67.5zm0-25c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5 7.5-3.358 7.5-7.5-3.358-7.5-7.5-7.5z"/>
      </svg>
    );

    const numLogos = 15; // Number of logos for the background animation

    return (
      <>
        <style>
          {`
            @keyframes moveLogos {
              0% {
                transform: translate(var(--start-x), var(--start-y)) scale(var(--scale));
                opacity: 0;
              }
              20% {
                opacity: var(--max-opacity);
              }
              80% {
                opacity: var(--max-opacity);
              }
              100% {
                transform: translate(var(--end-x), var(--end-y)) scale(var(--scale));
                opacity: 0;
              }
            }
            @keyframes shimmer {
              0% { background-position: -1000px 0; }
              100% { background-position: 1000px 0; }
            }
            .card-hover-effect {
              transition: transform 0.5s cubic-bezier(0.15, 0.9, 0.3, 1), box-shadow 0.5s cubic-bezier(0.15, 0.9, 0.3, 1);
              transform-style: preserve-3d;
            }
            .card-hover-effect:hover {
              transform: translateY(-12px) rotateX(10deg) rotateY(-5deg) scale(1.04);
              box-shadow: 0 28px 65px rgba(0,0,0,0.15), 0 0 15px rgba(106, 27, 154, 0.2); /* Added a subtle accent glow */
            }
            .interactive-title-hover {
              transition: color 0.3s ease, text-shadow 0.4s ease;
            }
            .interactive-title-hover:hover {
              text-shadow: 0 0 8px rgba(0,0,0,0.15);
            }
          `}
        </style>
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center", 
          background: "linear-gradient(135deg, #FFFFFF 0%, #F0F2F5 100%)",
          padding: "20px",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          position: "relative", // Needed for absolute positioning of logos
          overflow: "hidden" // Hide parts of logos that move outside
        }}>
          {/* Animated Background Logos */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            {Array.from({ length: numLogos }).map((_, i) => {
              const size = Math.random() * 70 + 30; // Slightly smaller max size
              const startX = Math.random() * 100 + 'vw';
              const startY = Math.random() * 100 + 'vh';
              const endX = (Math.random() * 100 - 50) + 'vw'; 
              const endY = (Math.random() * 100 - 50) + 'vh';
              const duration = Math.random() * 25 + 20; // Slightly longer duration
              const delay = Math.random() * 20; // Slightly longer delay
              const scale = Math.random() * 0.4 + 0.4; // Slightly smaller scale
              const maxOpacity = Math.random() * 0.02 + 0.01; // More subtle opacity

              return (
                <MercedesLogo
                  key={i}
                  style={{
                    position: 'absolute',
                    width: size,
                    height: size,
                    top: 0, // Initial top/left will be controlled by transform
                    left: 0,
                    opacity: 0,
                    animation: `moveLogos ${duration}s linear ${delay}s infinite`,
                    // CSS Custom Properties for animation
                    ['--start-x']: startX,
                    ['--start-y']: startY,
                    ['--end-x']: endX,
                    ['--end-y']: endY,
                    ['--scale']: scale,
                    ['--max-opacity']: maxOpacity,
                  } as React.CSSProperties}
                />
              );
            })}
        </div>
        
        <form 
          onSubmit={handleLogin} 
          style={{ 
              background: themeColors.cardBackground,
              padding: "40px 35px", // Increased horizontal padding
              borderRadius: 20, // Increased border radius
              boxShadow: `0 15px 35px rgba(0,0,0,0.08)`, // Softer shadow
              width: "100%",
              maxWidth: 420, // Slightly wider
              position: "relative", 
              zIndex: 1, 
              overflow: "hidden",
              border: `1px solid ${themeColors.borderColor}`,
              transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
          }}
        >
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: themeColors.headerGradient,
            animation: "shimmer 4s infinite linear", // Added shimmer animation
            backgroundSize: "2000px 100%" // For shimmer effect
          }}></div>
          
          <h2 style={{ 
            textAlign: "center", 
              marginBottom: 20,
              color: themeColors.textPrimary,
              fontSize: 26,
            fontWeight: 600
          }}>
              Admin Portal Access
          </h2>
          
          <p style={{ 
            textAlign: "center", 
              marginBottom: 35,
              color: themeColors.textSecondary,
            fontSize: 15 
          }}>
              Securely sign in to manage the CVM dashboard.
          </p>
          
            <div style={{ marginBottom: 25 }}>
              <label style={{ display: "block", marginBottom: 10, color: themeColors.textSecondary, fontSize: 14, fontWeight: 500 }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{ 
                width: "100%", 
                  padding: "15px 20px", // Adjusted padding
                  borderRadius: 12, // Increased border radius
                  border: `1px solid ${themeColors.borderColor}`,
                  background: themeColors.inputBackground,
                  color: themeColors.textPrimary,
                  fontSize: 16,
                outline: "none",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease",
                boxSizing: "border-box"
              }}
                onFocus={(e) => { e.target.style.borderColor = themeColors.accentPurple; e.target.style.boxShadow = `0 0 0 3px ${themeColors.accentPurple}40`; }}
                onBlur={(e) => { e.target.style.borderColor = themeColors.borderColor; e.target.style.boxShadow = 'none'; }}
              required
            />
          </div>
          
            <div style={{ marginBottom: 35 }}>
              <label style={{ display: "block", marginBottom: 10, color: themeColors.textSecondary, fontSize: 14, fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ 
                width: "100%", 
                  padding: "15px 20px", // Adjusted padding
                  borderRadius: 12, // Increased border radius
                  border: `1px solid ${themeColors.borderColor}`,
                  background: themeColors.inputBackground,
                  color: themeColors.textPrimary,
                  fontSize: 16,
                outline: "none",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease",
                boxSizing: "border-box"
              }}
                onFocus={(e) => { e.target.style.borderColor = themeColors.accentPurple; e.target.style.boxShadow = `0 0 0 3px ${themeColors.accentPurple}40`; }}
                onBlur={(e) => { e.target.style.borderColor = themeColors.borderColor; e.target.style.boxShadow = 'none'; }}
              required
            />
          </div>
          
          <button
            type="submit"
            style={{ 
              width: "100%", 
              padding: "18px 10px", // Increased padding
              borderRadius: 12, // Increased border radius
              background: themeColors.accentPurple,
              color: themeColors.white,
              border: "none", 
              fontWeight: 600, 
              fontSize: 17,
              cursor: "pointer",
              transition: "background 0.4s ease, transform 0.2s ease, box-shadow 0.4s ease", // Refined transition
              boxShadow: `0 7px 20px ${themeColors.accentPurple}50` // Softer, slightly larger shadow
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `linear-gradient(45deg, ${themeColors.accentPurple}, #A142D8)`; // Brighter gradient on hover
                e.currentTarget.style.boxShadow = `0 10px 30px ${themeColors.accentPurple}70`; // Enhanced shadow on hover
                e.currentTarget.style.transform = 'scale(1.02)'; // Slight scale up on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = themeColors.accentPurple;
                e.currentTarget.style.boxShadow = `0 7px 20px ${themeColors.accentPurple}50`;
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'} // Slightly more pronounced press
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1.02)'} // Return to hover scale
          >
              Secure Login
          </button>
        </form>
        
          <div style={{ marginTop: 70, textAlign: "center" }}>
            <h3 style={{ color: themeColors.textSecondary, marginBottom: 25, fontWeight: 400, fontSize: 15 }}>
              Authorized Distributor for Leading Automotive Brands
          </h3>
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            flexWrap: "wrap", 
              gap: "20px 25px",
              maxWidth: 700
            }}>
              {brands.slice(0, 5).map(brand => (
                <div key={brand.name} style={{ 
                  background: themeColors.cardBackgroundLighter, 
                  padding: "12px 18px", 
                  borderRadius: 10, 
                  width: 120, height: 65, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  border: `1px solid ${themeColors.borderColor}`,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease, border-color 0.3s ease",
                }}
                onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 6px 12px rgba(0,0,0,0.1)`}}
                onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateY(0px)'; e.currentTarget.style.boxShadow = 'none'}}
                >
                  <img src={brand.logo} alt={brand.name} style={{ maxHeight: brand.name === "Sixt Rent a Car" ? 25 : 40, filter: 'none' }} />
            </div>
              ))}
            </div>
            </div>
            
          <div style={{ marginTop: 50, color: themeColors.textSecondary, fontSize: 13, textAlign: "center" }}>
            © Gargash Enterprises LLC {new Date().getFullYear()}. All rights reserved. Secure Access Portal.
            </div>
            </div>
      </>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: themeColors.background, color: themeColors.textPrimary, padding: "0", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", transition: "background 0.3s ease, color 0.3s ease" }}>
      <header style={{ 
        background: themeColors.cardBackground,
        padding: "15px 30px",
        boxShadow: `0 6px 25px rgba(0,0,0,0.07)`, // Slightly refined shadow
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: `1px solid ${themeColors.borderColor}`,
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1400,
          margin: "0 auto"
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img 
              src={gargashLogo} 
              alt="Gargash" 
              style={{ height: 38, filter: 'none' }}
            />
            <span style={{ 
              marginLeft: 25,
              color: themeColors.textPrimary,
              fontSize: 20,
              fontWeight: 500,
              borderLeft: `1px solid ${themeColors.borderColor}`,
              paddingLeft: 25,
              transition: "color 0.3s ease, border-color 0.3s ease"
            }}>
              CVM Dashboard
            </span>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 8, 
              color: themeColors.textSecondary,
              fontSize: 14
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Last updated: Today, 10:45 AM
            </div>
            <button 
              onClick={() => { setLoggedIn(false); setAnimationsReady(false); }}
              style={{ 
                padding: "10px 18px",
                background: "transparent",
                border: `1px solid ${themeColors.accentPurple}`,
                borderRadius: 8,
                cursor: "pointer",
                color: themeColors.accentPurple,
                fontSize: 14,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.3s ease"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = themeColors.accentPurple; e.currentTarget.style.color = themeColors.white;}}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = themeColors.accentPurple;}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
        maxWidth: 1600,
        margin: "30px auto",
        padding: "0 20px",
        perspective: "1500px" // Added for 3D transformations of child elements
      }}>
        <h1 style={{ 
          fontSize: 32,
          color: themeColors.textPrimary,
          marginBottom: 30,
          fontWeight: 700,
          letterSpacing: "-0.5px" // Added for tighter, modern look
        }}>
          <span style={{ color: themeColors.accentPurple }}>CVM</span> Dashboard Overview
        </h1>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: 25,
          marginBottom: 35
        }}>
          <div className="card-hover-effect" style={{ 
            background: themeColors.cardBackground,
            borderRadius: 16, // Standardized radius
            padding: "25px",
            boxShadow: `0 12px 35px rgba(0,0,0,0.07)`, // Standardized shadow
            position: "relative",
            overflow: "hidden",
            border: `1px solid ${themeColors.borderColor}`,
            transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease"
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: themeColors.headerGradient,
              animation: "shimmer 4s infinite linear",
              backgroundSize: "2000px 100%"
            }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 42, fontWeight: 700, color: themeColors.accentPurple, marginBottom: 5 }}>24</div>
                <div style={{ color: themeColors.textSecondary, fontSize: 17 }}>Cars Sold</div>
              </div>
              <div style={{ 
                background: `${themeColors.positive}20`,
                color: themeColors.positive,
                padding: "6px 12px",
                borderRadius: 20, 
                fontSize: 13, 
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 5
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                12%
              </div>
            </div>
            <div style={{ height: 70 }}>
              <svg width="100%" height="100%" viewBox="0 0 300 70" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient1Dynamic" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={themeColors.accentPurple} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={themeColors.cardBackground} stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <path d="M0,60 L30,55 L60,58 L90,50 L120,52 L150,48 L180,40 L210,35 L240,30 L270,25 L300,20"
                      style={{
                        fill: "none",
                        stroke: themeColors.accentPurple,
                        strokeWidth: 2.5,
                        strokeDasharray: animationsReady ? 'none' : 500,
                        strokeDashoffset: animationsReady ? 0 : 500,    
                        transition: "stroke-dashoffset 1.8s cubic-bezier(0.65, 0, 0.35, 1), stroke 0.3s ease",
                      }} />
                <path d="M0,60 L30,55 L60,58 L90,50 L120,52 L150,48 L180,40 L210,35 L240,30 L270,25 L300,20 L300,70 L0,70 Z"
                      style={{
                        fill: "url(#gradient1Dynamic)",
                        opacity: animationsReady ? 1 : 0,
                        transition: "opacity 1.2s cubic-bezier(0.65, 0, 0.35, 1) 0.5s, fill 0.3s ease",
                      }} />
              </svg>
            </div>
            <div style={{ fontSize: 13, color: themeColors.textSecondary, textAlign: "center", marginTop: 10 }}>
              Last 30 days
            </div>
          </div>
          
          <div className="card-hover-effect" style={{ 
            background: themeColors.cardBackground, borderRadius: 16, padding: "25px", boxShadow: `0 12px 35px rgba(0,0,0,0.07)`, position: "relative", overflow: "hidden", border: `1px solid ${themeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease"
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: themeColors.headerGradient, animation: "shimmer 4s infinite linear", backgroundSize: "2000px 100%" }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 42, fontWeight: 700, color: "#8E44AD", marginBottom: 5 }}>30,250</div>
                <div style={{ color: themeColors.textSecondary, fontSize: 17 }}>Loyalty Points</div>
              </div>
              <div style={{ background: `${themeColors.positive}20`, color: themeColors.positive, padding: "6px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                24%
              </div>
            </div>
            <div style={{ height: 70, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 15px" }}>
              {["P", "G", "S"].map((tier, i) => {
                const colors = ["#8E44AD", "#F1C40F", "#95A5A6"];
                const labels = ["Platinum", "Gold", "Silver"];
                const percentages = [25, 35, 40];
                return (
                  <div key={tier} style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    gap: 8, 
                    opacity: animationsReady ? 1 : 0,
                    transform: animationsReady ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.8s ease ${i * 0.2}s, transform 0.8s ease ${i * 0.2}s`
                  }}>
                    <div style={{ 
                      width: 36, 
                      height: 36, 
                      borderRadius: "50%", 
                      background: colors[i], 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      color: "white",
                      fontSize: 16,
                      fontWeight: 700
                    }}>
                      {tier}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: colors[i] }}>{labels[i]}</div>
                      <div style={{ fontSize: 12, color: themeColors.textSecondary }}>{percentages[i]}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 13, color: themeColors.textSecondary, textAlign: "center", marginTop: 10 }}>
              Tier distribution
            </div>
          </div>
          
          <div className="card-hover-effect" style={{ 
            background: themeColors.cardBackground, borderRadius: 16, padding: "25px", boxShadow: `0 12px 35px rgba(0,0,0,0.07)`, position: "relative", overflow: "hidden", border: `1px solid ${themeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease"
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: themeColors.headerGradient, animation: "shimmer 4s infinite linear", backgroundSize: "2000px 100%" }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 42, fontWeight: 700, color: themeColors.accentGold, marginBottom: 5 }}>120</div>
                <div style={{ color: themeColors.textSecondary, fontSize: 17 }}>Total Leads</div>
              </div>
              <div style={{ background: `${themeColors.positive}20`, color: themeColors.positive, padding: "6px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                18%
              </div>
            </div>
            <div style={{ height: 70, display: "flex", alignItems: "flex-end", gap: "5px", padding: "0 5px" }}>
              {[35, 45, 30, 50, 40, 60, 55, 45, 70, 65, 75, 80].map((h, i) => (
                <div key={i} style={{ 
                  height: animationsReady ? `${h}%` : '0%',
                  flex: 1, 
                  background: i === 11 ? themeColors.accentGold : `${themeColors.accentGold}50`, // Reverted to solid color
                  borderRadius: "4px 4px 0 0",
                  transition: `height 0.8s cubic-bezier(0.65, 0, 0.35, 1) ${i * 0.06}s, background 0.3s ease` // Reverted transition
                }}></div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: themeColors.textSecondary, textAlign: "center", marginTop: 10 }}>
              Month by month growth
            </div>
          </div>
          
          <div className="card-hover-effect" style={{ 
            background: themeColors.cardBackground, borderRadius: 16, padding: "25px", boxShadow: `0 12px 35px rgba(0,0,0,0.07)`, position: "relative", overflow: "hidden", border: `1px solid ${themeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease"
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: themeColors.headerGradient, animation: "shimmer 4s infinite linear", backgroundSize: "2000px 100%" }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 42, fontWeight: 700, color: themeColors.accentCyan, marginBottom: 5 }}>20%</div>
                <div style={{ color: themeColors.textSecondary, fontSize: 17 }}>Conversion Rate</div>
              </div>
              <div style={{ background: `${themeColors.negative}20`, color: themeColors.negative, padding: "6px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
                5%
              </div>
            </div>
            <div style={{ height: 70, display: "flex", justifyContent: "center", alignItems: "center",
                  transform: animationsReady ? 'scale(1)' : 'scale(0.7)', 
                  opacity: animationsReady ? 1 : 0,
                  transition: 'transform 1s cubic-bezier(0.65, 0, 0.35, 1), opacity 1s cubic-bezier(0.65, 0, 0.35, 1)'
            }}>
              <div style={{ 
                width: 70, height: 70, borderRadius: "50%",
                background: `conic-gradient(${themeColors.accentCyan} 0% 20%, ${themeColors.borderColor} 20% 100%)`,
                position: "relative",
                transition: "background 0.3s ease"
              }}>
                <div style={{ 
                  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                  width: 50, height: 50, borderRadius: "50%", background: themeColors.cardBackground,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 700, color: themeColors.accentCyan,
                  transition: "background 0.3s ease, color 0.3s ease"
                }}>
                  20%
                </div>
              </div>
              <div style={{ width: 120, marginLeft: 25, fontSize: 13, color: themeColors.textSecondary }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: themeColors.accentCyan, marginRight: 8, transition: "background 0.3s ease" }}></div>
                  <span>Converted</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: themeColors.borderColor, marginRight: 8, transition: "background 0.3s ease" }}></div>
                  <span>Potential</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: themeColors.textSecondary, textAlign: "center", marginTop: 10 }}>
              Current quarter
            </div>
          </div>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 25, marginBottom: 35 }}>
          <div className="card-hover-effect" style={{ 
            background: themeColors.cardBackground, borderRadius: 16, padding: "25px", boxShadow: `0 12px 35px rgba(0,0,0,0.07)`, border: `1px solid ${themeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 25 }}>
              <h2 className="interactive-title-hover" style={{ margin: 0, fontSize: 20, fontWeight: 600, color: themeColors.textPrimary }}>Vehicle Performance</h2>
              <div style={{ display: "flex", gap: 20 }}>
                {[{label: "Sedan", colorKey: "accentPurple"}, {label: "SUV", colorKey: "accentGold"}, {label: "Sports", colorKey: "accentCyan"}].map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: themeColors.textSecondary }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: themeColors[item.colorKey as keyof typeof themeColors], transition: "background 0.3s ease" }}></div>
                    <span>{item.label}</span>
                </div>
                ))}
                </div>
                </div>
            <div style={{ height: 280, position: "relative", paddingLeft: 40, paddingBottom: 30 }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 30, width: 35, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end" }}>
                {["100", "80", "60", "40", "20", "0"].map(label => <span key={label} style={{ fontSize: 12, color: themeColors.textSecondary, transform: "translateY(-50%)" }}>{label}</span>)}
              </div>
              <div style={{ position: "absolute", left: 40, right: 0, top: 0, bottom: 30, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <div key={i} style={{ width: "100%", height: 1, background: i === 5 ? themeColors.borderColor : `${themeColors.borderColor}80`, transition: "background 0.3s ease" }}></div>
                ))}
              </div>
              <div style={{ position: "absolute", left: 40, right: 0, bottom: 0, height: 30, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(month => (
                  <span key={month} style={{ fontSize: 12, color: themeColors.textSecondary }}>{month}</span>
                ))}
              </div>
              <div style={{ height: "100%", display: "flex", justifyContent: "space-around", alignItems: "flex-end" }}>
                {[
                  { sedan: 60, suv: 40, sports: 20 }, { sedan: 70, suv: 50, sports: 25 },
                  { sedan: 65, suv: 55, sports: 30 }, { sedan: 80, suv: 60, sports: 40 },
                  { sedan: 75, suv: 65, sports: 45 }, { sedan: 90, suv: 70, sports: 50 }
                ].map((monthData, monthIndex) => (
                  <div key={monthIndex} style={{ display: "flex", alignItems: "flex-end", gap: 5, height: "100%" }}>
                    <div style={{ width: 22, background: themeColors.accentPurple, borderRadius: "4px 4px 0 0", height: animationsReady ? `${monthData.sedan}%` : '0%', transition: `height 0.9s cubic-bezier(0.65, 0, 0.35, 1) ${monthIndex * 0.1}s, background 0.3s ease` }}></div>
                    <div style={{ width: 22, background: themeColors.accentGold, borderRadius: "4px 4px 0 0", height: animationsReady ? `${monthData.suv}%` : '0%', transition: `height 0.9s cubic-bezier(0.65, 0, 0.35, 1) ${monthIndex * 0.1 + 0.05}s, background 0.3s ease` }}></div>
                    <div style={{ width: 22, background: themeColors.accentCyan, borderRadius: "4px 4px 0 0", height: animationsReady ? `${monthData.sports}%` : '0%', transition: `height 0.9s cubic-bezier(0.65, 0, 0.35, 1) ${monthIndex * 0.1 + 0.1}s, background 0.3s ease` }}></div>
                </div>
                ))}
                </div>
                </div>
                </div>
                
          <div className="card-hover-effect" style={{ 
            background: themeColors.cardBackground, borderRadius: 16, padding: "25px", boxShadow: `0 12px 35px rgba(0,0,0,0.07)`, border: `1px solid ${themeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease"
          }}>
            <h2 className="interactive-title-hover" style={{ margin: "0 0 25px 0", fontSize: 20, fontWeight: 600, color: themeColors.textPrimary }}>Customer Loyalty</h2>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ 
                position: "relative", width: 190, height: 190, borderRadius: "50%",
                background: `conic-gradient(#8E44AD 0% 25%, #F1C40F 25% 60%, #95A5A6 60% 100%)`,
                marginBottom: 25,
                transform: animationsReady ? 'scale(1)' : 'scale(0.7)',
                opacity: animationsReady ? 1 : 0,
                transition: 'transform 1.2s cubic-bezier(0.65, 0, 0.35, 1) 0.3s, opacity 1s cubic-bezier(0.65, 0, 0.35, 1) 0.3s, background 0.3s ease',
              }}>
                <div style={{ 
                  position: "absolute", top: "50%", left: "50%", 
                  transform: "translate(-50%, -50%)",
                  width: 80, height: 80, borderRadius: "50%", background: themeColors.cardBackground,
                  display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
                  transition: "background 0.3s ease",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: themeColors.textPrimary }}>30,250</div>
                  <div style={{ fontSize: 13, color: themeColors.textSecondary }}>Total Points</div>
                </div>
              </div>
              <div style={{ width: "100%" }}>
                {[
                  { label: "Platinum", value: "25%", points: "12,500 pts", colorKey: "#8E44AD" },
                  { label: "Gold", value: "35%", points: "14,550 pts", colorKey: "#F1C40F" },
                  { label: "Silver", value: "40%", points: "3,200 pts", colorKey: "#95A5A6" }
                ].map((item, index) => (
                  <div key={item.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    marginBottom: index === 2 ? 0 : 12, padding: "10px 0",
                    borderBottom: index === 2 ? "none" : `1px solid ${themeColors.borderColor}`,
                    transition: "border-color 0.3s ease"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: item.colorKey, transition: "background 0.3s ease" }}></div>
                      <span style={{ fontSize: 15, color: themeColors.textPrimary }}>{item.label}</span>
                    </div>
                    <div style={{ fontSize: 15, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                      <span style={{ fontWeight: 600, color: item.colorKey, transition: "color 0.3s ease" }}>{item.value}</span>
                      <span style={{ fontSize: 12, color: themeColors.textSecondary }}>{item.points}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
                </div>
                
        <div style={{ marginBottom: 35 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 className="interactive-title-hover" style={{ fontSize: 22, color: themeColors.textPrimary, fontWeight: 600 }}>Active Customers</h2>
            <div style={{ display: "flex", gap: 15 }}>
              <button style={{ padding: "10px 20px", borderRadius: 10, background: themeColors.cardBackgroundLighter, border: `1px solid ${themeColors.borderColor}`, color: themeColors.textSecondary, fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background-color 0.25s ease, color 0.25s ease, border-color 0.3s ease, transform 0.15s ease, box-shadow 0.25s ease" }}
                onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = themeColors.accentPurple; e.currentTarget.style.color = themeColors.white; e.currentTarget.style.boxShadow = `0 4px 12px ${themeColors.accentPurple}30`; e.currentTarget.style.transform = 'translateY(-2px)';}}
                onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = themeColors.cardBackgroundLighter; e.currentTarget.style.color = themeColors.textSecondary; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0px)';}}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(0px) scale(0.97)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-2px) scale(1)'; }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>
                Filter
              </button>
              <button style={{ padding: "10px 20px", borderRadius: 10, background: themeColors.cardBackgroundLighter, border: `1px solid ${themeColors.borderColor}`, color: themeColors.textSecondary, fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background-color 0.25s ease, color 0.25s ease, border-color 0.3s ease, transform 0.15s ease, box-shadow 0.25s ease" }}
                onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = "#8E44AD"; e.currentTarget.style.color = themeColors.white; e.currentTarget.style.boxShadow = `0 4px 12px #8E44AD30`; e.currentTarget.style.transform = 'translateY(-2px)';}}
                onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = themeColors.cardBackgroundLighter; e.currentTarget.style.color = themeColors.textSecondary; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0px)';}}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(0px) scale(0.97)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-2px) scale(1)'; }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></path>
                </svg>
                Tiers
              </button>
              <button style={{ padding: "10px 20px", borderRadius: 10, background: themeColors.accentPurple, border: "none", color: themeColors.white, fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background 0.25s ease, transform 0.15s ease, box-shadow 0.25s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `linear-gradient(45deg, ${themeColors.accentPurple}, #8E24AA)`; e.currentTarget.style.boxShadow = `0 6px 18px ${themeColors.accentPurple}50`; e.currentTarget.style.transform = 'translateY(-2px)';}}
                onMouseLeave={(e) => { e.currentTarget.style.background = themeColors.accentPurple; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0px)';}}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(0px) scale(0.97)'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-2px) scale(1)'; }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Customer
              </button>
            </div>
          </div>
          <div className="card-hover-effect" style={{ background: themeColors.cardBackground, borderRadius: 16, boxShadow: `0 12px 35px rgba(0,0,0,0.07)`, overflowX: "auto", border: `1px solid ${themeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
              <thead>
                <tr style={{ background: themeColors.tableHeaderBg, borderBottom: `1px solid ${themeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease" }}>
                  {["Customer", "Contact & Tier", "Interest", "Status", "Actions"].map(header => (
                    <th key={header} style={{ padding: "18px", textAlign: "left", color: themeColors.textSecondary, fontWeight: 600, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.5px" }}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "AM001", initials: "AM", name: "Ahmed Al Mansouri", interaction: "2 days ago", email: "ahmed.almansouri@gmail.com", phone: "+971 55 123 4567", interest: "Mercedes-Benz S-Class", budget: "400-500K AED", status: "Test Drive Scheduled", statusColorKey: "positive", points: 12500, tier: "Platinum" },
                  { id: "LK001", initials: "LK", name: "Layla Khan", interaction: "Today", email: "layla.k@company.ae", phone: "+971 50 987 6543", interest: "Alfa Romeo Giulia", budget: "200-250K AED", status: "Negotiation", statusColorKey: "accentGold", points: 8750, tier: "Gold" },
                  { id: "RP001", initials: "RP", name: "Raj Patel", interaction: "5 days ago", email: "raj.p@outlook.com", phone: "+971 54 567 8901", interest: "GAC GS8", budget: "150-180K AED", status: "Initial Contact", statusColorKey: "accentCyan", points: 3200, tier: "Silver" },
                  { id: "MF001", initials: "MF", name: "Mohammed Al Farsi", interaction: "3 days ago", email: "m.alfarsi@etisalat.ae", phone: "+971 56 789 0123", interest: "Multiple Models", budget: "350-450K AED", status: "Follow Up Required", statusColorKey: "negative", points: 5800, tier: "Gold" },
                ].map((customer, index, arr) => (
                  <tr key={customer.id}
                    style={{ borderBottom: index === arr.length - 1 ? "none" : `1px solid ${themeColors.borderColor}`, cursor: "pointer", transition: "background-color 0.2s ease, border-color 0.3s ease" }}
                    onClick={() => {
                      // Special handling for Ahmed Al Mansouri
                      if (customer.id === "AM001") {
                        console.log("Navigating to Ahmed Al Mansouri's profile...");
                      }
                      navigate(`/user/${customer.id}`);
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = themeColors.cardBackgroundLighter}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = themeColors.cardBackground}
                  >
                    <td style={{ padding: "18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                        <div style={{ width: 42, height: 42, borderRadius: "50%", background: `${themeColors.accentPurple}30`, color: themeColors.accentPurple, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 17, transition: "background 0.3s ease, color 0.3s ease" }}>
                          {customer.initials}
                      </div>
                      <div>
                          <div style={{ fontWeight: 600, color: themeColors.textPrimary, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                            {customer.name}
                            <div style={{ 
                              fontSize: 10, 
                              fontWeight: 700, 
                              padding: "2px 7px", 
                              borderRadius: 4,
                              color: "#FFF",
                              background: customer.tier === "Platinum" ? "#8E44AD" : 
                                        customer.tier === "Gold" ? "#F1C40F" : 
                                        "#95A5A6",
                              display: "flex",
                              alignItems: "center",
                              gap: 3
                            }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></path>
                              </svg>
                              {customer.tier}
                            </div>
                          </div>
                          <div style={{ fontSize: 13, color: themeColors.textSecondary }}>Last interaction: {customer.interaction}</div>
                      </div>
                    </div>
                  </td>
                    <td style={{ padding: "18px", fontSize: 14, color: themeColors.textPrimary }}>
                      <div>{customer.email}</div>
                      <div style={{ color: themeColors.textSecondary }}>{customer.phone}</div>
                      <div style={{ 
                        marginTop: 5,
                        display: "flex", 
                        alignItems: "center",
                        gap: 5,
                        color: themeColors.textSecondary,
                        fontSize: 12
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {customer.points.toLocaleString()} loyalty points
                      </div>
                  </td>
                    <td style={{ padding: "18px", fontSize: 14, color: themeColors.textPrimary }}>
                      <div style={{ fontWeight: 500 }}>{customer.interest}</div>
                      <div style={{ color: themeColors.textSecondary }}>Budget: {customer.budget}</div>
                  </td>
                    <td style={{ padding: "18px" }}>
                      <div style={{ display: "inline-block", padding: "7px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, background: `${themeColors[customer.statusColorKey as keyof typeof themeColors]}20`, color: themeColors[customer.statusColorKey as keyof typeof themeColors], transition: "background 0.3s ease, color 0.3s ease" }}>
                        {customer.status}
                    </div>
                  </td>
                    <td style={{ padding: "18px" }}>
                      <div style={{ display: "flex", gap: 10 }}>
                        <button style={{ padding: "10px", borderRadius: 8, background: "transparent", border: `1px solid ${themeColors.borderColor}`, color: themeColors.textSecondary, cursor: "pointer", transition: "border-color 0.2s, color 0.2s" }}
                          onMouseEnter={(e) => {e.currentTarget.style.borderColor = themeColors.accentCyan; e.currentTarget.style.color = themeColors.accentCyan;}}
                          onMouseLeave={(e) => {e.currentTarget.style.borderColor = themeColors.borderColor; e.currentTarget.style.color = themeColors.textSecondary;}}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2-2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                        <button style={{ padding: "10px", borderRadius: 8, background: "transparent", border: `1px solid ${themeColors.borderColor}`, color: themeColors.textSecondary, cursor: "pointer", transition: "border-color 0.2s, color 0.2s" }}
                          onMouseEnter={(e) => {e.currentTarget.style.borderColor = themeColors.negative; e.currentTarget.style.color = themeColors.negative;}}
                          onMouseLeave={(e) => {e.currentTarget.style.borderColor = themeColors.borderColor; e.currentTarget.style.color = themeColors.textSecondary;}}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div style={{ marginBottom: 35 }}>
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 className="interactive-title-hover" style={{ fontSize: 22, color: themeColors.textPrimary, fontWeight: 600 }}>Recent Interactions</h2>
            <button style={{ padding: "10px 20px", borderRadius: 10, background: "transparent", border: `1px solid ${themeColors.accentPurple}`, color: themeColors.accentPurple, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "background 0.25s ease, color 0.25s ease, border-color 0.3s ease, transform 0.15s ease, box-shadow 0.25s ease" }}
              onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = themeColors.accentPurple; e.currentTarget.style.color = themeColors.white; e.currentTarget.style.boxShadow = `0 4px 12px ${themeColors.accentPurple}30`; e.currentTarget.style.transform = 'translateY(-2px)';}}
              onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = themeColors.accentPurple; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0px)';}}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(0px) scale(0.97)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-2px) scale(1)'; }}
            >View All</button>
          </div>
          <div className="card-hover-effect" style={{ background: themeColors.cardBackground, borderRadius: 16, boxShadow: `0 12px 35px rgba(0,0,0,0.07)`, overflow: "hidden", border: `1px solid ${themeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease" }}>
            {[
              { initials: "JD", name: "Mohamed Ahmed", time: "Today, 2:30 PM", message: "Interested in Mercedes A-Class but concerned about price point. Looking for premium features but within a lower budget.", tag: "Potential for GAC alternative", tagColorKey: "accentPurple" },
              { initials: "SS", name: "Sarah Smith", time: "Yesterday, 11:15 AM", message: "Looking for SUV with good fuel economy. Discussed Mercedes GLA but was also interested in more environmentally friendly options.", tag: "High interest - Test drive", tagColorKey: "accentGold" }
            ].map((convo, index, arr) => (
              <div key={index} style={{ padding: 25, borderBottom: index === arr.length - 1 ? "none" : `1px solid ${themeColors.borderColor}`, transition: "border-color 0.3s ease" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: 'center' }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${themeColors.accentCyan}30`, color: themeColors.accentCyan, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 16, transition: "background 0.3s ease, color 0.3s ease" }}>{convo.initials}</div>
                    <strong style={{color: themeColors.textPrimary, fontSize: 16}}>{convo.name}</strong>
                  </div>
                  <span style={{ color: themeColors.textSecondary, fontSize: 14 }}>{convo.time}</span>
                </div>
                <p style={{ margin: "8px 0 12px 0", color: themeColors.textSecondary, lineHeight: 1.7, fontSize: 15 }}>{convo.message}</p>
                <div style={{ fontSize: 13, color: themeColors.white, background: themeColors[convo.tagColorKey as keyof typeof themeColors], display: "inline-block", padding: "6px 14px", borderRadius: 20, fontWeight: 500, marginTop: 5, transition: "background 0.3s ease, color 0.3s ease" }}>{convo.tag}</div>
              </div>
            ))}
              </div>
            </div>
            
        <div>
          <h2 className="interactive-title-hover" style={{ fontSize: 22, color: themeColors.textPrimary, marginBottom: 20, fontWeight: 600 }}>CVM Insights</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 25 }}>
            {[
              { title: "Top Customer Objections", iconName: "chat", colorKey: "accentPurple", items: [{label: "Price range higher than expected", value: "42%"}, {label: "Financing terms too restrictive", value: "28%"}, {label: "Preferred color not available", value: "15%"}] },
              { title: "Cross-Sell Opportunities", iconName: "crossSell", colorKey: "accentGold", items: [{label: "Customers interested in service packages", value: "18"}, {label: "Potential leads for GAC from Mercedes inquiries", value: "12"}, {label: "Customers asked about leasing options", value: "8"}] }
            ].map(insight => (
              <div key={insight.title} className="card-hover-effect" style={{ background: themeColors.cardBackground, padding: 25, borderRadius: 16, boxShadow: `0 12px 35px rgba(0,0,0,0.07)`, border: `1px solid ${themeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease" }}>
                <h3 style={{ fontSize: 18, color: themeColors[insight.colorKey as keyof typeof themeColors], marginBottom: 20, fontWeight: 600, display: "flex", alignItems: "center", gap: 10, transition: "color 0.3s ease" }}>
                  {insight.iconName === "chat" ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={themeColors[insight.colorKey as keyof typeof themeColors]} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={themeColors[insight.colorKey as keyof typeof themeColors]} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                  }
                  {insight.title}
              </h3>
                <ul style={{ margin: 0, paddingLeft: 0, listStyleType: "none" }}>
                  {insight.items.map((item, index, arr) => (
                    <li key={item.label} style={{ padding: "12px 0", borderBottom: index === arr.length - 1 ? "none" : `1px solid ${themeColors.borderColor}`, display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.3s ease" }}>
                      <span style={{fontSize: 15, color: themeColors.textSecondary}}>{item.label}</span>
                      <span style={{ fontWeight: 600, color: themeColors[insight.colorKey as keyof typeof themeColors], fontSize: 15, transition: "color 0.3s ease" }}>{item.value}</span>
                </li>
                  ))}
              </ul>
            </div>
            ))}
            </div>
          </div>
        </div>
       <footer style={{ padding: "30px", marginTop: 40, textAlign: "center", color: themeColors.textSecondary, fontSize: 13, borderTop: `1px solid ${themeColors.borderColor}`, transition: "color 0.3s ease, border-color 0.3s ease" }}>
        Gargash Enterprises CVM Dashboard © {new Date().getFullYear()}. Advanced Automotive Solutions.
      </footer>
    </div>
  );
};

export default Admin; 