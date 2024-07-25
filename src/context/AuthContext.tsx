import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  setToken: () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('spotifyAccessToken');
    console.log('Stored token in AuthProvider:', storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false); 
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
