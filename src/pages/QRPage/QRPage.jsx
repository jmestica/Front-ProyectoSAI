import TopBar from "../../components/TopBar/TopBar";
import { useParams } from "react-router-dom";
import { Button, Notification, useToaster } from "rsuite";

import "./QRPage.css";
import { useEffect, useState } from "react";
import { usePrint } from "../../customHooks/PrintContext";
import { useDrawer } from "../../customHooks/DrawerContext";

import axios from "axios";
import { API_URL, PORT } from "../../../config";
import EtiquetaQR from "../../components/EtiquetaQR/EtiquetaQR";

function QRPage() {
  const params = useParams();
  const { incrementPrint, updatePrintList } = usePrint();
  const { openDrawer } = useDrawer();
  const toaster = useToaster();

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
    const listaLocalStorage = localStorage.getItem("lista_impresion");

    // Si no existe, inicializar la lista como un array vacío
    if (!listaLocalStorage) {
      localStorage.setItem("lista_impresion", JSON.stringify([]));
    }

    // Código de reactivo a inicializar
    const nueva_etiqueta = {
      codigo_reactivo: params.id,
      qr_code: QRCode,
    };

    const listaActual = JSON.parse(localStorage.getItem("lista_impresion"));

    const etiquetaExistente = listaActual.find(
      (etiqueta) => etiqueta.codigo_reactivo === nueva_etiqueta.codigo_reactivo
    );

    if (!etiquetaExistente) {
      listaActual.push(nueva_etiqueta);

      localStorage.setItem("lista_impresion", JSON.stringify(listaActual));

      incrementPrint();

      updatePrintList(listaActual);

      openDrawer();
    } else {
      toaster.push(
        <Notification closable>
          <p>La etiqueta ya está en la lista de impresión</p>
        </Notification> , {type: 'error'}
      );
      console.log("La etiqueta ya existe en la lista de impresión.");
    }
  };

  return (
    <div>
      <TopBar />

      <div className="print-container">
        <h4 className="id no-print">Etiqueta de reactivo</h4>

        {/* etiqueta QR */}
        <EtiquetaQR qr_code={QRCode} id={params.id} />

        <Button
          appearance="primary"
          className="print-button no-print"
          onClick={handlePrint}
          style={{ marginTop: "20px" }}
        >
          Imprimir etiqueta individualmente
        </Button>

        <Button
          appearance="primary"
          color="green"
          className="print-button no-print"
          onClick={agregarLista}
        >
          Agregar a lista de impresión
        </Button>
      </div>
    </div>
  );
}

export default QRPage;
