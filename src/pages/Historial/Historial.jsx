import TopBar from "../../components/TopBar/TopBar";
import { useParams } from "react-router-dom";
import { Table, Modal, Button } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import "./Historial.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, PORT } from "../../../config";

function Historial() {
  const params = useParams();

  const [infoReactivo, setInfoReactivo] = useState([])
  const [historial, setHistorial] = useState([]);
  const [datosAdicionales, setDatosAdicionales] = useState([]);
  const [datosFila, setDatosFila] = useState();
  const [contador, setContador] = useState(1);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // Llamada a una función asíncrona que devuelve un array de datos del historial
  const fetchHistorial = async () => {

    try {
      const res = await axios.get(
        `http://${API_URL}:${PORT}/api/reactivo/historial/${params.id}`
      );

      if (res.statusText !== "OK") {
        toaster.push(errorConnection, { placement: "TopCenter" });
        return;
      }

      // Asigna el n° de fila al contador y luego ++ el contador.
      const historialData = res.data.map((item, index) => ({ ...item, index: contador + index }));
      setHistorial(historialData);

    } catch (error) {
      console.error(error);
      toaster.push(errorConnection, { placement: "TopCenter" });
    }
  }

  // Llamada a una función asíncrona que devuelve la info de un reactivo.
  const fetchReactivo = async () => {

    try {
      const res = await axios.get(
        `http://${API_URL}:${PORT}/api/reactivo/${params.id}`
      );

      if (res.statusText !== "OK") {
        toaster.push(errorConnection, { placement: "TopCenter" });
        return;
      }

      const datosReactivo = res.data[0];
      console.log(datosReactivo);
      setInfoReactivo(datosReactivo)

    } catch (error) {
      console.error(error);
      toaster.push(errorConnection, { placement: "TopCenter" });
    }
  };

  const errorConnection = (
    <Notification
      header="Error al obtener los datos"
      closable
      type="error"
    >
      No se ha podido cargar los datos en este momento. Por favor, inténtalo de nuevo más tarde.
    </Notification>
  )

  useEffect(() => {

    fetchHistorial();
    fetchReactivo();

  }, []);

  // const verDetalle = (rowData) => {
  //   const index = rowData.id_consumo - 1;
  //   const datosFila = datosAdicionales[index];
  //   setDatosFila(datosFila);

  //   handleOpen();
  // };


  return (
    <div>
      <TopBar />
      <div className="general-info">
        <h4 className="title-product">Información general</h4>
        <h4 className="title-product">{params.id}</h4>
        <hr />

      <div className="info-container">
          <div className="info">
            <p className="subtitle">Nombre</p>
            <p className="content">{infoReactivo?.nombre_reactivo}</p>
          </div>
          <div className="info">
            <p className="subtitle">Cantidad (ml)</p>
            <p className="content">{infoReactivo?.cantidad}</p>
          </div>
          <div className="info">
            <p className="subtitle">Marca</p>
            <p className="content">{infoReactivo?.marca}</p>
          </div>
          <div className="info">
            <p className="subtitle">Fecha de Ingreso</p>
            <p className="content">{infoReactivo?.fecha_ingreso}</p>
          </div>
          <div className="info">
            <p className="subtitle">Vencimiento</p>
            <p className="content">{infoReactivo?.fecha_vto} </p>
          </div>
        </div>

      <h4 className="title-product">Historial</h4>

      <div className="table-container-lg">
        <Table autoHeight cellBordered bordered data={historial}>
          <Column align="center" width={35}>
            <HeaderCell>#</HeaderCell>
            <Cell dataKey="index" fullText />
          </Column>
          <Column align="center" fixed flexGrow={1}>
            <HeaderCell>Consumo (ml)</HeaderCell>
            <Cell dataKey="cantidad_usada" />
          </Column>
          <Column align="center" fixed flexGrow={2}>
            <HeaderCell>Fecha</HeaderCell>
            <Cell dataKey="registro_consumo" />
          </Column>
          <Column align="center" fixed flexGrow={1}>
            <HeaderCell>Usuario</HeaderCell>
            <Cell dataKey="nombre_usuario" />
          </Column>
        </Table>
      </div>

      
    </div>
    </div >
  );
}

export default Historial;
