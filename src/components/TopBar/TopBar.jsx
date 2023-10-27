import QrcodeIcon from "@rsuite/icons/Qrcode";
import "./TopBar.css";
import { Button, Badge, Drawer} from "rsuite";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../customHooks/AuthProvider";
import { usePrint } from '../../customHooks/PrintContext';
import { useDrawer } from '../../customHooks/DrawerContext';
import { AiFillPrinter } from "react-icons/ai";
import { BiExit } from "react-icons/bi";

function TopBar() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const { PrintCount, PrintList } = usePrint();

  const { estado, openDrawer, closeDrawer } = useDrawer();

  console.log(PrintList)

  const logout = async () => {
    setAuth({});
    sessionStorage.removeItem("a_t_l_p");
    navigate("/");
  };

  return (
    <div className="header">
      <div className="logo">
        <QrcodeIcon className="logo-icon" />
        <Link to="/tracker">
          <h2 className="title">QR-Tracker</h2>
        </Link>
      </div>

      <div className="logout">
      <Badge content={PrintCount} onClick={()=>{openDrawer()}} style={{margin: '0 30px'}}>
        <Button > <p className="btn-text">Lista de Impresión</p> &nbsp; <AiFillPrinter />  </Button>
      </Badge>

        <Button color="red" appearance="primary" onClick={logout}>
          <p className="btn-text">Cerrar Sesión</p> &nbsp; <BiExit/>
        </Button>
      </div>

      <Drawer placement="right" open={estado} size="xs" onClose={() => closeDrawer()}>
        <Drawer.Header>
          <Drawer.Title>Lista de Impresión</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => closeDrawer()}>Cerrar</Button>
            <Button onClick={() => closeDrawer()} appearance="primary">
              Imprimir
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
            <b>Etiquetas a Imprimir</b>
            <br/>

              {PrintList.length > 0? <p> 
                
                {PrintList.map((reactivo, index)=>{
                  
                  return <p key={index}> {reactivo.codigo_reactivo} </p>

                })} </p> 
                  
                  
                  
                  
                  : <p> La lista está vacía..</p> }

        </Drawer.Body>
      </Drawer>
    </div>
  );
}

export default TopBar;
