import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    const storeAuth = localStorage.getItem("isAuthenticated");
    if (storeAuth === "true") {
      setIsAuthenticated(true);
      navigate("/");
    }
    setIsAuthInitialized(true);
  }, []);

  const loginSignUp = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };
  const logout = () => {
    setIsAuthenticated(true);
    localStorage.removeItem("isAuthenticated");
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthInitialized,
        loginSignUp,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
