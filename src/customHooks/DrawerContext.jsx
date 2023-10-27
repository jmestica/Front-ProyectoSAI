import { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

// eslint-disable-next-line react/prop-types
export const DrawerProvider = ({ children }) => {
  const [estado, setEstado] = useState(false);

  const leerEstadoDrawer = () => {
    return estado;
  };

  const openDrawer = () => {
    setEstado(true);
  };

  const closeDrawer = () => {
    setEstado(false);
  };

  return (
    <DrawerContext.Provider value={{ estado, leerEstadoDrawer, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useEstado debe ser utilizado dentro de un DrawerContext');
  }
  return context;
};
