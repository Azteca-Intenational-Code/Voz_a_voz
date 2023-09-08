import { createContext, useState, useContext } from 'react'
import axios from 'axios';
import { LenguageDetection } from './LenguageDetection';
import { SpeechRecognitionOperatorContext } from './SpeechRecognition/SpeechRecognitionOperator';

export const GoogleTranslate = createContext();

export default function GoogleTranslateProvider(props) {

  const API_URL_TRANSLATOR = import.meta.env.VITE_API_URL_TRANSLATOR

  const [recordingOperator, setRecordingOperator] = useState(false)
  const [transcriptTrans, setTranscriptTrans] = useState('')

  const { lenguageToTranslate } = useContext(LenguageDetection)
  const { SpeechRecognition } = useContext(SpeechRecognitionOperatorContext)

  const [controlVista, setControlVista] = useState(null)

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
        if (controlVista == 'operator') {
          SpeechRecognition.stopListening()
        }
        setRecordingOperator(false)
        setTranscriptTrans(response.data.translatedText)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <GoogleTranslate.Provider value={{
      translateApi,
      recordingOperator,
      setRecordingOperator,
      transcriptTrans,
      controlVista,
      setControlVista
    }}>
      {props.children}
    </GoogleTranslate.Provider>
  )
}
