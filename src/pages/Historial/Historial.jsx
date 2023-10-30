import TopBar from "../../components/TopBar/TopBar";
import { useParams } from "react-router-dom";
import { Table, Modal, Button } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import "./Historial.css";
import { useFetchReactivo } from "../../customHooks/useFetch/useFetchReactivo";
import { useFetchHistorial } from "../../customHooks/useFetch/useFetchHistorial";

function Historial() {

  const { infoReactivo } = useFetchReactivo();
  const { historial } = useFetchHistorial();

  console.log(infoReactivo, "1");
  console.log(historial, "2");
 
  const params = useParams();


  // const [infoReactivo, setInfoReactivo] = useState([])
  // const [historial, setHistorial] = useState([]);
  // const [contador, setContador] = useState(1);


  // Llamada a una función asíncrona que devuelve un array de datos del historial
  // const fetchHistorial = async () => {

  //   try {
  //     const res = await axios.get(
  //       `http://${API_URL}:${PORT}/api/reactivo/historial/${params.id}`
  //     );

  //     if (res.statusText !== "OK") {
  //       toaster.push(errorConnection, { placement: "TopCenter" });
  //       return;
  //     }

  //     // Asigna el n° de fila al contador y luego ++ el contador.
  //     const historialData = res.data.map((item, index) => ({
  //       ...item,
  //       index: contador + index,
  //       fechaFormateada: new Date(`${item.registro_consumo}`).toLocaleDateString()
  //     }));
  //     setHistorial(historialData);

  //   } catch (error) {
  //     console.error(error);
  //     toaster.push(errorConnection, { placement: "TopCenter" });
  //   }
  // }

  // Llamada a una función asíncrona que devuelve la info de un reactivo.
  // const fetchReactivo = async () => {

  //   try {
  //     const res = await axios.get(
  //       `http://${API_URL}:${PORT}/api/reactivo/${params.id}`
  //     );

  //     if (res.statusText !== "OK") {
  //       toaster.push(errorConnection, { placement: "TopCenter" });
  //       return;
  //     }

  //     const data = res.data[0];

  //     const datosReactivo = {
  //       ...data,
  //       fechaIngresoFormateada: new Date(`${data.fecha_ingreso}`).toLocaleDateString(),
  //       fechaVtoFormateada: new Date(`${data.fecha_vto}`).toLocaleDateString()
  //     }

  //     setInfoReactivo(datosReactivo)

  //   } catch (error) {
  //     console.error(error);
  //     toaster.push(errorConnection, { placement: "TopCenter" });
  //   }
  // };

  const errorConnection = (
    <Notification
      header="Error al obtener los datos"
      closable
      type="error"
    >
      No se ha podido cargar los datos en este momento. Por favor, inténtalo de nuevo más tarde.
    </Notification>
  )


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
            <p className="content">{infoReactivo?.fechaIngresoFormateada}</p>
          </div>
          <div className="info">
            <p className="subtitle">Vencimiento</p>
            <p className="content">{infoReactivo?.fechaVtoFormateada} </p>
          </div>
        </div>

        <h4 className="title-product">Historial</h4>

        <div className="table-container-lg">
          <Table autoHeight cellBordered bordered data={historial}>
            <Column align="center" width={30}>
              <HeaderCell>#</HeaderCell>
              <Cell dataKey="index" fullText />
            </Column>
            <Column align="center" fixed flexGrow={1}>
              <HeaderCell>Consumo</HeaderCell>
              <Cell>
                {rowData => rowData.cantidad_usada + ' ml'}
              </Cell>
            </Column>
            <Column align="center" fixed flexGrow={2}>
              <HeaderCell>Fecha</HeaderCell>
              <Cell dataKey="fechaFormateada" />
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
