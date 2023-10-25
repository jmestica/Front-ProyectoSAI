import axios from "axios";
import TopBar from "../../components/TopBar/TopBar";
import "./GestionarPieza.css";

import { useNavigate } from "react-router-dom";

import {
  Form,
  Input,
  InputGroup,
  Notification,
  useToaster,
  Button,
} from "rsuite";

function GestionarPieza() {
  const navigate = useNavigate();
  const toaster = useToaster();

  const handleSubmit = async (e, event) => {

    const ID_Pieza =
      event.target.elements.ID_Pieza_Pre.value.toUpperCase() +
      "-" +
      event.target.elements.ID_Pieza_Suf.value;

    const found = await axios.get(`http://192.168.0.130:4000/api/pieza/${ID_Pieza}`)

    if (found.data.id_pieza) {

      navigate(`/tracker/gestionarpieza/${ID_Pieza}`)


    } else {
      toaster.push(notFound, { placement: "bottomCenter" });
    }
  };

  const notFound = (
    <Notification
      header="El identificador de pieza es inválido"
      closable
      type="error"
    >
      No se encontró ninguna pieza con ese identificador, por favor, verifiquelo
      e intente nuevamente
    </Notification>
  );

  return (
    <div>
      <TopBar />

      <div className="section">
        <h3 className="section-title"> Gestionar pieza</h3>
        <p className="desc">Introduzca el identificador para gestionarla.</p>
        <Form onSubmit={handleSubmit}>
          <br />
          <InputGroup id="ID_Pieza">
            <Input name="ID_Pieza_Pre" required />
            <InputGroup.Addon> - </InputGroup.Addon>
            <Input type="number" name="ID_Pieza_Suf" required />
          </InputGroup>

          <br />
          <Button appearance="primary" block type="submit">
            {" "}
            Buscar pieza
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default GestionarPieza;
