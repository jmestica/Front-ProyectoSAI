import QrcodeIcon from "@rsuite/icons/Qrcode";
import "./TopBar.css";
import { Button, Badge, Drawer, IconButton } from "rsuite";
import { Link, useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";

//Context
import { useContext } from "react";
import AuthContext from "../../customHooks/AuthProvider";
import { usePrint } from "../../customHooks/PrintContext";
import { useDrawer } from "../../customHooks/DrawerContext";

//Iconos
import { AiFillPrinter } from "react-icons/ai";
import { BiExit } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

function TopBar() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const { PrintCount, PrintList, deleteItem, decrementPrint, deleteAll } = usePrint();

  const { estado, openDrawer, closeDrawer } = useDrawer();

  const logout = async () => {
    setAuth({});
    sessionStorage.removeItem("a_t_l_p");
    navigate("/");
  };

  const borrarItem = (codigo_reactivo) => {
    deleteItem(codigo_reactivo);
    decrementPrint();
  };

  const emptyPrintList = () => {
    // Vaciar la lista de impresión en localStorage
    deleteAll();
  };

  const profile = sessionStorage.getItem("username");

  const initials = profile.slice(0, 2).toUpperCase();


  return (
    <div className="header no-print">
      <div className="logo">
        <QrcodeIcon className="logo-icon" />
        <Link to="/tracker">
          <h2 className="title">QR-Tracker</h2>
        </Link>
      </div>


      <div className="logout">
        <Badge
          content={PrintCount}
          onClick={() => {
            openDrawer();
          }}
          style={{ margin: "0 30px" }}
        >
          <Button>
            <p className="btn-text">Lista de Impresión</p> &nbsp;{" "}
            <AiFillPrinter />
          </Button>
        </Badge>
      </div>

      <Button color="red" appearance="primary" onClick={logout}>
        <p className="btn-text">Cerrar Sesión</p> &nbsp; <BiExit />
      </Button>

      {
        profile && <p className="header-profile"> {profile} </p>
      }
      {
        initials && <p className="header-initials"> {initials} </p>
      }

      <Drawer
        placement="right"
        open={estado}
        size="xs"
        onClose={() => closeDrawer()}
      >
        <Drawer.Header>
          <Drawer.Title>Lista de Impresión</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => closeDrawer()}>Cerrar</Button>
            <Button href="/tracker/impresion" appearance="primary">
              Imprimir
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          {PrintList.length > 0 ? (
            <div>
              {PrintList.map((reactivo) => {
                return (
                  <div className="row-etiqueta" key={reactivo}>
                    <b>{reactivo.codigo_reactivo}</b>
                    <Button
                      appearance="primary"
                      color="red"
                      onClick={() => {
                        borrarItem(reactivo.codigo_reactivo);
                      }}
                    >
                      <RxCross2 />
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p> La lista está vacía..</p>
          )}

          <IconButton
            className="float-icon"
            appearance="primary"
            color="red"
            icon={<BsFillTrashFill />}
            circle
            size="lg"
            onClick={emptyPrintList}
          />
        </Drawer.Body>
      </Drawer>
    </div>
  );
}

export default TopBar;
