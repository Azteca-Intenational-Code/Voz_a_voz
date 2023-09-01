import express from "express";
import axios from "axios";
import FormData from "form-data";

const app = express();
const port = 3001; // Puedes cambiar el puerto según tus necesidades
app.use(express.json());

// Middleware para permitir solicitudes CORS desde tu aplicación React
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://translate-c2492.web.app'); // Reemplaza con la URL correcta de tu aplicación React
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Ruta para redirigir las solicitudes a tu script de Google Apps
app.post('/translate', async (req, res) => {
    try {
        const { target_lang, text } = req.body

        let data = new FormData();

        //Declaracion de variables para traduccion
        data.append('source_lang', 'auto');
        data.append('target_lang', target_lang);
        data.append('text', text);

        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');  // Ajusta el tipo de contenido según corresponda

        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: "https://script.google.com/macros/s/AKfycbwIhWD5F6-C9YH131k8dGddmnvrqNmVnWRQzMdcZuyc1GByyN2QpJYbDlTaLCuSJ_3-/exec",
            headers: headers,  // Usar el objeto Headers creado
            data: data  // Usar el objeto FormData
        };

        //ejecucion de la peticion a la api
        axios.request(config)
            .then((response) => {
                res.send(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la solicitud al servidor de traducción' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});

