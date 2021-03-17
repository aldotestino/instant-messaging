import React, { createContext, ReactNode, useMemo, useState, useContext } from 'react';
import { LoginMutation_login } from '../__generated__/LoginMutation';

interface UserContextI {
  auth: Partial<LoginMutation_login> | null,
  setAuth: React.Dispatch<React.SetStateAction<Partial<LoginMutation_login> | null>>
  logout: () => void
  isAuth: boolean
}

const UserContext = createContext<UserContextI>({} as UserContextI);

interface UserProviderProps {
  children: ReactNode
}

function useAuth() {
  return useContext(UserContext);
}

const user = JSON.parse(localStorage.getItem('user') || '{}');
const token = localStorage.getItem('token') || '';

function UserProvider({ children }: UserProviderProps) {
  
  const [auth, setAuth] = useState<Partial<LoginMutation_login> | null>({
    token,
    user
  });

  const isAuth = useMemo(() => Boolean(auth?.token && auth.token !== ''), [auth]);
  
  function logout() {
    setAuth(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  const store = useMemo(() => ({ auth, setAuth, logout, isAuth }), [auth, setAuth, isAuth]);

  return (
    <UserContext.Provider value={store}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, useAuth };
  