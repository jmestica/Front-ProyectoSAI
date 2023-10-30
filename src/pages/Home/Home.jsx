import "./Home.css";
import { Grid, Row } from 'rsuite';

import TopBar from "../../components/TopBar/TopBar";
import Card from "../../components/Cards/Card";

import img1 from '../../assets/test-results.png'
import img2 from '../../assets/qr.png'
import img3 from '../../assets/stock.png'



function Home() {
  return (
    <div className="home-container">

    <TopBar/>

     <Grid fluid className="menu">
      <Row gutter={16}>
        <Card img_path={img1} title={'Dar de alta reactivo'} link={'/tracker/crear-reactivo'} xl={12}/>
        <Card img_path={img2} title={'Gestionar Reactivo'} link={'/tracker/gestionar-reactivo'} xl={12}/>
        <Card img_path={img3} title={'Consultar stock'} link={'/tracker/stock'}/>
        {/* <Card img_path={img4} title={'Buscar producto'} link={'/tracker/buscar'}/> */}
      </Row>
    </Grid>
    </div>
  );
}

export default Home;
