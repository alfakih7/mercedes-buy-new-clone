import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import UserAvatar from "../components/UserAvatar";

const ProfilePage: React.FC = () => {
  const { user, isLoggedIn, login } = useUser();
  const navigate = useNavigate();
  
  // Auto-login for demo purposes
  useEffect(() => {
    if (!isLoggedIn) {
      login();
    }
  }, [isLoggedIn, login]);
  
  if (!user) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "70vh"
      }}>
        <div style={{ textAlign: "center" }}>
          <div 
            style={{ 
              width: 40, 
              height: 40, 
              border: "3px solid #0070cc",
              borderTopColor: "transparent",
              borderRadius: "50%",
              display: "inline-block",
              animation: "spin 1s linear infinite"
            }} 
          />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <p style={{ marginTop: 10, color: "#333" }}>Loading profile...</p>
        </div>
      </div>
    );
  }
  
  const { preferences, history, address } = user;
  
  // Format currency as AED
  const formatCurrency = (amount: number) => {
    return `AED ${amount.toLocaleString()}`;
  };
  
  return (
    <div style={{ 
      width: "100%",
      maxWidth: "100%", 
      margin: "0 auto", 
      padding: "40px 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#f8f9fa"
    }}>
      {/* Profile Header */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        marginBottom: 40, 
        background: "#fff", 
        padding: "40px 50px", 
        borderRadius: 16,
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        width: "80%",
      }}>
        <UserAvatar 
          imageSrc={user.avatar} 
          username={user.fullName} 
          size="large" 
        />
        <div style={{ marginLeft: 40, flexGrow: 1 }}>
          <h1 style={{ fontSize: 34, margin: "0 0 8px 0", fontWeight: 600 }}>{user.fullName}</h1>
          <div style={{ color: "#666", display: "flex", alignItems: "center", fontSize: 17 }}>
            <span>@{user.username}</span>
            <span style={{ margin: "0 12px" }}>•</span>
            <span>{user.email}</span>
          </div>
          <div style={{ marginTop: 25 }}>
            <button 
              style={{ 
                background: "#0070cc", 
                color: "#fff", 
                border: "none", 
                padding: "12px 24px", 
                borderRadius: 8, 
                marginRight: 20,
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 500
              }}
              onClick={() => navigate("/settings")}
            >
              Edit Profile
            </button>
            <button 
              style={{ 
                background: "#fff", 
                color: "#0070cc", 
                border: "1px solid #0070cc", 
                padding: "12px 24px", 
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 500
              }}
              onClick={() => navigate("/garage")}
            >
              My Garage
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content - 2 column layout */}
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: 30, 
        width: "80%", 
        justifyContent: "space-between"
      }}>
        {/* Left column - Personal Details */}
        <div style={{ 
          flex: "1 1 calc(50% - 15px)",
          minWidth: "300px",
        }}>
          {/* Contact Information */}
          <div style={{ 
            background: "#fff", 
            padding: "35px 40px", 
            borderRadius: 16, 
            marginBottom: 30,
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ fontSize: 24, marginTop: 0, marginBottom: 30, fontWeight: 600 }}>Contact Information</h2>
            
            <div style={{ marginBottom: 25 }}>
              <div style={{ fontSize: 17, color: "#666", marginBottom: 8 }}>Email</div>
              <div style={{ fontSize: 18 }}>{user.email}</div>
            </div>
            
            <div style={{ marginBottom: 25 }}>
              <div style={{ fontSize: 17, color: "#666", marginBottom: 8 }}>Phone</div>
              <div style={{ fontSize: 18 }}>{user.phone}</div>
            </div>
            
            <div>
              <div style={{ fontSize: 17, color: "#666", marginBottom: 8 }}>Address</div>
              <div style={{ fontSize: 18 }}>{address.street}</div>
              <div style={{ fontSize: 18 }}>{address.city}, {address.state} {address.zipCode}</div>
              <div style={{ fontSize: 18 }}>{address.country}</div>
            </div>
          </div>
          
          {/* Preferences */}
          <div style={{ 
            background: "#fff", 
            padding: "35px 40px", 
            borderRadius: 16,
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{ fontSize: 24, marginTop: 0, marginBottom: 30, fontWeight: 600 }}>Preferences</h2>
            
            <div style={{ marginBottom: 25 }}>
              <div style={{ fontSize: 17, color: "#666", marginBottom: 10 }}>Favorite Models</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
                {preferences.favoriteModels.map(model => (
                  <div 
                    key={model}
                    style={{ 
                      background: "#f2f2f2", 
                      padding: "10px 18px", 
                      borderRadius: 20,
                      fontSize: 16,
                      fontWeight: 500
                    }}
                  >
                    {model}
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: 25 }}>
              <div style={{ fontSize: 17, color: "#666", marginBottom: 10 }}>Preferred Color</div>
              <div style={{ display: "flex", alignItems: "center", fontSize: 18 }}>
                <div 
                  style={{ 
                    width: 28, 
                    height: 28, 
                    background: preferences.preferredColor === "Metallic Grey" ? "#555" : "#" + Math.floor(Math.random()*16777215).toString(16),
                    borderRadius: "50%",
                    marginRight: 15,
                    border: "2px solid #fff",
                    boxShadow: "0 0 0 1px #ddd"
                  }} 
                />
                {preferences.preferredColor}
              </div>
            </div>
            
            <div style={{ marginBottom: 25 }}>
              <div style={{ fontSize: 17, color: "#666", marginBottom: 10 }}>Budget Range</div>
              <div style={{ fontSize: 18, fontWeight: 500 }}>
                {formatCurrency(preferences.budget.min)} - {formatCurrency(preferences.budget.max)}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: 17, color: "#666", marginBottom: 10 }}>Financing</div>
              <div style={{ fontSize: 18 }}>{preferences.financing ? "Interested in financing options" : "Cash purchase preferred"}</div>
            </div>
          </div>
        </div>
        
        {/* Right column - Activity */}
        <div style={{ 
          flex: "1 1 calc(50% - 15px)",
          minWidth: "300px",
        }}>
          {/* Saved Cars */}
          <div style={{ 
            background: "#fff", 
            padding: "35px 40px", 
            borderRadius: 16, 
            marginBottom: 30,
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)" 
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
              <h2 style={{ fontSize: 24, margin: 0, fontWeight: 600 }}>Saved Cars</h2>
              <a 
                href="#" 
                style={{ 
                  color: "#0070cc", 
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 500
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/saved-cars");
                }}
              >
                See All
              </a>
            </div>
            
            {history.savedCars.map(car => (
              <div 
                key={car}
                style={{ 
                  padding: 22, 
                  border: "1px solid #eee", 
                  borderRadius: 14, 
                  marginBottom: 18,
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  ":hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                  }
                }}
                onClick={() => navigate("/car/0")} // Navigate to car details
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div 
                    style={{ 
                      width: 120, 
                      height: 72, 
                      background: "#f2f2f2",
                      borderRadius: 10,
                      marginRight: 22,
                      backgroundImage: "url(https://ext.same-assets.com/1815046438/4108292102.jpeg)",
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }} 
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 18 }}>{car}</div>
                    <div style={{ fontSize: 16, color: "#0070cc", marginTop: 8, fontWeight: 500 }}>AED 433,900</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Recently Viewed */}
          <div style={{ 
            background: "#fff", 
            padding: "35px 40px", 
            borderRadius: 16, 
            marginBottom: 30,
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)" 
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
              <h2 style={{ fontSize: 24, margin: 0, fontWeight: 600 }}>Recently Viewed</h2>
              <a 
                href="#" 
                style={{ 
                  color: "#0070cc", 
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 500
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/history");
                }}
              >
                See All
              </a>
            </div>
            
            {history.viewedCars.map(car => (
              <div 
                key={car}
                style={{ 
                  padding: 22, 
                  border: "1px solid #eee", 
                  borderRadius: 14, 
                  marginBottom: 18,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                }}
                onClick={() => navigate("/car/0")} // Navigate to car details
              >
                <div style={{ fontSize: 17, fontWeight: 500 }}>{car}</div>
                <div style={{ fontSize: 15, color: "#888" }}>Viewed today</div>
              </div>
            ))}
          </div>
          
          {/* Upcoming Test Drives */}
          <div style={{ 
            background: "#fff", 
            padding: "35px 40px", 
            borderRadius: 16,
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)" 
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
              <h2 style={{ fontSize: 24, margin: 0, fontWeight: 600 }}>Upcoming Test Drives</h2>
              <a 
                href="#" 
                style={{ 
                  color: "#0070cc", 
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 500
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/test-drives");
                }}
              >
                Book New
              </a>
            </div>
            
            {history.testDrives.length > 0 ? (
              history.testDrives.map((testDrive, index) => (
                <div 
                  key={index}
                  style={{ 
                    padding: 22, 
                    border: "1px solid #eee", 
                    borderRadius: 14, 
                    marginBottom: 18,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontWeight: 600, fontSize: 17 }}>{testDrive.model}</div>
                    <div style={{ color: "#0070cc", fontWeight: 500, fontSize: 16 }}>
                      {new Date(testDrive.date).toLocaleDateString("en-US", { 
                        month: "short", 
                        day: "numeric", 
                        year: "numeric" 
                      })}
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                    <div style={{ fontSize: 16 }}>{testDrive.location}</div>
                    <div style={{ fontSize: 16 }}>
                      {new Date(testDrive.date).toLocaleTimeString("en-US", { 
                        hour: "numeric", 
                        minute: "2-digit"
                      })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "30px 0", color: "#666", fontSize: 17 }}>
                No upcoming test drives
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 