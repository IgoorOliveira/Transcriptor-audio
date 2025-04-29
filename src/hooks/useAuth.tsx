import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { getToken, setToken, clearToken } from "../utils";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signingIn: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  const token = getToken();
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    api
      .get("/users/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        clearToken();
        delete api.defaults.headers.common.Authorization;
        setUser(null);
        navigate("/login");
      });
  }
}, []);

  async function signIn(email: string, password: string) {
    setSigningIn(true);
    try {
      const response = await api.post("/users/login", { email, password });
      const { token, user } = response.data;

      setToken(token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(user);
      navigate("/app");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    } finally {
      setSigningIn(false);
    }
  }

  function signOut() {
    clearToken();
    delete api.defaults.headers.common.Authorization;
    setUser(null);
    navigate("/"); 
  }

  return (
    <AuthContext.Provider value={{ user, signingIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
