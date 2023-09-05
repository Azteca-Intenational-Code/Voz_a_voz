import { createContext, useState } from 'react'
import axios from 'axios';

export const GptTranslate = createContext();

export default function GptTranslateProvider(props) {


  // asignacion de variables con las variables de entorno
  const URL_API = import.meta.env.VITE_URL_API
  const API_KEY = import.meta.env.VITE_API_KEY_GPT
  const PROMPT = import.meta.env.VITE_PROMPT
  const GPT_MODEL = import.meta.env.VITE_GPT_MODEL

  // definicion de la url a la cual axios hara la consulta
  axios.defaults.baseURL = URL_API

  // variables
  const [transcriptTrans, setTranscriptTrans] = useState('')

  // ejecucion del llamado a la api
  function gpt(text) {

    // creacion de la data que se va a enviar a la api
    const requestData = {
      model: GPT_MODEL,
      messages: [
        {
          role: 'user',
          content: `${PROMPT} : ${text}`
        }
      ]
    };

    // configuracion de axios para el llamado
    axios.post(URL_API, requestData, {
      headers: {
        'OpenAI-Organization': 'org-3GiN4NlN9B1iST7y0ZPcEVYx',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    })
      .then(response => {
        setTranscriptTrans(response.data.choices[0].message.content);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // obtiene el texto campturado por voz y lo pasa por la api
  function translateText() {
    let transcript = document.getElementById('trancription')

    let valorParrafo = transcript.textContent;

    if (valorParrafo != '') {
      googleTrans(valorParrafo)
    }
  }

  return (
    <GptTranslate.Provider value={{
      transcriptTrans,
      translateText
    }}>
      {props.children}
    </GptTranslate.Provider>
  )
}
