import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase/client";

type ContextType = {
  isLogIn: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<ContextType>({
  isLogIn: false,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogIn, setIsLogIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLogIn(!!user);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLogIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
