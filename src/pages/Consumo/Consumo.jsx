import { useNavigate, useParams } from "react-router-dom"
import TopBar from "../../components/TopBar/TopBar"
import "./Consumo.css"
import { Button, Form, useToaster, Notification, InputNumber } from "rsuite"
import axios from "axios"
import { API_URL, PORT } from "../../../config";
import { useFetchUltimoConsumo } from "../../customHooks/useFetch/useFetchUltimoConsumo"
import { useFetchReactivo } from "../../customHooks/useFetch/useFetchReactivo"


function Consumo() {

  const { cantidadActual } = useFetchUltimoConsumo();
  const { infoReactivo } = useFetchReactivo();
  const params = useParams();
  const toaster = useToaster();
  const navigate = useNavigate();


  const successNotification = (
    <Notification header="Se insertó con éxito" type="success">
      <p>El consumo se registró exitosamente</p>
    </Notification>
  );

  const successFinished = (
    <Notification header='Reactivo finalizado' type='succes'>
      <p>Se añadió correctamente la fecha de finalización del reactivo.</p>
    </Notification>
  );

  const successNotFinished = (
    <Notification header='Reactivo finalizado' type='error'>
      <p>Ocurrió un error al registrar la fecha de finalización del reactivo.</p>
    </Notification>
  );

  const errorNotification = (
    <Notification header="No se pudo insertar el consumo" type="error">
      <p>
        El consumo no se pudo registrar, verifique los datos o intente de
        nuevo en unos segundos
      </p>
    </Notification>
  );

  const handleSubmit = async (e, event) => {

    const fecha_actual = new Date().toLocaleDateString();

    const cant_ingresada = event.target.elements.cantidad_usada.value
    let cant_reactivo = cantidadActual || infoReactivo.cantidad

    if (cant_reactivo - cant_ingresada >= 0 && cant_ingresada > 0) {

      const nuevoConsumo = {
        codigo: params.id,
        cantidad_usada: cant_ingresada,
        registro_consumo: fecha_actual,
        nombre_usuario: sessionStorage.getItem("username"),
        cantidad_actual: cantidadActual != null ? cantidadActual - event.target.elements.cantidad_usada.value : infoReactivo.cantidad - event.target.elements.cantidad_usada.value
      };

      //controla si el stock llega a cero para marcar como finalizado el reactivo.
      if (nuevoConsumo.cantidad_actual === 0) {
        const response = await axios.put(`http://${API_URL}/api/reactivo/finished/${params.id}`);

        response.status === 200 
        ? toaster.push(successFinished, { placement: "topCenter" }) 
        : toaster.push(successNotFinished, { placement: "topCenter" })
      }

      const res = await axios.post(
        `http://${API_URL}/api/reactivo/consumo/${params.id}`,
        nuevoConsumo
      );

      if (res.data.success) {

        event.target.reset()
        navigate(`/tracker/historial/${params.id}`, { replace: true });
        toaster.push(successNotification, { placement: "topCenter" });

      } else {
        toaster.push(errorNotification, { placement: "topCenter" });
      }

    } else {

      toaster.push(errorNotification, { placement: "topCenter" });
    }
  };


  return (
    <>
      <TopBar />

      <div className="movimiento-content">
        <h4 className="section-title">Agregar consumo - {params.id}</h4>

        <div className="form-container">

          <Form onSubmit={handleSubmit} fluid>

            <Form.Group controlId="cantidad_usada">
              <Form.ControlLabel>Cantidad (ml)</Form.ControlLabel>
              <Form.Control accepter={InputNumber} name="cantidad_usada" required />
              <Form.HelpText>Cantidad actual: {cantidadActual != null ? cantidadActual : infoReactivo.cantidad} ml</Form.HelpText>
            </Form.Group>

            <Button type="submit" appearance="primary" block>
              {" "}
              Agregar consumo
            </Button>
          </Form>
        </div>

      </div>
    </>
  );
}

export default Consumo;
