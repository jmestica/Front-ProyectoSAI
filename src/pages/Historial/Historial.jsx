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
 
  const params = useParams();


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
