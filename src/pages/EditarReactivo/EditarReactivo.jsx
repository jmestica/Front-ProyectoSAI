import {
  Form,
  SelectPicker,
  DatePicker,
  InputNumber,
  Input,
  Button,
  Notification,
  useToaster,
} from "rsuite";
import TopBar from "../../components/TopBar/TopBar";
import { useFetchReactivo } from "../../customHooks/useFetch/useFetchReactivo";
import { useParams } from "react-router-dom";
import { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import { API_URL } from "../../../config";

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

// eslint-disable-next-line react/display-name
const Textarea = forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));

const warning = (
  <Notification type="warning" header="Sin cambios" closable>
    No se detectaron cambios
  </Notification>
);

const success = (
  <Notification type="success" header="Cambios guardados" closable>
    Se guardaron exitosamente
  </Notification>
);

const error = (
  <Notification type="error" header="No se pudo guardar los cambios" closable>
    No se pudieron guardar los cambios realizados
  </Notification>
);



function EditarReactivo() {
  const params = useParams();
  const toaster = useToaster();

  const [reactivo, setReactivo] = useState();
  const [reactivoOriginal, setReactivoOriginal] = useState();
  const [changes, setChanges] = useState(false);
  const { infoReactivo } = useFetchReactivo();

  useEffect(() => {
    setReactivo(infoReactivo);
    setReactivoOriginal(infoReactivo);
  }, [infoReactivo]);

  if (!reactivo) {
    return <div>Cargando...</div>;
  }

  const handleChange = (newValue, { target }) => {
    const { id } = target;

    setReactivo((reactivo) => ({
      ...reactivo,
      [id]: newValue,
    }));

    setChanges(true);
  };

  const handleChangeDate = (newValue) => {
    setReactivo((reactivo) => ({
      ...reactivo,
      fecha_vto: newValue,
    }));

    setChanges(true);
  };

  const handleSubmit = async () => {

    if (
      !changes ||
      JSON.stringify(reactivo) === JSON.stringify(reactivoOriginal)
    ) {
      toaster.push(warning);
    } else {

      const res = await axios.patch(`http://${API_URL}/api/reactivo/${params.id}`, reactivo)


      res.status === 200 ? toaster.push(success) : toaster.push(error);

    }
  };

  return (
    <div>
      <TopBar />
      <div className="section">
        <h3 className="section-title"> Editar Reactivo - {params.id}</h3>
        <p className="desc">
          Modifica los campos del reactivo y guardalo para hacer efectivos los
          cambios
        </p>

        <div className="form-container">
          <Form fluid onSubmit={handleSubmit}>
            <Form.ControlLabel>Nombre de reactivo</Form.ControlLabel>
            <SelectPicker
              id="nombre"
              data={nombres_reactivos}
              required
              placeholder="Seleccione el reactivo"
              block
              readOnly
              defaultValue={params.id.slice(1, 4)}
            />

            <Form.Group controlId="fecha_vto" style={{ margin: "10px 0" }}>
              <Form.ControlLabel>Fecha de Vencimiento</Form.ControlLabel>

              <DatePicker
                className="select-vendedor"
                name="fecha_vto"
                format="dd-MM-yyyy"
                placeholder="Selecciona la fecha de vencimiento"
                required
                id="fecha_vto"
                placement="auto"
                value={Date.parse(reactivo.fecha_vto)}
                onChange={handleChangeDate}
              />
            </Form.Group>

            <Form.Group controlId="cantidad">
              <Form.ControlLabel>Cantidad *</Form.ControlLabel>

              <div className="row-input">
                <InputNumber
                  value={reactivo.cantidad}
                  readOnly
                  name="cantidad"
                />
                <Input plaintext value="Mililitros" className="input-plain" />
              </div>

              <Form.HelpText>
                Para registrar un consumo,
                <a href={`/tracker/consumo/${params.id}`}>
                  hacé click acá
                </a>
              </Form.HelpText>
            </Form.Group>

            <Form.Group controlId="nro_lote">
              <Form.ControlLabel>Número de Lote *</Form.ControlLabel>
              <InputNumber
                value={reactivo.nro_lote || ""}
                onChange={handleChange}
                name="nro_lote"
              />
            </Form.Group>

            <Form.Group controlId="nro_expediente">
              <Form.ControlLabel>Número de Expediente </Form.ControlLabel>
              <Form.Control
                name="nro_expediente"
                value={reactivo.nro_expediente || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="marca">
              <Form.ControlLabel>Marca</Form.ControlLabel>
              <Input
                name="marca"
                value={reactivo.marca || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="observaciones">
              <Form.ControlLabel>Observaciones</Form.ControlLabel>
              <Form.Control
                rows={2}
                value={reactivo.observaciones || ""}
                onChange={handleChange}
                name="observaciones"
                accepter={Textarea}
              />
            </Form.Group>

            <Button appearance="primary" type="submit" block>
              Guardar cambios
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditarReactivo;
