import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import "./BuscarReactivo.css";

import { API_URL, PORT } from "../../../config";

import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import {
  Form,
  Input,
  InputGroup,
  Notification,
  useToaster,
  Button,
  InputPicker,
} from "rsuite";

function BuscarReactivo() {

  const [reactivos, setReactivos] = useState([]); // Estado para almacenar los datos de los reactivos
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [filteredReactivos, setFilteredReactivos] = useState([]); // Estado para los reactivos filtrados
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate();
  const toaster = useToaster();

  const handleSubmit = async (e, event) => {

    if (searchTerm == null) {
      const notFound = (
        <Notification
          header="El identificador de pieza es inválido"
          closable
          type="error"
        >
          No se encontró ninguna pieza con ese identificador, por favor, verifiquelo
          e intente nuevamente
        </Notification>
      );
    }
    navigate(`/tracker/gestionar-reactivo/${searchTerm}`);

  };

  /* MENSAJES DE ERRORES */
  /*FEATURES: dinamizar este componente */
  const notFound = (
    <Notification
      header="El identificador de pieza es inválido"
      closable
      type="error"
    >
      No se encontró ninguna pieza con ese identificador, por favor, verifiquelo
      e intente nuevamente
    </Notification>
  );

  const errorConnection = (
    <Notification
      header="Error al obtener los datos"
      closable
      type="error"
    >
      No se ha podido cargar los datos en este momento. Por favor, inténtalo de nuevo más tarde.
    </Notification>
  );

  /* MENSAJES DE ERRORES */

  /* FX QUE TRAE TODOS LOS REACTIVOS */

  const getReactivos = async () => {
    setLoading(true);
    const res = await axios.get(`http://${API_URL}:${PORT}/api/reactivo/getAll`);
    if (res.statusText !== "OK") {
      toaster.push(errorConnection, { placement: "bottomCenter" });
      return;
    }

    const { data } = res;
    const formattedData = data.map(item => ({ label: item.codigo, value: item.codigo }));
    setReactivos(formattedData);
    setLoading(false)
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };


  useEffect(() => {
    getReactivos();
  }, []);

  useEffect(() => {
    // Filtra los reactivos si es que el usuario ingreso un codigo en el input.
    if (searchTerm) {
      const filtered = reactivos.filter((reactivo) =>
        reactivo.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReactivos(filtered);
    } else {
      // Si searchTerm está vacío, muestra todos los reactivos sin filtro.
      setFilteredReactivos(reactivos);
    }
  }, [searchTerm, reactivos]);


  return (

    <div>
      <TopBar />
      {/* Ver si este componente es reutilizable para cargar un nuevo reactivo */}
      <div className="section">
        <h3 className="section-title"> Gestionar Reactivo</h3>
        <p className="desc">Ingrese el identificador para gestionar el reactivo.</p>
        <Form onSubmit={handleSubmit}>
          <br />
          <InputGroup id="ID_Pieza">
            <InputPicker
              data={filteredReactivos}
              value={searchTerm ? searchTerm : ''}
              onChange={handleSearchChange}
              labelKey="label"
              placeholder="Escribe para buscar un reactivo"
              renderMenu={menu => {
                if (loading) {
                  return (
                    <p style={{ padding: 10, color: '#999', textAlign: 'center' }}>
                      <SpinnerIcon spin /> Loading...
                    </p>
                  );
                }
                return menu;
              }}
            />
          </InputGroup>

          <br />
          <Button appearance="primary" block type="submit">
            Buscar Reactivo
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default BuscarReactivo;

