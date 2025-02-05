import { createContext, useState } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
  const [name, setName] = useState('');

  return (
    <Context.Provider value={{ name, setName }}>
      {children}
    </Context.Provider>
  );
};

export default Context;