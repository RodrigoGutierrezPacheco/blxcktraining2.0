import { createContext, useContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null); // "user", "trainer" o "admin"
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("userBlck");
    const storedToken = localStorage.getItem("tokenBlck");
    const storedUserType = localStorage.getItem("userTypeBlck");
    
    if (storedUser && storedToken && storedUserType) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        setUserType(storedUserType);
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData, authToken, type = "user") => {
    localStorage.setItem("userBlck", JSON.stringify(userData));
    localStorage.setItem("tokenBlck", authToken);
    localStorage.setItem("userTypeBlck", type);
    setUser(userData);
    setToken(authToken);
    setUserType(type);
  };

  const logout = () => {
    localStorage.removeItem("userBlck");
    localStorage.removeItem("tokenBlck");
    localStorage.removeItem("userTypeBlck");
    setUser(null);
    setToken(null);
    setUserType(null);
  };

  const value = {
    user,
    token,
    userType,
    isLoading,
    isAuthenticated: !!user && !!token,
    isTrainer: userType === "trainer",
    isUser: userType === "user",
    isAdmin: userType === "admin",
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}