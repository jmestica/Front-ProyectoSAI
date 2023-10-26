import { SelectPicker } from 'rsuite';

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
        <SelectPicker placement='auto' data={laboratorio} searchable={false} placeholder="Selecciona el laboratorio"/>
        <SelectPicker placement='bottom' id='mid'  data={nombres_reactivos} placeholder="Nombre de Reactivo" style={{margin: '0 30px'}}/>
        <SelectPicker placement='auto' data={stock} placeholder="Seleccione la condición del reactivo" searchable={false}/>
    </div>
  
      </div>
    </div>
  );
}

export default ConsultaStock;
