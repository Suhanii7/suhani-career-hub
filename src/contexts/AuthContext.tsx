
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/lib/types";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo purposes
const mockUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  savedJobs: ["1", "3"],
  applications: [
    {
      jobId: "2",
      fullName: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      resumeUrl: "resume.pdf",
      status: "Under Review"
    }
  ]
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in (from localStorage in a real app)
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
      // In a real app, you'd fetch user data from API
      setUser(mockUser);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // This would be an API call in a real application
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(true);
        setUser(mockUser);
        localStorage.setItem("isAuthenticated", "true");
        resolve();
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    // This would be an API call in a real application
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: "user-" + Date.now(),
          name,
          email,
          savedJobs: [],
          applications: []
        };
        setIsAuthenticated(true);
        setUser(newUser);
        localStorage.setItem("isAuthenticated", "true");
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
  };

  const saveJob = (jobId: string) => {
    if (!user) return;

    setUser({
      ...user,
      savedJobs: [...user.savedJobs, jobId]
    });
  };

  const unsaveJob = (jobId: string) => {
    if (!user) return;

    setUser({
      ...user,
      savedJobs: user.savedJobs.filter(id => id !== jobId)
    });
  };

  const isJobSaved = (jobId: string): boolean => {
    return user?.savedJobs.includes(jobId) ?? false;
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    saveJob,
    unsaveJob,
    isJobSaved
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
