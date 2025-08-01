import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder for Supabase session check
    const checkUser = async () => {
      // In a real scenario, you'd check for a Supabase session here
      // For now, we'll just simulate the loading process
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    // Placeholder for Supabase login
    console.log('Login attempt with:', email);
    // Simulate user data
    const mockUser = { id: '123', email: email, name: 'Usuário de Teste' };
    setUser(mockUser);
    return { user: mockUser, error: null };
  };

  const register = async (name, email, password) => {
    // Placeholder for Supabase register
    console.log('Register attempt with:', name, email);
    // Simulate user data
    const mockUser = { id: '123', email: email, name: name };
    setUser(mockUser);
    return { user: mockUser, error: null };
  };

  const logout = () => {
    // Placeholder for Supabase logout
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};