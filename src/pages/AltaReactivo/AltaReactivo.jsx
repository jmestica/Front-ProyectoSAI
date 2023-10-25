import {
  Button,
  Form,
  Input,
  SelectPicker,
  DatePicker,
  InputNumber,
  Modal,
  Notification,
  useToaster
} from "rsuite";
import React, { useEffect } from "react";

import TopBar from "../../components/TopBar/TopBar";
import "./AltaReactivo.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/display-name
const Textarea = React.forwardRef((props, ref) => (
  <Input {...props} as="textarea" ref={ref} />
));



function AltaReactivo() {
  const navigate = useNavigate();
  const toaster = useToaster();

  const [vendedores, setVendedores] = React.useState([]);
  const [updateList, setUpdateList] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const errorMessage = (
    <Notification type="error" header="Error en la creación" closable>

    </Notification>
  );


  useEffect(() => {

    const fetchVendedores = async () => {
      // Llamada a una función asíncrona que devuelve un array de datos
      const response = await axios.get('http://192.168.0.130:4000/api/vendedor')

      const vendedores = response.data.map((item) => ({
        label: item.nombre_vendedor,
        value: item.nombre_vendedor,
      }));
      
      setVendedores(vendedores);
    };

    fetchVendedores();
  }, []);


  /*Acá se llama a la base de datos para recuperar los vendedores
  ya que se podría haber agregado uno nuevo, además podría ser optimizado
  con un estado que verifique si alguno nuevo fue creado*/

  const updateVendedores = async () => {
    if (updateList) {
      console.log("Actualizar la lista");

      setUpdateList(false);
    }

    const response = await axios.get('http://192.168.0.130:4000/api/vendedor')

    const vendedores = response.data.map((item) => ({
      label: item.nombre_vendedor,
      value: item.nombre_vendedor,
    }));
    
    setVendedores(vendedores);


  };

  const crearVendedor = async (e, event) => {
    const nuevoVendedor = {
      nombre_vendedor: event.target.elements.nombre_vendedor.value,
      ubicacion: event.target.elements.ubicacion.value,
    };

    //Endpoint para crear vendedor
    const response = await axios.post('http://192.168.0.130:4000/api/vendedor', nuevoVendedor)

    if (response.data) {

      handleClose()
      setUpdateList(true);
     
    }


  };

  const crearReactivo = async (e, event) => {
    //Generación de código
    let nombre = event.target.elements.nombre.value;
    let vendedor = event.target.elements[6].defaultValue;
    let time = Date.now();

    let id = `${nombre.slice(0, 3).toUpperCase()}${vendedor
      .slice(0, 2)
      .toUpperCase()}-${time.toString().slice(-4)}`;

    const nuevoReactivo = {
      ID_Pieza: id,
      nombre: nombre,
      cantidad: parseFloat(event.target.elements.cantidad.value),
      unidad: event.target.elements[4].defaultValue ,
      descripcion: event.target.elements.descripcion.value,
      es_comprada: {
        nombre_vendedor: vendedor,
        fecha: event.target.elements[7].defaultValue,
        monto_compra: parseFloat(event.target.elements.monto.value),
      },
    };

    
    const response = await axios.post(`http://192.168.0.130:4000/api/pieza/`, nuevoReactivo)

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

            <Form.Group controlId="cantidad">
              <Form.ControlLabel>Cantidad</Form.ControlLabel>

              <div className="row-input">
                <InputNumber name="cantidad" />
              </div>
            </Form.Group>

            <Form.Group controlId="descripcion">
              <Form.ControlLabel>Descripción</Form.ControlLabel>
              <Form.Control
                rows={3}
                name="descripcion"
                accepter={Textarea}
                required
              />
            </Form.Group>

            <Form.Group controlId="vendedor">
              <Form.ControlLabel>Vendedor</Form.ControlLabel>
              <SelectPicker
                data={vendedores}
                onOpen={updateVendedores}
                className="select-vendedor"
                placeholder="Selecciona vendedor"
                name="vendedor"
              />
              <p className="create-vendedor">
                ¿No encontrás el vendedor que estás buscando?{" "}
                <span onClick={handleOpen} className="span-onclick">
                  {" "}
                  Hace click acá para crear uno nuevo{" "}
                </span>{" "}
              </p>
            </Form.Group>

            <Form.Group controlId="fecha_compra">
              <Form.ControlLabel>Fecha de Compra</Form.ControlLabel>

              <DatePicker
                className="select-vendedor"
                name="fecha_compra"
                format="dd-MM-yyyy"
                placeholder="Selecciona la fecha de compra"
                required
                placement="auto"
              />
            </Form.Group>

            <Form.Group controlId="monto">
              <Form.ControlLabel>Monto de Compra</Form.ControlLabel>
              <InputNumber prefix="$" name="monto" />
            </Form.Group>

            <Button block appearance="primary" type="submit">
              {" "}
              Dar de Alta Pieza
            </Button>
          </Form>
        </div>
      </div>

      <Modal open={open} onClose={handleClose} className="modal-vendedor">
        <Modal.Header>
          <Modal.Title>Añadir Vendedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid onSubmit={crearVendedor}>
            <Form.Group>
              <Form.ControlLabel>Nombre de Vendedor</Form.ControlLabel>
              <Form.Control name="nombre_vendedor" required />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Origen del Vendedor</Form.ControlLabel>
              <Form.Control name="ubicacion" required />
            </Form.Group>

            <Button type="submit" appearance="primary">
              Añadir Vendedor
            </Button>
            <Button onClick={handleClose} appearance="primary" color="red">
              Cancelar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AltaReactivo;

