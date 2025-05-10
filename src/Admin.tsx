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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark'); // 'dark' or 'light'
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

  const darkThemeColors = {
    background: "#121212",
    cardBackground: "#1E1E1E",
    cardBackgroundLighter: "#2A2A2A",
    textPrimary: "#E0E0E0",
    textSecondary: "#A0A0A0",
    accentPurple: "#BB86FC",
    accentGold: "#FFD700",
    accentCyan: "#03DAC6",
    positive: "#00E676",
    negative: "#FF5252",
    inputBackground: "#2C2C2C",
    borderColor: "#333333",
    white: "#FFFFFF",
    black: "#000000",
    headerGradient: "linear-gradient(90deg, #BB86FC 0%, #03DAC6 100%)",
    logoFilter: 'brightness(0) invert(1)',
    statIconColor: "#E0E0E0",
    tableHeaderBg: "#2A2A2A",
  };

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

  const currentThemeColors = theme === 'dark' ? darkThemeColors : lightThemeColors;

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };
  
  const stats = [
    { label: "Cars Sold", value: 24 },
    { label: "Total Leads", value: 120 },
    { label: "Conversion Rate", value: "20%" },
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
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: theme === 'dark' ? `linear-gradient(135deg, ${currentThemeColors.black} 0%, #1A0F2F 100%)` : `linear-gradient(135deg, #E0EAFC 0%, #CFDEF3 100%)`,
        padding: "20px",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        transition: "background 0.3s ease"
      }}>
        <div style={{ marginBottom: 50 }}>
          <img
            src={gargashLogo} 
            alt="Gargash Logo"
            style={{ height: 70, filter: theme === 'dark' ? 'grayscale(100%) brightness(0%) invert(100%)' : 'none' }}
          />
        </div>

        <form
          onSubmit={handleLogin}
          style={{
            background: currentThemeColors.cardBackground,
            padding: "40px 30px",
            borderRadius: 16,
            boxShadow: theme === 'dark' ? `0 15px 40px rgba(0,0,0,0.5)` : `0 10px 30px rgba(0,0,0,0.1)`,
            width: "100%",
            maxWidth: 400,
            position: "relative",
            overflow: "hidden",
            border: `1px solid ${currentThemeColors.borderColor}`,
            transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
          }}
        >
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: currentThemeColors.headerGradient
          }}></div>

          <h2 style={{
            textAlign: "center",
            marginBottom: 20,
            color: currentThemeColors.textPrimary,
            fontSize: 26,
            fontWeight: 600
          }}>
            Admin Portal Access
          </h2>

          <p style={{
            textAlign: "center",
            marginBottom: 35,
            color: currentThemeColors.textSecondary,
            fontSize: 15
          }}>
            Securely sign in to manage the CVM dashboard.
          </p>

          <div style={{ marginBottom: 25 }}>
            <label style={{ display: "block", marginBottom: 10, color: currentThemeColors.textSecondary, fontSize: 14, fontWeight: 500 }}>
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: 10,
                border: `1px solid ${currentThemeColors.borderColor}`,
                background: currentThemeColors.inputBackground,
                color: currentThemeColors.textPrimary,
                fontSize: 16,
                outline: "none",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease",
                boxSizing: "border-box"
              }}
              onFocus={(e) => { e.target.style.borderColor = currentThemeColors.accentPurple; e.target.style.boxShadow = `0 0 0 3px ${currentThemeColors.accentPurple}40`; }}
              onBlur={(e) => { e.target.style.borderColor = currentThemeColors.borderColor; e.target.style.boxShadow = 'none'; }}
              required
            />
          </div>

          <div style={{ marginBottom: 35 }}>
            <label style={{ display: "block", marginBottom: 10, color: currentThemeColors.textSecondary, fontSize: 14, fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: 10,
                border: `1px solid ${currentThemeColors.borderColor}`,
                background: currentThemeColors.inputBackground,
                color: currentThemeColors.textPrimary,
                fontSize: 16,
                outline: "none",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease",
                boxSizing: "border-box"
              }}
              onFocus={(e) => { e.target.style.borderColor = currentThemeColors.accentPurple; e.target.style.boxShadow = `0 0 0 3px ${currentThemeColors.accentPurple}40`; }}
              onBlur={(e) => { e.target.style.borderColor = currentThemeColors.borderColor; e.target.style.boxShadow = 'none'; }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px 10px",
              borderRadius: 10,
              background: currentThemeColors.accentPurple,
              color: theme === 'dark' ? currentThemeColors.black : currentThemeColors.white,
              border: "none",
              fontWeight: 600,
              fontSize: 17,
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.1s ease, box-shadow 0.3s ease",
              boxShadow: `0 5px 15px ${currentThemeColors.accentPurple}50`
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#A040F0' : '#500A7A' }
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentThemeColors.accentPurple}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Secure Login
          </button>
        </form>

        <div style={{ marginTop: 70, textAlign: "center" }}>
          <h3 style={{ color: currentThemeColors.textSecondary, marginBottom: 25, fontWeight: 400, fontSize: 15 }}>
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
                background: currentThemeColors.cardBackgroundLighter, 
                padding: "12px 18px", 
                borderRadius: 10, 
                width: 120, height: 65, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                border: `1px solid ${currentThemeColors.borderColor}`,
                transition: "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 6px 12px ${theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`}}
              onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateY(0px)'; e.currentTarget.style.boxShadow = 'none'}}
              >
                <img src={brand.logo} alt={brand.name} style={{ maxHeight: brand.name === "Sixt Rent a Car" ? 25 : 40, filter: brand.name === "Mercedes-Benz" && theme === 'dark' ? 'invert(1)' : 'none' }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 50, color: currentThemeColors.textSecondary, fontSize: 13, textAlign: "center" }}>
          © Gargash Enterprises LLC {new Date().getFullYear()}. All rights reserved. Secure Access Portal.
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: currentThemeColors.background, color: currentThemeColors.textPrimary, padding: "0", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", transition: "background 0.3s ease, color 0.3s ease" }}>
      <header style={{
        background: currentThemeColors.cardBackground,
        padding: "15px 30px",
        boxShadow: `0 5px 20px ${theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.07)'}`,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: `1px solid ${currentThemeColors.borderColor}`,
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
              style={{ height: 38, filter: theme === 'dark' ? 'grayscale(100%) brightness(0%) invert(100%)' : 'none' }}
            />
            <span style={{
              marginLeft: 25,
              color: currentThemeColors.textPrimary,
              fontSize: 20,
              fontWeight: 500,
              borderLeft: `1px solid ${currentThemeColors.borderColor}`,
              paddingLeft: 25,
              transition: "color 0.3s ease, border-color 0.3s ease"
            }}>
              CVM Dashboard
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <button
              onClick={toggleTheme}
              style={{
                padding: "10px",
                background: "transparent",
                border: `1px solid ${currentThemeColors.borderColor}`,
                borderRadius: 8,
                cursor: "pointer",
                color: currentThemeColors.textSecondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.3s ease"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = currentThemeColors.cardBackgroundLighter; e.currentTarget.style.color = currentThemeColors.textPrimary;}}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = currentThemeColors.textSecondary;}}
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: currentThemeColors.textSecondary,
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
                border: `1px solid ${currentThemeColors.accentPurple}`,
                borderRadius: 8,
                cursor: "pointer",
                color: currentThemeColors.accentPurple,
                fontSize: 14,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.3s ease"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = currentThemeColors.accentPurple; e.currentTarget.style.color = theme === 'dark' ? currentThemeColors.black : currentThemeColors.white;}}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = currentThemeColors.accentPurple;}}
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
        padding: "0 20px"
      }}>
        <h1 style={{
          fontSize: 32,
          color: currentThemeColors.textPrimary,
          marginBottom: 30,
          fontWeight: 700
        }}>
          <span style={{ color: currentThemeColors.accentPurple }}>CVM</span> Dashboard Overview
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: 25,
          marginBottom: 35
        }}>
          <div style={{
            background: currentThemeColors.cardBackground,
            borderRadius: 12,
            padding: "25px",
            boxShadow: `0 8px 25px ${theme === 'dark' ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.08)'}`,
            position: "relative",
            overflow: "hidden",
            border: `1px solid ${currentThemeColors.borderColor}`,
            transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: currentThemeColors.headerGradient
            }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 42, fontWeight: 700, color: currentThemeColors.accentPurple, marginBottom: 5 }}>24</div>
                <div style={{ color: currentThemeColors.textSecondary, fontSize: 17 }}>Cars Sold</div>
              </div>
              <div style={{
                background: `${currentThemeColors.positive}20`,
                color: currentThemeColors.positive,
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
                    <stop offset="0%" stopColor={currentThemeColors.accentPurple} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={currentThemeColors.cardBackground} stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <path d="M0,60 L30,55 L60,58 L90,50 L120,52 L150,48 L180,40 L210,35 L240,30 L270,25 L300,20"
                      style={{
                        fill: "none",
                        stroke: currentThemeColors.accentPurple,
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
            <div style={{ fontSize: 13, color: currentThemeColors.textSecondary, textAlign: "center", marginTop: 10 }}>
              Last 30 days
            </div>
          </div>

          <div style={{
            background: currentThemeColors.cardBackground, borderRadius: 12, padding: "25px", boxShadow: `0 8px 25px ${theme === 'dark' ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.08)'}`, position: "relative", overflow: "hidden", border: `1px solid ${currentThemeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: currentThemeColors.headerGradient }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 42, fontWeight: 700, color: currentThemeColors.accentGold, marginBottom: 5 }}>120</div>
                <div style={{ color: currentThemeColors.textSecondary, fontSize: 17 }}>Total Leads</div>
              </div>
              <div style={{ background: `${currentThemeColors.positive}20`, color: currentThemeColors.positive, padding: "6px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                18%
              </div>
            </div>
            <div style={{ height: 70, display: "flex", alignItems: "flex-end", gap: "5px", padding: "0 5px" }}>
              {[35, 45, 30, 50, 40, 60, 55, 45, 70, 65, 75, 80].map((h, i) => (
                <div key={i} style={{
                  height: animationsReady ? `${h}%` : '0%',
                  flex: 1,
                  background: i === 11 ? currentThemeColors.accentGold : `${currentThemeColors.accentGold}50`,
                  borderRadius: "4px 4px 0 0",
                  transition: `height 0.8s cubic-bezier(0.65, 0, 0.35, 1) ${i * 0.06}s, background 0.3s ease`
                }}></div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: currentThemeColors.textSecondary, textAlign: "center", marginTop: 10 }}>
              Month by month growth
            </div>
          </div>

          <div style={{
            background: currentThemeColors.cardBackground, borderRadius: 12, padding: "25px", boxShadow: `0 8px 25px ${theme === 'dark' ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.08)'}`, position: "relative", overflow: "hidden", border: `1px solid ${currentThemeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: currentThemeColors.headerGradient }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 42, fontWeight: 700, color: currentThemeColors.accentCyan, marginBottom: 5 }}>20%</div>
                <div style={{ color: currentThemeColors.textSecondary, fontSize: 17 }}>Conversion Rate</div>
              </div>
              <div style={{ background: `${currentThemeColors.negative}20`, color: currentThemeColors.negative, padding: "6px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
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
                background: `conic-gradient(${currentThemeColors.accentCyan} 0% 20%, ${currentThemeColors.borderColor} 20% 100%)`,
                position: "relative",
                transition: "background 0.3s ease"
              }}>
                <div style={{
                  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                  width: 50, height: 50, borderRadius: "50%", background: currentThemeColors.cardBackground,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 700, color: currentThemeColors.accentCyan,
                  transition: "background 0.3s ease, color 0.3s ease"
                }}>
                  20%
                </div>
              </div>
              <div style={{ width: 120, marginLeft: 25, fontSize: 13, color: currentThemeColors.textSecondary }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: currentThemeColors.accentCyan, marginRight: 8, transition: "background 0.3s ease" }}></div>
                  <span>Converted</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: currentThemeColors.borderColor, marginRight: 8, transition: "background 0.3s ease" }}></div>
                  <span>Potential</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: currentThemeColors.textSecondary, textAlign: "center", marginTop: 10 }}>
              Current quarter
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 25, marginBottom: 35 }}>
          <div style={{
            background: currentThemeColors.cardBackground, borderRadius: 12, padding: "25px", boxShadow: `0 8px 25px ${theme === 'dark' ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.08)'}`, border: `1px solid ${currentThemeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 25 }}>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: currentThemeColors.textPrimary }}>Vehicle Performance</h2>
              <div style={{ display: "flex", gap: 20 }}>
                {[{label: "Sedan", colorKey: "accentPurple"}, {label: "SUV", colorKey: "accentGold"}, {label: "Sports", colorKey: "accentCyan"}].map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: currentThemeColors.textSecondary }}>
                    <div style={{ width: 12, height: 12, borderRadius: 3, background: currentThemeColors[item.colorKey as keyof typeof currentThemeColors], transition: "background 0.3s ease" }}></div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ height: 280, position: "relative", paddingLeft: 40, paddingBottom: 30 }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 30, width: 35, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end" }}>
                {["100", "80", "60", "40", "20", "0"].map(label => <span key={label} style={{ fontSize: 12, color: currentThemeColors.textSecondary, transform: "translateY(-50%)" }}>{label}</span>)}
              </div>
              <div style={{ position: "absolute", left: 40, right: 0, top: 0, bottom: 30, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <div key={i} style={{ width: "100%", height: 1, background: i === 5 ? currentThemeColors.borderColor : `${currentThemeColors.borderColor}80`, transition: "background 0.3s ease" }}></div>
                ))}
              </div>
              <div style={{ position: "absolute", left: 40, right: 0, bottom: 0, height: 30, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(month => (
                  <span key={month} style={{ fontSize: 12, color: currentThemeColors.textSecondary }}>{month}</span>
                ))}
              </div>
              <div style={{ height: "100%", display: "flex", justifyContent: "space-around", alignItems: "flex-end" }}>
                {[
                  { sedan: 60, suv: 40, sports: 20 }, { sedan: 70, suv: 50, sports: 25 },
                  { sedan: 65, suv: 55, sports: 30 }, { sedan: 80, suv: 60, sports: 40 },
                  { sedan: 75, suv: 65, sports: 45 }, { sedan: 90, suv: 70, sports: 50 }
                ].map((monthData, monthIndex) => (
                  <div key={monthIndex} style={{ display: "flex", alignItems: "flex-end", gap: 5, height: "100%" }}>
                    <div style={{ width: 22, background: currentThemeColors.accentPurple, borderRadius: "4px 4px 0 0", height: animationsReady ? `${monthData.sedan}%` : '0%', transition: `height 0.9s cubic-bezier(0.65, 0, 0.35, 1) ${monthIndex * 0.1}s, background 0.3s ease` }}></div>
                    <div style={{ width: 22, background: currentThemeColors.accentGold, borderRadius: "4px 4px 0 0", height: animationsReady ? `${monthData.suv}%` : '0%', transition: `height 0.9s cubic-bezier(0.65, 0, 0.35, 1) ${monthIndex * 0.1 + 0.05}s, background 0.3s ease` }}></div>
                    <div style={{ width: 22, background: currentThemeColors.accentCyan, borderRadius: "4px 4px 0 0", height: animationsReady ? `${monthData.sports}%` : '0%', transition: `height 0.9s cubic-bezier(0.65, 0, 0.35, 1) ${monthIndex * 0.1 + 0.1}s, background 0.3s ease` }}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            background: currentThemeColors.cardBackground, borderRadius: 12, padding: "25px", boxShadow: `0 8px 25px ${theme === 'dark' ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.08)'}`, border: `1px solid ${currentThemeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
          }}>
            <h2 style={{ margin: "0 0 25px 0", fontSize: 20, fontWeight: 600, color: currentThemeColors.textPrimary }}>Brand Focus</h2>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                position: "relative", width: 190, height: 190, borderRadius: "50%",
                background: `conic-gradient(${currentThemeColors.accentPurple} 0% 45%, ${currentThemeColors.accentGold} 45% 70%, ${currentThemeColors.accentCyan} 70% 85%, ${currentThemeColors.borderColor} 85% 100%)`,
                marginBottom: 25,
                transform: animationsReady ? 'scale(1)' : 'scale(0.7)',
                opacity: animationsReady ? 1 : 0,
                transition: 'transform 1s cubic-bezier(0.65, 0, 0.35, 1) 0.3s, opacity 1s cubic-bezier(0.65, 0, 0.35, 1) 0.3s, background 0.3s ease'
              }}>
                <div style={{
                  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                  width: 80, height: 80, borderRadius: "50%", background: currentThemeColors.cardBackground,
                  display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
                  transition: "background 0.3s ease"
                }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: currentThemeColors.textPrimary }}>180</div>
                  <div style={{ fontSize: 13, color: currentThemeColors.textSecondary }}>Total</div>
                </div>
              </div>
              <div style={{ width: "100%" }}>
                {[
                  { label: "Mercedes", value: "45%", colorKey: "accentPurple" },
                  { label: "Alfa Romeo", value: "25%", colorKey: "accentGold" },
                  { label: "GAC", value: "15%", colorKey: "accentCyan" },
                  { label: "Other", value: "15%", colorKey: "textSecondary" }
                ].map((item, index) => (
                  <div key={item.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    marginBottom: index === 3 ? 0 : 12, padding: "10px 0",
                    borderBottom: index === 3 ? "none" : `1px solid ${currentThemeColors.borderColor}`,
                    transition: "border-color 0.3s ease"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: currentThemeColors[item.colorKey as keyof typeof currentThemeColors], transition: "background 0.3s ease" }}></div>
                      <span style={{ fontSize: 15, color: currentThemeColors.textPrimary }}>{item.label}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: currentThemeColors[item.colorKey as keyof typeof currentThemeColors], transition: "color 0.3s ease" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 35 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 22, color: currentThemeColors.textPrimary, fontWeight: 600 }}>Active Customers</h2>
            <div style={{ display: "flex", gap: 15 }}>
              <button style={{ padding: "10px 20px", borderRadius: 8, background: currentThemeColors.cardBackgroundLighter, border: `1px solid ${currentThemeColors.borderColor}`, color: currentThemeColors.textSecondary, fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background-color 0.2s, color 0.2s, border-color 0.3s ease" }}
                onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = currentThemeColors.accentPurple; e.currentTarget.style.color = theme === 'dark' ? currentThemeColors.black : currentThemeColors.white;}}
                onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = currentThemeColors.cardBackgroundLighter; e.currentTarget.style.color = currentThemeColors.textSecondary;}}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>
                Filter
              </button>
              <button style={{ padding: "10px 20px", borderRadius: 8, background: currentThemeColors.accentPurple, border: "none", color: theme === 'dark' ? currentThemeColors.black : currentThemeColors.white, fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "background-color 0.2s, color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#A040F0' : '#500A7A'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentThemeColors.accentPurple}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Customer
              </button>
            </div>
          </div>
          <div style={{ background: currentThemeColors.cardBackground, borderRadius: 12, boxShadow: `0 8px 25px ${theme === 'dark' ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.08)'}`, overflowX: "auto", border: `1px solid ${currentThemeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "800px" }}>
              <thead>
                <tr style={{ background: currentThemeColors.tableHeaderBg, borderBottom: `1px solid ${currentThemeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease" }}>
                  {["Customer", "Contact", "Interest", "Status", "Actions"].map(header => (
                    <th key={header} style={{ padding: "18px", textAlign: "left", color: currentThemeColors.textSecondary, fontWeight: 600, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.5px" }}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "AM001", initials: "AM", name: "Ahmed Al Mansouri", interaction: "2 days ago", email: "ahmed.almansouri@gmail.com", phone: "+971 55 123 4567", interest: "Mercedes-Benz S-Class", budget: "400-500K AED", status: "Test Drive Scheduled", statusColorKey: "positive" },
                  { id: "LK001", initials: "LK", name: "Layla Khan", interaction: "Today", email: "layla.k@company.ae", phone: "+971 50 987 6543", interest: "Alfa Romeo Giulia", budget: "200-250K AED", status: "Negotiation", statusColorKey: "accentGold" },
                  { id: "RP001", initials: "RP", name: "Raj Patel", interaction: "5 days ago", email: "raj.p@outlook.com", phone: "+971 54 567 8901", interest: "GAC GS8", budget: "150-180K AED", status: "Initial Contact", statusColorKey: "accentCyan" },
                  { id: "MF001", initials: "MF", name: "Mohammed Al Farsi", interaction: "3 days ago", email: "m.alfarsi@etisalat.ae", phone: "+971 56 789 0123", interest: "Multiple Models", budget: "350-450K AED", status: "Follow Up Required", statusColorKey: "negative" },
                ].map((customer, index, arr) => (
                  <tr key={customer.id}
                    style={{ borderBottom: index === arr.length - 1 ? "none" : `1px solid ${currentThemeColors.borderColor}`, cursor: "pointer", transition: "background-color 0.2s ease, border-color 0.3s ease" }}
                    onClick={() => navigate(`/user/${customer.id}`)}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentThemeColors.cardBackgroundLighter}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = currentThemeColors.cardBackground}
                  >
                    <td style={{ padding: "18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                        <div style={{ width: 42, height: 42, borderRadius: "50%", background: `${currentThemeColors.accentPurple}30`, color: currentThemeColors.accentPurple, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 17, transition: "background 0.3s ease, color 0.3s ease" }}>
                          {customer.initials}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: currentThemeColors.textPrimary, fontSize: 15 }}>{customer.name}</div>
                          <div style={{ fontSize: 13, color: currentThemeColors.textSecondary }}>Last interaction: {customer.interaction}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "18px", fontSize: 14, color: currentThemeColors.textPrimary }}>
                      <div>{customer.email}</div>
                      <div style={{ color: currentThemeColors.textSecondary }}>{customer.phone}</div>
                    </td>
                    <td style={{ padding: "18px", fontSize: 14, color: currentThemeColors.textPrimary }}>
                      <div style={{ fontWeight: 500 }}>{customer.interest}</div>
                      <div style={{ color: currentThemeColors.textSecondary }}>Budget: {customer.budget}</div>
                    </td>
                    <td style={{ padding: "18px" }}>
                      <div style={{ display: "inline-block", padding: "7px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, background: `${currentThemeColors[customer.statusColorKey as keyof typeof currentThemeColors]}20`, color: currentThemeColors[customer.statusColorKey as keyof typeof currentThemeColors], transition: "background 0.3s ease, color 0.3s ease" }}>
                        {customer.status}
                      </div>
                    </td>
                    <td style={{ padding: "18px" }}>
                      <div style={{ display: "flex", gap: 10 }}>
                        <button style={{ padding: "10px", borderRadius: 8, background: "transparent", border: `1px solid ${currentThemeColors.borderColor}`, color: currentThemeColors.textSecondary, cursor: "pointer", transition: "border-color 0.2s, color 0.2s" }}
                          onMouseEnter={(e) => {e.currentTarget.style.borderColor = currentThemeColors.accentCyan; e.currentTarget.style.color = currentThemeColors.accentCyan;}}
                          onMouseLeave={(e) => {e.currentTarget.style.borderColor = currentThemeColors.borderColor; e.currentTarget.style.color = currentThemeColors.textSecondary;}}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2-2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button style={{ padding: "10px", borderRadius: 8, background: "transparent", border: `1px solid ${currentThemeColors.borderColor}`, color: currentThemeColors.textSecondary, cursor: "pointer", transition: "border-color 0.2s, color 0.2s" }}
                          onMouseEnter={(e) => {e.currentTarget.style.borderColor = currentThemeColors.negative; e.currentTarget.style.color = currentThemeColors.negative;}}
                          onMouseLeave={(e) => {e.currentTarget.style.borderColor = currentThemeColors.borderColor; e.currentTarget.style.color = currentThemeColors.textSecondary;}}
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
            <h2 style={{ fontSize: 22, color: currentThemeColors.textPrimary, fontWeight: 600 }}>Recent Interactions</h2>
            <button style={{ padding: "10px 20px", borderRadius: 8, background: "transparent", border: `1px solid ${currentThemeColors.accentPurple}`, color: currentThemeColors.accentPurple, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "background-color 0.2s, color 0.2s, border-color 0.3s ease" }}
              onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = currentThemeColors.accentPurple; e.currentTarget.style.color = theme === 'dark' ? currentThemeColors.black : currentThemeColors.white;}}
              onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = currentThemeColors.accentPurple;}}
            >View All</button>
          </div>
          <div style={{ background: currentThemeColors.cardBackground, borderRadius: 12, boxShadow: `0 8px 25px ${theme === 'dark' ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.08)'}`, overflow: "hidden", border: `1px solid ${currentThemeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease" }}>
            {[
              { initials: "JD", name: "John Doe", time: "Today, 2:30 PM", message: "Interested in Mercedes A-Class but concerned about price point. Looking for premium features but within a lower budget.", tag: "Potential for GAC alternative", tagColorKey: "accentPurple" },
              { initials: "SS", name: "Sarah Smith", time: "Yesterday, 11:15 AM", message: "Looking for SUV with good fuel economy. Discussed Mercedes GLA but was also interested in more environmentally friendly options.", tag: "High interest - Test drive", tagColorKey: "accentGold" }
            ].map((convo, index, arr) => (
              <div key={index} style={{ padding: 25, borderBottom: index === arr.length - 1 ? "none" : `1px solid ${currentThemeColors.borderColor}`, transition: "border-color 0.3s ease" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: 'center' }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${currentThemeColors.accentCyan}30`, color: currentThemeColors.accentCyan, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 16, transition: "background 0.3s ease, color 0.3s ease" }}>{convo.initials}</div>
                    <strong style={{color: currentThemeColors.textPrimary, fontSize: 16}}>{convo.name}</strong>
                  </div>
                  <span style={{ color: currentThemeColors.textSecondary, fontSize: 14 }}>{convo.time}</span>
                </div>
                <p style={{ margin: "8px 0 12px 0", color: currentThemeColors.textSecondary, lineHeight: 1.7, fontSize: 15 }}>{convo.message}</p>
                <div style={{ fontSize: 13, color: theme === 'dark' ? currentThemeColors.black : currentThemeColors.white, background: currentThemeColors[convo.tagColorKey as keyof typeof currentThemeColors], display: "inline-block", padding: "6px 14px", borderRadius: 20, fontWeight: 500, marginTop: 5, transition: "background 0.3s ease, color 0.3s ease" }}>{convo.tag}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: 22, color: currentThemeColors.textPrimary, marginBottom: 20, fontWeight: 600 }}>CVM Insights</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 25 }}>
            {[
              { title: "Top Customer Objections", iconName: "chat", colorKey: "accentPurple", items: [{label: "Price range higher than expected", value: "42%"}, {label: "Financing terms too restrictive", value: "28%"}, {label: "Preferred color not available", value: "15%"}] },
              { title: "Cross-Sell Opportunities", iconName: "crossSell", colorKey: "accentGold", items: [{label: "Customers interested in service packages", value: "18"}, {label: "Potential leads for GAC from Mercedes inquiries", value: "12"}, {label: "Customers asked about leasing options", value: "8"}] }
            ].map(insight => (
              <div key={insight.title} style={{ background: currentThemeColors.cardBackground, padding: 25, borderRadius: 12, boxShadow: `0 8px 25px ${theme === 'dark' ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.08)'}`, border: `1px solid ${currentThemeColors.borderColor}`, transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease" }}>
                <h3 style={{ fontSize: 18, color: currentThemeColors[insight.colorKey as keyof typeof currentThemeColors], marginBottom: 20, fontWeight: 600, display: "flex", alignItems: "center", gap: 10, transition: "color 0.3s ease" }}>
                  {insight.iconName === "chat" ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={currentThemeColors[insight.colorKey as keyof typeof currentThemeColors]} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={currentThemeColors[insight.colorKey as keyof typeof currentThemeColors]} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                  }
                  {insight.title}
                </h3>
                <ul style={{ margin: 0, paddingLeft: 0, listStyleType: "none" }}>
                  {insight.items.map((item, index, arr) => (
                    <li key={item.label} style={{ padding: "12px 0", borderBottom: index === arr.length - 1 ? "none" : `1px solid ${currentThemeColors.borderColor}`, display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.3s ease" }}>
                      <span style={{fontSize: 15, color: currentThemeColors.textSecondary}}>{item.label}</span>
                      <span style={{ fontWeight: 600, color: currentThemeColors[insight.colorKey as keyof typeof currentThemeColors], fontSize: 15, transition: "color 0.3s ease" }}>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
       <footer style={{ padding: "30px", marginTop: 40, textAlign: "center", color: currentThemeColors.textSecondary, fontSize: 13, borderTop: `1px solid ${currentThemeColors.borderColor}`, transition: "color 0.3s ease, border-color 0.3s ease" }}>
        Gargash Enterprises CVM Dashboard © {new Date().getFullYear()}. Advanced Automotive Solutions.
      </footer>
    </div>
  );
};

export default Admin; 