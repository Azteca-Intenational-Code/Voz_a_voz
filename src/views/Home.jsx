import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

    const url_client = "http://localhost:5173/client"
    const url_operator = "http://localhost:5173/operator"

    const [anchoVentanaNueva, setAnchoVentanaNueva] = useState(null)
    const [altoVentanaNueva, setAltoVentanaNueva] = useState(null)

    const btn = document.querySelector("button")

    useEffect(() => {
        const anchoVentana = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const altoVentana = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        // Calcula el ancho y alto para las dos ventanas
        setAnchoVentanaNueva(anchoVentana / 2)
        setAltoVentanaNueva(altoVentana)
    }, [])

    function windowClient() {
        let opcionesVentana1 = "width=" + anchoVentanaNueva + ",height=" + altoVentanaNueva + ",top=0,left=0";
        window.open(url_client, "Ventana1", opcionesVentana1);
        btn.click()
    }

    function windowOperator() {
        let opcionesVentana2 = "width=" + anchoVentanaNueva + ",height=" + altoVentanaNueva + ",top=0,left=100" + anchoVentanaNueva;
        window.open(url_operator, "Ventana2", opcionesVentana2);
    }

    function clickHandler() {
        windowClient()
        windowOperator()
    }

    return (
        <div className='flex flex-col gap-5'>
            <div>
                <h1>PROGRAMA VOZ A VOZ</h1>
            </div>
            <button onClick={() => clickHandler()}>
                INICIAR
            </button>
        </div>
    )
}