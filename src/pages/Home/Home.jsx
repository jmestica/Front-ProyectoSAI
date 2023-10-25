import "./Home.css";
import { Grid, Row } from 'rsuite';

import TopBar from "../../components/TopBar/TopBar";
import Card from "../../components/Cards/Card";

import img1 from '../../assets/test-results.png'
import img2 from '../../assets/qr.png'
// import img3 from '../../assets/vendedores.png'
// import img4 from '../../assets/search.png'



function Home() {
  return (
    <div className="home-container">

    <TopBar/>

     <Grid fluid className="menu">
      <Row gutter={16}>
        
        <Card img_path={img1} title={'Dar de alta reactivo'} link={'/tracker/crearpieza'} xl={12}/>
        <Card img_path={img2} title={'Gestionar Reactivo'} link={'/tracker/gestionarpieza'} xl={12}/>
        {/* <Card img_path={img4} title={'Buscar producto'} link={'/tracker/buscar'}/> */}


      </Row>
    </Grid>
      {/* Agregar pieza --> Completa los datos y genera el QR para imprimir */}

      {/* Gestionar pieza:id --> cuando escanea QR debería llevar a este sub menú, 
        que le de la posibilidad de lo que quiere hacer con la pieza */}
    </div>
  );
}

export default Home;
