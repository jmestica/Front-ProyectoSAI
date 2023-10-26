import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import "./GestionarReactivo.css";

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

function GestionarReactivo() {

  const [reactivos, setReactivos] = useState([]); // Estado para almacenar los datos de los reactivos
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [filteredReactivos, setFilteredReactivos] = useState([]); // Estado para los reactivos filtrados
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate();
  const toaster = useToaster();

  const handleSubmit = async (e, event) => {

    const ID_Pieza =
      event.target.elements.ID_Pieza_Pre.value.toUpperCase() +
      "-" +
      event.target.elements.ID_Pieza_Suf.value;

    const found = await axios.get(`http://${API_URL}:${PORT}/api/pieza/${ID_Pieza}`)

    if (found.data.id_pieza) {

      navigate(`/tracker/gestionarpieza/${ID_Pieza}`)


    } else {
      toaster.push(notFound, { placement: "bottomCenter" });
    }
  };

  /* MENSAJES DE ERRORES */

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

  const errorConection = (
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
    console.log(res)
    if (res.statusText !== "OK") {
      toaster.push(errorConection, { placement: "bottomCenter" });
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

export default GestionarReactivo;

