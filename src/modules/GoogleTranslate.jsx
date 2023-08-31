import { createContext, useState } from 'react'
import axios from 'axios';
import FormData from "form-data";

export const GoogleTranslate = createContext();

export default function GoogleTranslateProvider(props) {

  const [transcriptTrans, setTranscriptTrans] = useState('')

  function translateApi(text) {
    let data = new FormData();
    data.append('source_lang', 'auto');
    data.append('target_lang', 'en');
    data.append('text', text);
  
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');  // Ajusta el tipo de contenido según corresponda
  
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://script.google.com/macros/s/AKfycbwPCIBiDxidPDzTRDpS19XGBB7Iy7uGNr-DQFMxDws5EPS3pYiyyrTCHphgN9NRXhJL/exec',
      headers: headers,  // Usar el objeto Headers creado
      data: data  // Usar el objeto FormData
    };
  
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
