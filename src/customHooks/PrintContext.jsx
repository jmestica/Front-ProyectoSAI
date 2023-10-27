import { createContext, useContext, useState, useEffect } from 'react';

const PrintContext = createContext();

// eslint-disable-next-line react/prop-types
export const PrintProvider = ({ children }) => {

  const [PrintCount, setPrintCount] = useState(0);
  const [PrintList, setPrintList] = useState([]);

  useEffect(() => {
    
    // Obtener la "lista_impresion" desde localStorage
    const listaImpresion = JSON.parse(localStorage.getItem('lista_impresion')) || [];

    //Actualizar el estado con los elementos de la lista
    setPrintList(listaImpresion)

    // Actualizar el estado con la cantidad de elementos
    setPrintCount(listaImpresion.length);
  }, []); // Se ejecutará solo al montar el componente


  const incrementPrint = () => {
    setPrintCount(prevCount => prevCount + 1);
  };

  const decrementPrint = () => {
    setPrintCount(prevCount => Math.max(0, prevCount - 1));
  };

  const updatePrintList = (listaActual) => {
    setPrintList(listaActual)
  };

  return (
    <PrintContext.Provider value={{ PrintList ,PrintCount, incrementPrint, decrementPrint, updatePrintList }}>
      {children}
    </PrintContext.Provider>
  );
};

export const usePrint = () => {
  const context = useContext(PrintContext);
  if (!context) {
    throw new Error('usePrint debe ser utilizado dentro de un PrintProvider');
  }
  return context;
};
