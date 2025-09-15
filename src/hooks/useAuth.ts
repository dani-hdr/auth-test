"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/User";
import useLocalStorage from "@/hooks/useLocalStorage";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userStorage, setUserStorage] = useLocalStorage("user", null);

  useEffect(() => {
    // Check if user exists in localStorage

    const checkAuth = () => {
      try {
        if (userStorage) {
          setUser(JSON.parse(userStorage));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserStorage(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [userStorage]);

  const login = (data: User) => {
    try {
      setUserStorage(JSON.stringify(data));
      setUser(data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Failed to save user to localStorage", err);
    }
  };
  const logout = () => {
    setUserStorage(null);
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  };
};
