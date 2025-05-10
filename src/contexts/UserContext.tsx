import React, { createContext, useState, useContext, ReactNode } from "react";

// Mock user data profile for alfakih
interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences: {
    favoriteModels: string[];
    preferredColor: string;
    budget: {
      min: number;
      max: number;
    };
    financing: boolean;
  };
  history: {
    viewedCars: string[];
    savedCars: string[];
    testDrives: {
      date: string;
      model: string;
      location: string;
    }[];
  };
}

// Default mock user data for alfakih
const defaultUser: UserProfile = {
  id: "1",
  username: "alfakih7",
  fullName: "Al Fakih",
  email: "alfakih@example.com",
  phone: "+971 50 123 4567",
  avatar: "https://xsgames.co/randomusers/assets/avatars/male/45.jpg", // Random avatar
  address: {
    street: "123 Sheikh Zayed Road",
    city: "Dubai",
    state: "Dubai",
    zipCode: "12345",
    country: "United Arab Emirates"
  },
  preferences: {
    favoriteModels: ["E-Class", "S-Class", "GLE"],
    preferredColor: "Metallic Grey",
    budget: {
      min: 250000,
      max: 500000
    },
    financing: true
  },
  history: {
    viewedCars: ["Mercedes-Benz E-Class E 300 Sedan", "Mercedes-Benz S 500 4MATIC Sedan"],
    savedCars: ["Mercedes-Benz E-Class E 300 Sedan"],
    testDrives: [
      {
        date: "2025-05-15T10:00:00",
        model: "Mercedes-Benz S-Class",
        location: "Downtown Dubai Showroom"
      }
    ]
  }
};

// Create context types
interface UserContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  updatePreferences: (preferences: Partial<UserProfile['preferences']>) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Login function that sets the mock user
  const login = () => {
    setUser(defaultUser);
    setIsLoggedIn(true);
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };
  
  // Update user preferences
  const updatePreferences = (preferences: Partial<UserProfile['preferences']>) => {
    if (user) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          ...preferences
        }
      });
    }
  };
  
  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    updatePreferences
  };
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}; 