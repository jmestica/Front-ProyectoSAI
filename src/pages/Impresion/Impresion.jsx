import { useEffect, useState } from "react";
import "./Impresion.css";
import EtiquetaQR from "../../components/EtiquetaQR/EtiquetaQR";
import { Button } from "rsuite";
import { AiFillPrinter } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

function Impresion() {
  const [QRCodes, setQRCodes] = useState([]);

  useEffect(() => {
    const getQRs = async () => {
      try {
        // Obtener la lista del localStorage
        const listaQR = localStorage.getItem("lista_impresion");

        //Parseo
        const lista = JSON.parse(listaQR) || [];

        setQRCodes(lista);
      } catch (error) {
        console.error("Error en la obtención de la lista", error);
      }
    };

    getQRs();
  }, []);

  return (
    <>
      <div className="float-btn">
        <Button
          appearance="primary"
          className="float"
          style={{ margin: "10px 0" }}
          onClick={() => {
            window.print();
          }}
        >
          <AiFillPrinter style={{ marginRight: "10px" }} /> Imprimir
        </Button>
        <Button
          className="float"
          appearance="primary"
          color="red"
          onClick={() => {window.history.back()}}
        >
          <BiArrowBack style={{ marginRight: "10px" }} /> Atrás
        </Button>
      </div>

      <div className="hoja">
        {QRCodes.map((etiqueta) => {
          return (
            <EtiquetaQR
            style={{marginTop: "10px" }}
              key={etiqueta.codigo_reactivo}
              id={etiqueta.codigo_reactivo}
              qr_code={etiqueta.qr_code}
            />
          );
        })}
      </div>
    </>
  );
}

export default Impresion;
