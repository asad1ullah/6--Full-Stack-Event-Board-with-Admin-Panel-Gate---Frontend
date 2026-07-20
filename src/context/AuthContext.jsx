import { useState, useCallback } from "react";
import api from "../services/api";
import AuthContext from "./authContextInstance";

function readStoredUser() {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const persist = useCallback((token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }, []);

  const login = useCallback(
    async (email, password) => {
      const response = await api.post("/auth/login", { email, password });
      persist(response.data.token, response.data.user);
      return response.data.user;
    },
    [persist]
  );

  const register = useCallback(
    async (name, email, password) => {
      const response = await api.post("/auth/register", { name, email, password });
      persist(response.data.token, response.data.user);
      return response.data.user;
    },
    [persist]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  const isAdmin = user?.role === "Admin";

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
