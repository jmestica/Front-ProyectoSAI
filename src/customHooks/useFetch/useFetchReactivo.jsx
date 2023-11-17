/*Este hook trae la info completa de un reactivo*/

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL} from "../../../config";


export const useFetchReactivo = () => {

    const params = useParams();

    const [infoReactivo, setInfoReactivo] = useState([])

    const fetchReactivo = async () => {

        try {
            const res = await axios.get(
                `http://${API_URL}/api/reactivo/${params.id}`
            );

            if (res.statusText !== "OK") {
                console.log(res);
                return;
            }

            const data = res.data[0];

            const datosReactivo = {
                ...data,
                fechaIngresoFormateada: new Date(`${data.fecha_ingreso}`).toLocaleDateString(),
                fechaVtoFormateada: new Date(`${data.fecha_vto}`).toLocaleDateString()
            }

            setInfoReactivo(datosReactivo)

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchReactivo();
    }, [])

    return {
        infoReactivo
    }
};