import { SelectPicker, Table } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

import TopBar from "../../components/TopBar/TopBar";
import './ConsultaStock.css'

const laboratorio = ['Cromatografía'].map(
    item => ({ label: item, value: item })
  );

const nombres_reactivos = ['Acetona Grado Plaguicida', 'Acetona PA', 'Cloruro de Metileno Grado Plaguicida - Diclorometano', 'Éter de Petróleo Grado Plaguicida', 'Sulfato de Sodio Anhidro', 'Hexano Grado Plaguicida', 'Metanol Grado Plaguicida'].map(
    item => ({ label: item, value: item })
  );

const stock = ['En Stock', 'Fuera de Stock','Descartado', 'Vencido'].map(
    item => ({ label: item, value: item })
  );

function ConsultaStock() {
  return (
    <div>
      <TopBar />
      <div className="section">
        <h3 className="section-title"> Consulta de Stock </h3>
        <p className="desc">
            Utilizá los filtros para conocer stock y próximos vencimientos. Hacé click sobre las filas para ver el detalle de cada reactivo
        </p>

    <div className="filter-container">
        <SelectPicker  data={laboratorio} searchable={false} placeholder="Selecciona el laboratorio"/>
        <SelectPicker placement='bottom' id='mid'  data={nombres_reactivos} placeholder="Nombre de Reactivo" style={{margin: '0 30px'}}/>
        <SelectPicker  data={stock} placeholder="Seleccione la condición del reactivo" searchable={false}/>
    </div>

    <Table virtualized height={400} data={[{}]}>
      <Column width={70} align="center" fixed>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={130}>
        <HeaderCell>First Name</HeaderCell>
        <Cell dataKey="firstName" />
      </Column>

      <Column width={130}>
        <HeaderCell>Last Name</HeaderCell>
        <Cell dataKey="lastName" />
      </Column>

      <Column width={100}>
        <HeaderCell>Gender</HeaderCell>
        <Cell dataKey="gender" />
      </Column>

      <Column width={100}>
        <HeaderCell>Age</HeaderCell>
        <Cell dataKey="age" />
      </Column>

      <Column width={200}>
        <HeaderCell>City</HeaderCell>
        <Cell dataKey="city" />
      </Column>

      <Column width={200}>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>
    </Table>


  
      </div>
    </div>
  );
}

export default ConsultaStock;
