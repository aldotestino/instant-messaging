import React, { createContext, ReactNode, useMemo, useState, useContext, useEffect } from 'react';
import { LoginMutation_login } from '../__generated__/LoginMutation';
import { client } from '../utils/apolloConfig';
import { gql } from '@apollo/client';
import { MeQuery } from '../__generated__/MeQuery';

interface UserContextI {
  auth: LoginMutation_login | null,
  setAuth: React.Dispatch<React.SetStateAction<LoginMutation_login | null>>
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

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      username
      avatar
    }
  }
`;

async function getAuth(): Promise<LoginMutation_login | null> {
  const token = localStorage.getItem('token');
  if(!token) return null;
  const { data } = await client.query<MeQuery>({
    query: ME_QUERY
  });
  if(!data.me) {
    localStorage.removeItem('token');
    return null;
  }
  return {
    token,
    user: data.me
  };
}

function UserProvider({ children }: UserProviderProps) {
  
  const [auth, setAuth] = useState<LoginMutation_login | null>(null);

  useEffect(() => {
    getAuth().then(auth => setAuth(auth));
  }, []);

  const isAuth = useMemo(() => Boolean(auth?.token && auth.token !== ''), [auth]);
  
  function logout() {
    setAuth(null);
    localStorage.removeItem('token');
  }

  const store = useMemo(() => ({ auth, setAuth, logout, isAuth }), [auth, setAuth, isAuth]);

  return (
    <UserContext.Provider value={store}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, useAuth };
  