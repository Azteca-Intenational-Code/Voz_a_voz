import { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const LenguageDetection = createContext();

export default function LenguageDetectionProvider(props) {

  const [lenguage, setLenguage] = useState('')
  const [lenguageToTranslate, setLenguageToTranslate] = useState('es')
  const [lenguageVoice, setLenguageVoice] = useState(0)

  let API_KEY = "97085e06eabf6dee089edfe7ba3b0c05"

  function LenguageDetectionResult(text) {
    let data = JSON.stringify({
      "q": text
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://ws.detectlanguage.com/0.2/detect',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        setLenguage(response.data.data.detections[0].language);
        console.log("lenguaje detectado:" + response.data.data.detections[0].language);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {

    if (lenguage == "es") {
      setLenguageToTranslate("en")
    } else if (lenguage == "en") {
      setLenguageToTranslate("es")

    }
  }, [lenguage])

  useEffect(() => {

    if (lenguage == "es") {
      setLenguageVoice(2)
    } else if (lenguage == "en") {
      setLenguageVoice(0)    }
  }, [lenguageToTranslate])

  return (
    <LenguageDetection.Provider value={{
      LenguageDetectionResult,
      lenguage,
      lenguageToTranslate,
      lenguageVoice
    }}>
      {props.children}
    </LenguageDetection.Provider>
  )
}
