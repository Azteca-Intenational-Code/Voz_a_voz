import { createContext, useState, useContext } from 'react'
import axios from 'axios';
import FormData from "form-data";
import { LenguageDetection } from './LenguageDetection';

export const GoogleTranslate = createContext();

export default function GoogleTranslateProvider(props) {

  //uso de variables de entorno
  const API_URL_TRANSLATOR = import.meta.env.VITE_API_URL_TRANSLATOR

  const { lenguageToTranslate } = useContext( LenguageDetection )

  const [transcriptTrans, setTranscriptTrans] = useState('')

  function translateApi(text) {

    console.log("Lenguaje de salida: " + lenguageToTranslate)

    let data = new FormData();

    //Declaracion de variables para traduccion
    data.append('source_lang', 'auto');
    data.append('target_lang', lenguageToTranslate);
    data.append('text', text);

    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');  // Ajusta el tipo de contenido según corresponda

    let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: API_URL_TRANSLATOR,
      headers: headers,  // Usar el objeto Headers creado
      data: data  // Usar el objeto FormData
    };

    //ejecucion de la peticion a la api
    axios.request(config)
      .then((response) => {
        setTranscriptTrans(JSON.stringify(response.data.translatedText));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <GoogleTranslate.Provider value={{
      translateApi,
      transcriptTrans
    }}>
      {props.children}
    </GoogleTranslate.Provider>
  )
}
