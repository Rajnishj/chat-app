import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const user = JSON.parse(localStorage.getItem("chat-user"));

    setIsAuthenticated(!!authStatus);
    setAuthUser(user || null); // Sync with localStorage
    setIsAuthInitialized(true);
  }, []);

  const login = (user) => {
    setIsAuthenticated(true);
    setAuthUser(user); // Set `authUser` state
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("chat-user", JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthUser(null); // Clear `authUser`
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthInitialized,
        authUser, // Expose `authUser`
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
