import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import UserAvatar from "./UserAvatar";

interface LayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { label: "Our Models", link: "/" },
  { label: "Buy", active: true, link: "/" },
  { label: "Services", link: "/" },
  { label: "Our Brands", link: "/" },
  { label: "Technology", link: "/" },
  { label: "Gargash AI", link: "/gargash-agents" },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, isLoggedIn, login, logout } = useUser();
  
  return (
    <div style={{ minHeight: "100vh", background: "#f2f2f2", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <header style={{ background: "#040404", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", height: 70, maxWidth: 1400, margin: "0 auto", padding: "0 30px", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 20, textDecoration: "none", color: "#fff" }}>
            <img src="https://ext.same-assets.com/1815046438/2150039358.svg" alt="Mercedes Logo" style={{ height: 54, width: 54 }} />
            <span style={{ fontFamily: '"MBCorpoATitleCond-Regular-Web", Tajawal, Arial, sans-serif', fontSize: 22, fontWeight: 400, letterSpacing: 1 }}>Mercedes-Benz</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
            <span style={{ marginRight: 8, fontSize: 15 }}>عربى</span>
            {isLoggedIn && user ? (
              <Link to="/profile" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                <UserAvatar 
                  imageSrc={user.avatar} 
                  username={user.fullName} 
                  size="small" 
                />
                <span style={{ marginLeft: 10, color: "#fff", fontSize: 14 }}>
                  {user.fullName}
                </span>
              </Link>
            ) : (
              <div 
                onClick={login} 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  height: 36, 
                  width: 36, 
                  borderRadius: "50%", 
                  background: "#222",
                  cursor: "pointer" 
                }}
              >
                <svg width="20" height="20" fill="#fff" style={{ display: "block" }}><circle cx="10" cy="7" r="3.5" stroke="#fff" strokeWidth="1" fill="none"/><rect x="4" y="12" width="12" height="5" rx="2.5" stroke="#fff" strokeWidth="1" fill="none"/></svg>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Navbar */}
      <nav style={{ background: "#1a1a1a", borderBottom: "1px solid #232323" }}>
        <div style={{ display: "flex", alignItems: "center", height: 54, maxWidth: 1400, margin: "0 auto", padding: "0 30px", justifyContent: "space-between" }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.label}
                to={item.link}
                style={{
                  color: item.active ? "#fff" : "#b0b0b0",
                  fontWeight: item.active ? 700 : 400,
                  borderBottom: item.active ? "3px solid #0a75c9" : "none",
                  padding: "0 18px",
                  fontSize: 17,
                  lineHeight: "52px",
                  cursor: "pointer",
                  transition: "color 0.15s",
                  textDecoration: "none"
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {/* Profile/User section (already present) */}
          </div>
        </div>
      </nav>
      
      {/* Page content */}
      {children}
      
      {/* Footer */}
      <footer style={{ background: "#040404", color: "#ededed", display: "block", fontSize: 15, padding: "46px 16px 36px 16px", marginTop: "auto" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 34, justifyContent: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Buy Online</div>
            <div><Link to="/" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Find New Cars</Link></div>
            <div><Link to="/" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Find Pre-Owned Cars</Link></div>
            <div><Link to="/" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Contact us</Link></div>
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div><Link to="/" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Book a Test Drive</Link></div>
            <div><Link to="/" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Car Configurator</Link></div>
            <div><Link to="/" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Current Vehicle Offers</Link></div>
            <div><Link to="/" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Find a Showroom</Link></div>
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Gargash Services</div>
            <div><Link to="/profile" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>My Profile</Link></div>
            <div><Link to="/gargash-agents" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Gargash AI Assistants</Link></div>
            <div><Link to="/conversations" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>My Conversations</Link></div>
            <div><Link to="/" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Saved Cars</Link></div>
            <div><Link to="/" style={{ color: "#ededed", textDecoration: "none", display: "block", marginBottom: 2 }}>Test Drive History</Link></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;