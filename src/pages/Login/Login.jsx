// Rsuite imports

import {
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Input,
  Notification,
  useToaster,
} from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import QrcodeIcon from "@rsuite/icons/Qrcode";


// React imports

import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import useAuth from "../../customHooks/useAuth";
import { API_URL }  from "../../../config";


function Login() {
  //React router
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/tracker';

  //RSUITE
  const toaster = useToaster();
  const [visible, setVisible] = useState(false);

  const handleLogin = async (e, event) => {
    const credentials = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };

    const response = await axios.post(
      `http://${API_URL}/api/login`,
      credentials
    );

    if (response.data.loginStatus) {

      const accessToken = response.data.accessToken
      const username = response.data.user

      sessionStorage.setItem("a_t_l_p", accessToken);
      sessionStorage.setItem("username", username)

      //Setting access token
      setAuth({accessToken})

      navigate(from, { replace: true });
    } else {
      const loginError = (
        <Notification type="error" header="No se pudo iniciar sesión">
          <p>{response.data.message}</p>
        </Notification>
      );

      toaster.push(loginError);
    }
  };

  const handleChange = () => {
    setVisible(!visible);
  };

  return (
    <div className="login-container">
      <Row>
        <Col md={12} sm={12}>
          <div className="login-card">
            <h3 className="login-card-title">QR-Tracker</h3>
            <QrcodeIcon className="qr-icon" />

            <Form className="login-form" onSubmit={handleLogin}>
              <Form.Group controlId="email">
                <Form.ControlLabel>E-mail</Form.ControlLabel>
                <Form.Control name="email" type="email" required />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.ControlLabel>Contraseña</Form.ControlLabel>
                <InputGroup inside className="pass-group">
                  <Input
                    type={visible ? "text" : "password"}
                    required
                    name="password"
                  />
                  <InputGroup.Button onClick={handleChange}>
                    {visible ? <EyeIcon /> : <EyeSlashIcon />}
                  </InputGroup.Button>
                </InputGroup>
              </Form.Group>

              <Button appearance="primary" block type="submit">
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
