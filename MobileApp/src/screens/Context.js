import { createContext, useState, useContext } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
  const [name, setName] = useState('');
  const [picture, setPicture] = useState(null);
  const [token, setToken] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [password, setPassword] = useState('');
  const [points, setPoints] = useState(null);
  const [userId, setUserId] = useState('');

  const theme = {
    isDark,
    background: isDark ? '#222' : '#fff',
    text: isDark ? '#fff' : '#000',
    card: isDark ? '#222' : '#fff',
    shadow: isDark ? '#fff' : '#000',
    toggleTheme: () => setIsDark(!isDark),
  };

  return (
    <Context.Provider
      value={{
        name,
        setName,
        picture,
        setPicture,
        token,
        setToken,
        password,
        setPassword,
        theme,
        points,
        setPoints,
        userId,
        setUserId,
      }}>
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => useContext(Context);
export default Context;
