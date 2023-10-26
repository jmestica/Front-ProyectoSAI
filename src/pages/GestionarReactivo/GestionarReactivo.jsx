import { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "../../components/TopBar/TopBar";
import "./GestionarReactivo.css";

import { useNavigate } from "react-router-dom";
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

  // Trae todos los reactivos cargados en BD.
  const getReactivos = async () => {
    setLoading(true);
    const found = await axios.get(`http://${API_URL}:${PORT}//api/reactivo/getAll`);
  }

  useEffect(() => {
    try {
      getReactivos();
    } catch (error) {
      console.error('Error al obtener los datos: ', error);
    }
  }, []);

  useEffect(() => {
    // Filtra los reactivos según el término de búsqueda
    const filtered = reactivos.filter((reactivo) =>
      reactivo.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReactivos(filtered);
  }, [searchTerm, reactivos]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };


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
              value={searchTerm}
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

