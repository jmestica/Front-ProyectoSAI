import TopBar from "../../components/TopBar/TopBar";
import { useParams } from "react-router-dom";
import { Button } from "rsuite";

import "./QRPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, PORT } from "../../../config";

function QRPage() {
  const params = useParams();

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

  return (
    <div>
      <TopBar />

      <div className="print-container">
        <h4 className="id">CÓDIGO DE REACTIVO: {params.id}</h4>

        <img
          src={QRCode}
          style={{ width: "20rem" }}
          className="QRCode"
        />


        <Button
          appearance="primary"
          className="print-button no-print"
          onClick={handlePrint}
        >
          Imprimir QR
        </Button>
      </div>
    </div>
  );
}

export default QRPage;
