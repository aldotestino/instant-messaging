import React, { createContext, ReactNode, useMemo, useState, useContext } from 'react';
import { LoginMutation_login } from '../__generated__/LoginMutation';

interface UserContextI {
  auth: LoginMutation_login | null,
  setAuth: React.Dispatch<React.SetStateAction<LoginMutation_login | null>>
  logout: () => void
}

const UserContext = createContext<UserContextI>({} as UserContextI);

interface UserProviderProps {
  children: ReactNode
}

function useAuth() {
  return useContext(UserContext);
}

const savedAuth = JSON.parse(localStorage.getItem('auth') || '{}');

function UserProvider({ children }: UserProviderProps) {
  
  const [auth, setAuth] = useState<LoginMutation_login | null>(savedAuth);
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
  