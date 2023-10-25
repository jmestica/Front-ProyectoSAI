import TopBar from "../../components/TopBar/TopBar";
import { useParams } from "react-router-dom";
import { Table, Modal, Button } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import "./Historial.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Historial() {
  const params = useParams();

  const [producto, setProducto] = useState(null)
  const [historial, setHistorial] = useState([]);
  const [datosAdicionales, setDatosAdicionales] = useState([]);
  const [datosFila, setDatosFila] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchHistorial = async () => {
      // Llamada a una función asíncrona que devuelve un array de datos del historial
      const response = await axios.get(
        `http://192.168.0.130:4000/api/pieza/historial/${params.id}`
      )

      const datosAdicionales = response.data.map(
        (item) => item.datos_adicionales
      )

      const datosProducto =  await axios.get(
        `http://192.168.0.130:4000/api/pieza/${params.id}`
      )

      setProducto(datosProducto.data)
      setHistorial(response.data)
      setDatosAdicionales(datosAdicionales)

    


    };

    fetchHistorial();
  }, []);

  const verDetalle = (rowData) => {
    const index = rowData.numero_movimiento - 1;
    const datosFila = datosAdicionales[index];

    setDatosFila(datosFila);

    handleOpen();
  };

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
            <p className="content">{producto?.nombre}</p>
          </div>
          <div className="info">
            <p className="subtitle">Cantidad</p>
            <p className="content">{producto?.cantidad} {producto?.unidad}</p>
          </div>
          <div className="info">
            <p className="subtitle">Vendedor</p>
            <p className="content">{producto?.nombre_vendedor}</p>
          </div>
          <div className="info">
            <p className="subtitle">Fecha de Compra</p>
            <p className="content">{producto?.fecha}</p>
          </div>
          <div className="info">
            <p className="subtitle">Monto</p>
            <p className="content">${producto?.monto_compra}</p>
          </div>
        </div>

        <h4 className="title-product">Historial</h4>

        <div className="table-container-lg">
          <Table autoHeight cellBordered bordered data={historial} onRowClick={verDetalle}>
            <Column align="center" width={35}>
              <HeaderCell>#</HeaderCell>
              <Cell dataKey="numero_movimiento" fullText />
            </Column>
            <Column align="center" fixed flexGrow={1}>
              <HeaderCell>Movimiento</HeaderCell>
              <Cell dataKey="accion" />
            </Column>
            <Column align="center" fixed width={100}>
              <HeaderCell>Fecha</HeaderCell>
              <Cell dataKey="fecha" />
            </Column>
            <Column align="center" fixed width={70}>
              <HeaderCell>Hora</HeaderCell>
              <Cell dataKey="hora" />
            </Column>
            <Column align="center" fixed width={100}>
              <HeaderCell>Usuario</HeaderCell>
              <Cell dataKey="nombre_usuario" />
            </Column>
          </Table>
        </div>

        <div className="table-container-sm">
          <Table
            autoHeight
            cellBordered
            bordered
            data={historial}
            onRowClick={verDetalle}
          >
            <Column align="center" fixed flexGrow={1} fullText>
              <HeaderCell>Movimiento</HeaderCell>
              <Cell dataKey="accion" />
            </Column>
            <Column align="center" fixed width={90}>
              <HeaderCell>Fecha</HeaderCell>
              <Cell dataKey="fecha" />
            </Column>
            <Column align="center" fixed width={60}>
              <HeaderCell>Hora</HeaderCell>
              <Cell dataKey="hora" />
            </Column>
            <Column align="center" fixed width={100}>
              <HeaderCell>Usuario</HeaderCell>
              <Cell dataKey="nombre_usuario" />
            </Column>
          </Table>
        </div>

        <Modal open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>Datos adicionales</Modal.Title>
          </Modal.Header>
          <Modal.Body>{datosFila}</Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} block appearance="primary">
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Historial;
