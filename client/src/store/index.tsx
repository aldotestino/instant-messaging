import React, { createContext, ReactNode, useMemo, useState, useContext } from 'react';

interface UserContextI {
  auth: Auth | null,
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>
  logout: () => void
}

const UserContext = createContext<UserContextI>({} as UserContextI);

interface UserProviderProps {
  children: ReactNode
}

export interface User {
  username: string
  email: string
  avatar: string
}

export interface Auth {
  token: string
  user: User
}

function useAuth() {
  return useContext(UserContext);
}

const savedAuth = JSON.parse(localStorage.getItem('auth') || '{}');

function UserProvider({ children }: UserProviderProps) {
  
  const [auth, setAuth] = useState<Auth | null>(savedAuth);
  function logout() {
    setAuth(null);
    localStorage.removeItem('auth');
  }
  const store = useMemo(() => ({ auth, setAuth, logout }), [auth, setAuth]);

  return (
    <UserContext.Provider value={store}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, useAuth };
  