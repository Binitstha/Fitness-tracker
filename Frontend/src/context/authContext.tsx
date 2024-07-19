"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  fetchUserDetails: () => Promise<void>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; // Add type for setIsAuthenticated
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/account/userDetail", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, fetchUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
