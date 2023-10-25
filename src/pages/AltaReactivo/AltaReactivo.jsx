import {
  Button,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Notification,
  useToaster
} from "rsuite";
import React from "react";

import TopBar from "../../components/TopBar/TopBar";
import "./AltaReactivo.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import API_URL from "../../../config"


// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));



function AltaReactivo() {
  const navigate = useNavigate();
  const toaster = useToaster();
  
  const errorMessage = (
    <Notification type="error" header="Error en la creación" closable>

    </Notification>
  );


  const crearReactivo = async (e, event) => {
    //Generación de código
    let nombre = event.target.elements.nombre.value;
    let vendedor = event.target.elements[6].defaultValue;
    let time = Date.now();

    let id = `${nombre.slice(0, 3).toUpperCase()}${vendedor
      .slice(0, 2)
      .toUpperCase()}-${time.toString().slice(-4)}`;

    const nuevoReactivo = {

    };

    
    const response = await axios.post(`http://${API_URL}:${PORT}/api/reactivo/`, nuevoReactivo)

      if(response.status === 200){

          navigate(`/tracker/qr/${id}`);

      } else{

        toaster.push(errorMessage,{placement: 'topCenter'});

      }


  
  };

  return (
    <div>
      <TopBar />
      <div className="section">
        <h3 className="section-title"> Dar de alta reactivo</h3>
        <p className="desc">
          Completá todos los campos para dar de alta un reactivo. Una vez
          completado, se generará el código QR para que puedas imprimir y
          gestionarla.
        </p>

        <div className="form-container">
          <Form fluid onSubmit={crearReactivo}>
            <Form.Group controlId="nombre">
              <Form.ControlLabel>Nombre de reactivo</Form.ControlLabel>
              <Form.Control name="nombre" required />
            </Form.Group>
            
            <Form.Group controlId="fecha_vto">
              <Form.ControlLabel>Fecha de Vencimiento</Form.ControlLabel>

              <DatePicker
                className="select-vendedor"
                name="fecha_compra"
                format="dd-MM-yyyy"
                placeholder="Selecciona la fecha de vencimiento"
                required
                placement="auto"
              />
            </Form.Group>

            <Form.Group controlId="cantidad">
              <Form.ControlLabel>Cantidad</Form.ControlLabel>

              <div className="row-input">
                <InputNumber name="cantidad" />
                <Input plaintext value="Mililitros" className="input-plain"/>             
              </div>
   
            </Form.Group>

            <Form.Group controlId="nro_lote">
              <Form.ControlLabel>Número de Lote</Form.ControlLabel>
              <InputNumber name="nro_lote" required />
            </Form.Group>

            <Form.Group controlId="numero_expediente">
              <Form.ControlLabel>Número de Expediente</Form.ControlLabel>
              <Form.Control name="numero_expediente" required />
            </Form.Group>

            
            <Form.Group controlId="vendedor">
              <Form.ControlLabel>Marca</Form.ControlLabel>
              <Form.Control name="marca" required />
            </Form.Group>


            <Form.Group controlId="conservacion">
              <Form.ControlLabel>Condiciones de Conservación</Form.ControlLabel>
              <Form.Control name="conservacion" required />
            </Form.Group>

            <Form.Group controlId="observaciones">
              <Form.ControlLabel>Observaciones</Form.ControlLabel>
              <Form.Control
                rows={2}
                name="observaciones"
                accepter={Textarea}
                required
              />

            <Form.HelpText> <b> Reactivo Registrado según FITGE 018.01.01 - Versión 001 - VIGENCIA DESDE: 01/01/2023</b></Form.HelpText>

            </Form.Group>




            <Button block appearance="primary" type="submit" className="main-btn">
              Dar de Alta Pieza
            </Button>
            

          </Form>
        </div>
      </div>
    </div>
  );
}

export default AltaReactivo;

