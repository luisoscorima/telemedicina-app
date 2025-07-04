import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';

interface User {
  id: string; // antes decía userId
  email: string;
  role: 'admin' | 'doctor' | 'patient';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: decoded.sub, email: decoded.email, role: decoded.role });
      console.log('Decoded JWT:', decoded);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axios.post('/auth/login', { email, password });
    const token = res.data.access_token;
    localStorage.setItem('token', token);
    const decoded = JSON.parse(atob(token.split('.')[1]));
    setUser({ id: decoded.sub, email: decoded.email, role: decoded.role });
    console.log('Decoded JWT:', decoded);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
