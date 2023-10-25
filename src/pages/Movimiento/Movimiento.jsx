import React from "react"
import { useParams } from "react-router-dom"
import TopBar from "../../components/TopBar/TopBar"
import "./Movimiento.css"
import { Button, Form, Input, useToaster, Notification } from "rsuite"
import axios from "axios"

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
))

function Movimiento() {
  const params = useParams()
  const toaster = useToaster()

  const successNotification = (
    <Notification header="Se insertó con éxito" type="success">
      <p>El movimiento se insertó exitosamente</p>
    </Notification>
  );

  const errorNotification = (
    <Notification header="No se pudo insertar el movimiento" type="error">
      <p>
        El movimiento no se pudo insertar, verifique los datos o intente de
        nuevo en unos segundos
      </p>
    </Notification>
  );

  const handleSubmit = async (e, event) => {
    const fecha_actual = new Date().toLocaleDateString();
    const hora_actual = new Date().toLocaleTimeString().slice(0, 5);

    const nuevoMovimiento = {
      id_pieza: params.id,
      accion: event.target.elements.accion.value,
      datos_adicionales: event.target.elements.descripcion.value,
      fecha: fecha_actual,
      hora: hora_actual,
      nombre_usuario: sessionStorage.getItem("username"),
    };

    const res = await axios.post(
      `http://192.168.0.130:4000/api/pieza/movimiento/${params.id}`,
      nuevoMovimiento
    );

    event.target.reset()

    res.data.success?  toaster.push(successNotification, {placement: 'topCenter'}) : toaster.push(errorNotification, {placement: 'topCenter'});
    
  };

  return (
    <>
      <TopBar />

      <div className="movimiento-content">
        <h4 className="section-title">Agregar movimiento - {params.id}</h4>

        <div className="form-container">
          <Form onSubmit={handleSubmit} fluid>
            <Form.Group controlId="accion">
              <Form.ControlLabel>Descripción del movimiento</Form.ControlLabel>
              <Form.Control name="accion" required />
            </Form.Group>

            <Form.Group controlId="descripcion">
              <Form.ControlLabel>
                Datos adicionales (opcional)
              </Form.ControlLabel>
              <Form.Control rows={3} name="descripcion" accepter={Textarea} />
            </Form.Group>

            <Button type="submit" appearance="primary" block>
              {" "}
              Agregar Movimiento
            </Button>
          </Form>
        </div>

      </div>
    </>
  );
}

export default Movimiento;
