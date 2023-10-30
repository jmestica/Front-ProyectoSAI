import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, PORT } from "../../../config";

export const useFetchUltimoConsumo = () => {

    const [cantidadActual, setcantidadActual] = useState(null);
    const params = useParams();

    const fetchUltimoConsumo = async () => {

        try {
            const res = await axios.get(
                `http://${API_URL}:${PORT}/api/reactivo/ultimo-consumo/${params.id}`
            );

            if (res.statusText !== "OK") return;
            
            const { cantidad_actual }  = res.data; 
            cantidad_actual ? setcantidadActual(cantidad_actual) : null;

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUltimoConsumo();
    }, [])

    return {
        cantidadActual
    }
}

