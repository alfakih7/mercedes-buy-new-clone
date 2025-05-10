import React from "react";

interface UserAvatarProps {
  imageSrc?: string;
  username: string;
  size?: "small" | "medium" | "large";
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  imageSrc, 
  username, 
  size = "medium" 
}) => {
  
  // Define sizes for different avatar options
  const sizes = {
    small: { width: 32, height: 32, fontSize: 14 },
    medium: { width: 40, height: 40, fontSize: 16 },
    large: { width: 64, height: 64, fontSize: 24 },
  };
  
  const { width, height, fontSize } = sizes[size];
  
  // If no image is provided, create an avatar with initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div style={{ position: "relative" }}>
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt={`${username}'s profile`}
          style={{
            width,
            height,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #0070cc"
          }}
        />
      ) : (
        <div 
          style={{
            width,
            height,
            borderRadius: "50%",
            backgroundColor: "#0070cc",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize,
            fontWeight: 600,
          }}
        >
          {getInitials(username)}
        </div>
      )}
    </div>
  );
};

export default UserAvatar; 