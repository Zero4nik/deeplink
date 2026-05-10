'use client'

import { createContext,useState,useCallback,useContext,ReactNode } from "react"
import api from "@/lib/api"

interface User {
    id:string
    email:string
    username:string
}

interface AuthContextType  {
    user: User | null
    token: string | null
    login: (email:string,password:string) => Promise<void>
    register: (email:string,password:string,username:string) => Promise<void>
    logout: () => void
    loading:boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children} : {children:ReactNode}){
        const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
    });

    const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
    });

    const [loading,setLoading] = useState(true)
    
        const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const response = await api.post('/auth/login', { email, password });
    const { token: newToken, user: newUser } = response.data;
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    setLoading(false);
    }, []);

    const register = useCallback(async (email: string, password: string, username: string) => {
    setLoading(true);
    const response = await api.post('/auth/register', { email, password, username });
    const { token: newToken, user: newUser } = response.data;
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    setLoading(false);
    }, []);

    const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    }, []);

     return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}