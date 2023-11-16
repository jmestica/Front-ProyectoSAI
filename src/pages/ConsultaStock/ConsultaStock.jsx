/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from "axios";
import { Form, Table, SelectPicker, InputPicker, Button, Loader, Placeholder, Notification, useToaster } from 'rsuite';
import { useNavigate } from "react-router-dom";


import TopBar from "../../components/TopBar/TopBar";
import './ConsultaStock.css'
import { API_URL } from '../../../config';

const { Column, HeaderCell, Cell } = Table;


const laboratorio = ['Cromatografía'].map(
  item => ({ label: item, value: item })
);

const nombres_reactivos = ['Acetona Grado Plaguicida', 'Acetona PA', 'Cloruro de Metileno Grado Plaguicida - Diclorometano', 'Éter de Petróleo Grado Plaguicida', 'Sulfato de Sodio Anhidro', 'Hexano Grado Plaguicida', 'Metanol Grado Plaguicida'].map(
  item => ({ label: item, value: item })
);

const stock = ['En Stock', 'Sin Stock', 'Descartado', 'Vencido'].map(
  item => ({ label: item, value: item })
);

function ConsultaStock() {

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [labFilter, setLabFilter] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [contador, setContador] = useState(1);
  const [loading, setLoading] = useState(false)

  const toaster = useToaster();

  const errorConnection = (
    <Notification
      header="Error al obtener los datos"
      closable
      type="error"
    >
      No se ha podido cargar los datos en este momento. Por favor, intente nuevamente más tarde.
    </Notification>
  );

  const errorNotFound = (
    <Notification
      header="Sin resultados"
      closable
      type="info"
    >
      No se encontraron reactivos que cumplan con los filtros seleccionados.
    </Notification>
  );

  const errorNotEmpty = (
    <Notification
      header="Atención"
      closable
      type="warning"
    >
      Los filtros son requeridos para realizar una búsqueda. Por favor seleccione las opciones disponibles.
    </Notification>
  );


  /* FX QUE TRAE TODOS LOS REACTIVOS */

  const handleSubmit = async (e) => {

    if (labFilter == "" || tipoFilter == "" || stockFilter == "") {
      toaster.push(errorNotEmpty, { placement: 'topCenter' });
      return;
    }

    setLoading(true);

    try {

      const res = await axios.get(`http://${API_URL}/api/reactivo/getFiltrados?labFilter=${labFilter}&tipoFilter=${tipoFilter}&stockFilter=${stockFilter}`);

      if (res.statusText !== "OK") {

        toaster.push(errorConnection, { placement: 'topCenter' });
        setLoading(false)
        return;
      }

      // cuando no se encuentran resultados
      if (res.data.status == 400) {
        toaster.push(errorNotFound, { placement: 'topCenter' });
        setTableData([])
        setLoading(false);
        return;
      }

      const filteredData = res.data.map((item, index) => ({
        ...item,
        index: contador + index,
        fechaIngreso: new Date(`${item.fecha_ingreso}`).toLocaleDateString(),
        fechaVto: new Date(`${item.fecha_vto}`).toLocaleDateString()
      }));

      setTableData(filteredData);
      setLoading(false)

    }
    catch (error) {
      console.error("Error al obtener los reactivos. Intente nuevamente...", error);
      toaster.push(errorConnection, { placement: 'topCenter' });
      setLoading(false)
    }
  }

  useEffect(() => {

  }, [tableData]);

  const gestionarReactivo = (data) => {

      const {codigo} = data;

      navigate(`/tracker/gestionar-reactivo/${codigo}`);

  }


  return (

    <div>
      <TopBar />
      <div className="section">
        <h3 className="section-title"> Consulta de Stock </h3>
        <p className="desc">
          Utilizá los filtros para conocer stock y próximos vencimientos. Hacé click sobre las filas para ver el detalle de cada reactivo
        </p>
        <br />

        <Form onSubmit={handleSubmit}>
          <div className="filter-container">
            <InputPicker
              placeholder="Filtrar por laboratorio"
              data={laboratorio}
              value={labFilter}
              onChange={(value) => setLabFilter(value)}
              disabled={loading}
              required
            />
            <InputPicker
              placeholder="Filtrar por tipo de reactivo"
              data={nombres_reactivos}
              value={tipoFilter}
              onChange={(value) => setTipoFilter(value)}
              disabled={loading}
              required
            />
            <SelectPicker
              data={stock}
              placeholder="Filtrar por stock"
              value={stockFilter}
              onChange={(value) => setStockFilter(value)}
              searchable={false}
              disabled={loading}
              required
            />

            <br />

            <Button style={{ margin: "10px" }} appearance="primary" type="submit" disabled={loading}>
              Buscar
            </Button>
          </div>

        </Form>

        {
          loading
            ? (
              <div>
                <Placeholder.Paragraph rows={8} />
                <Loader backdrop content="Buscando los reactivos, aguarde por favor..." vertical />
              </div>
            ) : null
        }

        <div className="table-container-stock">
          <Table autoHeight width={790} cellBordered bordered onRowClick={(data)=>{gestionarReactivo(data)}} data={tableData}>
            <Column align="center" width={38}>
              <HeaderCell>#</HeaderCell>
              <Cell dataKey="index" />
            </Column>
            <Column align="center" width={100}>
              <HeaderCell>Código</HeaderCell>
              <Cell dataKey="codigo" />
            </Column>
            <Column align="center" width={150}>
              <HeaderCell>Tipo</HeaderCell>
              <Cell dataKey="nombre_reactivo" />
            </Column>
            <Column align="center" width={100}>
              <HeaderCell>Ingreso</HeaderCell>
              <Cell dataKey="fechaIngreso" />
            </Column>
            <Column align="center" width={100}>
              <HeaderCell>Vencimiento</HeaderCell>
              <Cell dataKey="fechaVto" />
            </Column>
            <Column align="center" width={100}>
              <HeaderCell>N° Lote</HeaderCell>
              <Cell dataKey="nro_lote" />
            </Column>
            <Column align="center" width={100}>
              <HeaderCell>N° Expediente</HeaderCell>
              <Cell dataKey="nro_expediente" />
            </Column>
            <Column align="center" width={100}>
              <HeaderCell>Cantidad</HeaderCell>
              <Cell>
                {rowData => rowData.cantidad + ' ml'}
              </Cell>
            </Column>
          </Table>
        </div>

      </div>

    </div>
  );
}

export default ConsultaStock;
