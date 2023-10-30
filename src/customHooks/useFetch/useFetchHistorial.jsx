/*Este hook trae la info completa de un reactivo*/

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, PORT } from "../../../config";

export const useFetchHistorial = () => {

    const [historial, setHistorial] = useState([]);
    const [contador, setContador] = useState(1);

    const params = useParams();

    const fetchHistorial = async () => {

        try {
            const res = await axios.get(
                `http://${API_URL}:${PORT}/api/reactivo/historial/${params.id}`
            );

            if (res.statusText !== "OK") {
                console.log(res);    
                return;
            }

            // Asigna el n° de fila al contador y luego ++ el contador.
            const historialData = res.data.map((item, index) => ({
                ...item,
                index: contador + index,
                fechaFormateada: new Date(`${item.registro_consumo}`).toLocaleDateString()
            }));
            setHistorial(historialData);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchHistorial();
    }, [])

    return {
        historial
    }
};

