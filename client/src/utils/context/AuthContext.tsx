import React, {useCallback, useEffect, useState} from "react";

const STORAGE_NAME = 'userdata';

export const AuthContext = React.createContext({
  currentUserId: '',
  token: '',
  login: (id: string, token: string) => {},
  logout: () => {}
});

const AuthProvider: React.FC = ({children}) => {
  const auth = authContext();

  return (
    <AuthContext.Provider value={{...auth}}>
      {children}
    </AuthContext.Provider>
  );
}

const authContext = () => {
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const login = useCallback((id: string, token: string) => {
    setCurrentUserId(id);
    setToken(token);
    localStorage.setItem(STORAGE_NAME, JSON.stringify({id, token}));
  }, []);

  const logout = useCallback(() => {
    setCurrentUserId('');
    setToken('');
    localStorage.removeItem(STORAGE_NAME);
  }, []);

  useEffect(() => {
    const userdata = localStorage.getItem(STORAGE_NAME);
    const {id, token} = userdata ? JSON.parse(userdata) : {id: '', token: ''}
    login(id, token);
  }, []);

  return {currentUserId, token, login, logout};
}

export default AuthProvider;