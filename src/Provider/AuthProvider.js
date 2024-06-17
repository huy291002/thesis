import { createContext, useState, useEffect } from 'react';
import jwt from 'jwt-decode';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  useEffect(() => {
    const token = window.localStorage.getItem('access_token');
    if (window.localStorage.getItem('access_token')) {
      const user = jwt(token);
      setUser(user);
    }
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthContext;
