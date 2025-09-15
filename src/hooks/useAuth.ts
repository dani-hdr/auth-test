"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/User";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user exists in localStorage

    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (data: User) => {
    try {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (err) {
      console.error("Failed to save user to localStorage", err);
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };
  const isAuthenticated = !!user;
  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  };
};
