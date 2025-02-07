import { createContext, useState } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
  const [name, setName] = useState('');
  const [picture, setPicture] = useState(null);
  const [token, setToken] = useState('');

  return (
    <Context.Provider
      value={{ name, setName, picture, setPicture, token, setToken }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
