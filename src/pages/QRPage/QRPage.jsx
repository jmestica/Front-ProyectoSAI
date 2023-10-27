import TopBar from "../../components/TopBar/TopBar";
import { useParams } from "react-router-dom";
import { Button } from "rsuite";


import "./QRPage.css";
import { useEffect, useState } from "react";
import { usePrint } from "../../customHooks/PrintContext";
import { useDrawer } from '../../customHooks/DrawerContext';


import axios from "axios";
import { API_URL, PORT } from "../../../config";

function QRPage() {
  const params = useParams();
  const { incrementPrint, updatePrintList } = usePrint();
  const { openDrawer } = useDrawer();

  const [QRCode, setQRCode] = useState("");

  useEffect(() => {
    async function fetchQRCode() {
      try {
        const response = await axios.get(
          `http://${API_URL}:${PORT}/api/reactivo/getQR/${params.id}`
        );

        setQRCode(response.data.qr_code);
      } catch (error) {
        console.log(error);
      }
    }

    fetchQRCode();
  }, [params.id]);

  const handlePrint = () => {
    window.print();

  };

  const agregarLista = () => {

    // Verificar si está creada la lista de impresión
    const listaLocalStorage = localStorage.getItem('lista_impresion');

    // Si no existe, inicializar la lista como un array vacío
    if (!listaLocalStorage) {
      localStorage.setItem('lista_impresion', JSON.stringify([]));
    }

    // Código de reactivo a inicializar 
    const nueva_etiqueta = {
      codigo_reactivo: params.id
     }

     const listaActual = JSON.parse(localStorage.getItem('lista_impresion'));

     const etiquetaExistente = listaActual.find(etiqueta => etiqueta.codigo_reactivo === nueva_etiqueta.codigo_reactivo);

      if(!etiquetaExistente) {

        listaActual.push(nueva_etiqueta);

        localStorage.setItem('lista_impresion', JSON.stringify(listaActual));
   
        incrementPrint();

        updatePrintList(listaActual)

        openDrawer();
   
      } else {

        console.log('La etiqueta ya existe en la lista de impresión.');

      }


  }



  return (
    <div>
      <TopBar />

      <div className="print-container">
        <h4 className="id">Etiqueta de reactivo</h4>
        <div className="etiqueta-qr">
          <h4 className="codigo-reactivo">{params.id}</h4>

          <div className="img-container">
          <img src={QRCode} style={{ width: "20rem" }} className="QRCode" />

          </div>
          <div className="vencimiento">
           
              <p>VTO</p>
                
              <div className="checks">
              <div className="check-container">
                   <div className="check">  </div>
                   <p>90</p>
              </div>
              <div className="check-container">
                   <div className="check">  </div>
                   <p>60</p>
              </div>
              <div className="check-container">
                   <div className="check">  </div>
                   <p>30</p>
              </div>
            </div>
          </div>
        </div>

        <Button
          appearance="primary"
          className="print-button no-print"
          onClick={handlePrint}
          style={{marginTop: '20px'}}
        >
          Imprimir etiqueta individualmente
        </Button>
     
        <Button appearance="primary" color="green" className="print-button" onClick={agregarLista}>
          Agregar a lista de impresión
        </Button>
      </div>
    </div>
  );
}

export default QRPage;
