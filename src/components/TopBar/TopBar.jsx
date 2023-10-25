import QrcodeIcon from "@rsuite/icons/Qrcode";
import "./TopBar.css";
import { Button } from "rsuite";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../customHooks/AuthProvider";

function TopBar() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

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
        <Button color="red" appearance="primary" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}

export default TopBar;
