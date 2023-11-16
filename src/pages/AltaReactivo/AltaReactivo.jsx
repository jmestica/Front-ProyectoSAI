// ===== React Suite
import {
  Button,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Notification,
  useToaster,
  SelectPicker,
} from "rsuite";

//====== React Hooks
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

//==== Componentes y Estilos
import TopBar from "../../components/TopBar/TopBar";
import "./AltaReactivo.css";
import { API_URL} from "../../../config.js";

const nombres_reactivos = [
  { label: "Acetona Grado Plaguicida", value: "ACP" },
  { label: "Acetona PA", value: "ACE" },
  {
    label: "Cloruro de Metileno Grado Plaguicida - Diclorometano",
    value: "CLO",
  },
  { label: "Éter de Petróleo Grado Plaguicida", value: "ETP" },
  { label: "Sulfato de Sodio Anhidro", value: "SUL" },
  { label: "Hexano Grado Plaguicida", value: "HEX" },
  { label: "Metanol Grado Plaguicida", value: "MET" },
].map((item) => ({ label: item.label, value: item.value }));

function AltaReactivo() {
  const navigate = useNavigate();
  const toaster = useToaster();

  const [contador, setContador] = useState(null);

  useEffect(() => {
    // Función para hacer la llamada a la API y obtener información de la codificación
    const fetchData = async () => {
      try {
        const respuesta_contador = await axios.get(
          `http://${API_URL}/api/reactivo/contador`
        );

        if (respuesta_contador.status === 200) {
          // Actualizar el estado del contador con los datos de la API
          setContador(respuesta_contador.data.numero_contador);
        } else {
          console.error("Error al obtener el contador");
        }
      } catch (error) {
        console.error("Error en la obtención del contador", error);
      }
    };

    fetchData();
  }, []);

  const crearReactivo = async (e, event) => {
    //Obtención de datos de formulario
    const formulario = event.target.elements;

    //Generación de código
    const prefijo_laboratorio = "C";
    let codigo_reactivo =
      prefijo_laboratorio + formulario.nombre.defaultValue + contador;

    //Fecha de registro
    const date = new Date();
    const fecha_registro = date.toLocaleDateString("es-AR");

    //Creación de objeto a insertar
    const nuevoReactivo = {
      codigo: codigo_reactivo,
      observaciones: formulario.observaciones.value,
      nombre_reactivo: formulario[0].nextSibling.ariaPlaceholder,
      cantidad: formulario.cantidad.value,
      fecha_vto: formulario.fecha_vto.value,
      nro_lote: formulario.nro_lote.value,
      fecha_ingreso: fecha_registro,
      nro_expediente: formulario.numero_expediente.value,
      conservacion: formulario.conservacion.value,
      fecha_finalizacion: null,
      marca: formulario.marca.value,
      fecha_descarte: null,
      contador: contador + 1,
    };



    if (nuevoReactivo.nombre_reactivo === 'Seleccione el reactivo' || !nuevoReactivo.fecha_vto) {
      toaster.push(errorMessage);
    } else {
      console.log('pass')
      const response = await axios.post(
        `http://${API_URL}/api/reactivo/`,
        nuevoReactivo
      );

      if (response.status === 200) {
        navigate(`/tracker/qr/${codigo_reactivo}`);
      } else {
        toaster.push(errorMessage, { placement: "topCenter" });
      }
    }
  };

  const errorMessage = (
    <Notification type="error" header="Error en la creación" closable>
      {" "}
      Faltan datos obligatorios{" "}
    </Notification>
  );

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
              <Form.ControlLabel>Nombre de reactivo *</Form.ControlLabel>
              <SelectPicker
                id="nombre"
                data={nombres_reactivos}
                required
                placeholder="Seleccione el reactivo"
                block
              />
            </Form.Group>

            <Form.Group controlId="fecha_vto">
              <Form.ControlLabel>Fecha de Vencimiento *</Form.ControlLabel>

              <DatePicker
                className="select-vendedor"
                name="fecha_compra"
                format="dd-MM-yyyy"
                placeholder="Selecciona la fecha de vencimiento"
                required
                id="fecha_vto"
                placement="auto"
              />
            </Form.Group>

            <Form.Group controlId="cantidad">
              <Form.ControlLabel>Cantidad *</Form.ControlLabel>

              <div className="row-input">
                <InputNumber name="cantidad" required />
                <Input plaintext value="Mililitros" className="input-plain" />
              </div>
            </Form.Group>

            <Form.Group controlId="nro_lote">
              <Form.ControlLabel>Número de Lote *</Form.ControlLabel>
              <InputNumber name="nro_lote" required />
            </Form.Group>

            <Form.Group controlId="numero_expediente">
              <Form.ControlLabel>Número de Expediente </Form.ControlLabel>
              <Form.Control name="numero_expediente" />
            </Form.Group>

            <Form.Group controlId="vendedor">
              <Form.ControlLabel>Marca *</Form.ControlLabel>
              <Form.Control name="marca" required />
            </Form.Group>

            <Form.Group controlId="conservacion">
              <Form.ControlLabel>
                Condiciones de Conservación *
              </Form.ControlLabel>
              <Form.Control name="conservacion" required />
            </Form.Group>

            <Form.Group controlId="observaciones">
              <Form.ControlLabel>Observaciones</Form.ControlLabel>
              <Form.Control rows={2} name="observaciones" accepter={Textarea} />

              <Form.HelpText> (*) Datos obligatorios </Form.HelpText>
              <Form.HelpText>
                {" "}
                <b>
                  {" "}
                  Reactivo Registrado según FITGE 018.01.01 - Versión 001 -
                  VIGENCIA DESDE: 01/01/2023
                </b>
              </Form.HelpText>
            </Form.Group>

            <Button
              block
              appearance="primary"
              type="submit"
              className="main-btn"
            >
              Dar de Alta Reactivo
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AltaReactivo;
