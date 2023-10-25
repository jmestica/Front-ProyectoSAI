import Card from "../../components/Cards/Card";
import TopBar from "../../components/TopBar/TopBar";

import { Row, Col } from "rsuite";

import img1 from "../../assets/historial.png";
import img2 from "../../assets/add.png";
import img3 from "../../assets/edit.png";
import img4 from "../../assets/get-qr.png";

import { useParams } from "react-router-dom";

function GestionarPiezaEscaneado() {

  const params = useParams();

  return (
    <div>
      <TopBar />

      <div className="section">
        <h3 className="section-title"> Gestionar pieza</h3>
        <p className="desc">Seleccione una opción para gestionar la pieza</p>

        <br />
        <Row gutter={16} className="menu-container">
          <Col >
            <Card img_path={img1} title="Ver Historial" xl={6} link={`/tracker/historial/${params.id}`}/>
            <Card img_path={img2} title="Agregar movimiento" xl={6} link={`/tracker/movimiento/${params.id}`}/>
            <Card img_path={img3} title="Editar Historial" xl={6}/>
            <Card img_path={img4} title="Obtener QR" xl={6} link={`/tracker/qr/${params.id}`}/>

            <div></div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default GestionarPiezaEscaneado;
