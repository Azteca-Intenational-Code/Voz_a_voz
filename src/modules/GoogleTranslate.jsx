import { createContext, useState, useContext } from 'react'
import axios from 'axios';
import { LenguageDetection } from './LenguageDetection';
import { Speech_IAContext } from './Speech_IA';

export const GoogleTranslate = createContext();

export default function GoogleTranslateProvider(props) {

  //uso de variables de entorno
  const API_URL_TRANSLATOR = import.meta.env.VITE_API_URL_TRANSLATOR

  const { lenguageToTranslate } = useContext(LenguageDetection)
  const { ai_speak } = useContext(Speech_IAContext)  

  const [transcriptTrans, setTranscriptTrans] = useState('')

  function translateApi(text) {
    axios({
      method: "POST",
      url: API_URL_TRANSLATOR,
      headers: {
        "Content-Type": "application/json", // Configura el tipo de contenido como JSON
      },
      data: JSON.stringify({
        target_lang: lenguageToTranslate,
        text: text,
      }),
    })
      .then((response) => {
        ai_speak(response.data.translatedText)
        setTranscriptTrans(response.data.translatedText)
      })
      .catch((error) => {
        console.error(error);
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
