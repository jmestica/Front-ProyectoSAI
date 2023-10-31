import { createContext, useContext, useState, useEffect } from "react";

const PrintContext = createContext();

// eslint-disable-next-line react/prop-types
export const PrintProvider = ({ children }) => {
  const [PrintCount, setPrintCount] = useState(0);
  const [PrintList, setPrintList] = useState([]);

  useEffect(() => {
    // Obtener la "lista_impresion" desde localStorage
    const listaImpresion =
      JSON.parse(localStorage.getItem("lista_impresion")) || [];

    //Actualizar el estado con los elementos de la lista
    setPrintList(listaImpresion);

    // Actualizar el estado con la cantidad de elementos
    setPrintCount(listaImpresion.length);
  }, []); // Se ejecutará solo al montar el componente

  const incrementPrint = () => {
    setPrintCount((prevCount) => prevCount + 1);
  };

  const decrementPrint = () => {
    setPrintCount((prevCount) => Math.max(0, prevCount - 1));
  };

  const updatePrintList = (listaActual) => {
    setPrintList(listaActual);
  };

  const deleteItem = (codigo_reactivo) => {
    // Obtener la lista actual desde localStorage
    const listaActual =
      JSON.parse(localStorage.getItem("lista_impresion")) || [];

    // Filtrar la lista para excluir el elemento a eliminar
    const nuevaLista = listaActual.filter(
      (elemento) => elemento.codigo_reactivo !== codigo_reactivo
    );

    // Actualizar localStorage con la nueva lista
    localStorage.setItem("lista_impresion", JSON.stringify(nuevaLista));

    // Ahora puedes optar por actualizar el estado si es necesario
    setPrintList(nuevaLista);
  };

  const deleteAll = () => {
    // Vaciar la lista de impresión en localStorage
    localStorage.setItem("lista_impresion", JSON.stringify([]));

    setPrintList([]);

    setPrintCount(0)
  };

  return (
    <PrintContext.Provider
      value={{
        PrintList,
        PrintCount,
        incrementPrint,
        decrementPrint,
        updatePrintList,
        deleteItem,
        deleteAll
      }}
    >
      {children}
    </PrintContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePrint = () => {
  const context = useContext(PrintContext);
  if (!context) {
    throw new Error("usePrint debe ser utilizado dentro de un PrintProvider");
  }
  return context;
};
