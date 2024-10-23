"use client";

import { toast } from "@/components/ui/use-toast";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  logOut: () => Promise<void>;
  fetchUserDetails: () => Promise<void>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
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
  const [loading, setLoading] = useState<boolean>(true);
  const Url = process.env.NEXT_PUBLIC_API;

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch(`${Url}/account/userDetail`, {
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
      setUser(data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logOut = useCallback(async () => {
    try {
      const response = await fetch(`${Url}/auth/logOut`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await response.json();
      if (!response.ok) {
        toast({
          title: "Error not found",
          description: result.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Logout Successfully",
          description: result.message,
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setIsAuthenticated,
        fetchUserDetails,
        logOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
