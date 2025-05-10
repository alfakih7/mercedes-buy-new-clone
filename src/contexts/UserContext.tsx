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

// Default mock user data for Ahmed Al Mansouri (replacing alfakih)
const defaultUser: UserProfile = {
  id: "AM001",
  username: "ahmed.almansouri",
  fullName: "Ahmed Al Mansouri",
  email: "ahmed.almansouri@example.com",
  phone: "+971 50 123 4567",
  avatar: "/src/ahmed_almansori.png", // Use the same as UserProfile photo
  address: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United Arab Emirates"
  },
  preferences: {
    favoriteModels: ["S-Class", "GLE Coupe", "Stelvio"],
    preferredColor: "Black",
    budget: {
      min: 0,
      max: 0
    },
    financing: true
  },
  history: {
    viewedCars: ["Mercedes-Benz S 450", "Mercedes-Benz GLC 300"],
    savedCars: ["Mercedes-Benz S 450"],
    testDrives: [
      {
        date: "2023-09-22",
        model: "GLE 53 AMG",
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