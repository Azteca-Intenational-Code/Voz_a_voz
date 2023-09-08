import { createContext, useContext, useEffect, useState } from 'react'
import { LenguageDetection } from './LenguageDetection';
import { GoogleTranslate } from './GoogleTranslate';
import { SpeechRecognitionClientContext } from './SpeechRecognition/SpeechRecognitionClient';

export const SpeechGenerator = createContext();

export default function SpeechGeneratorProvider(props) {

  const { startListening } = useContext(SpeechRecognitionClientContext)
  const { lenguageVoice } = useContext(LenguageDetection)
  const { transcriptTrans } = useContext(GoogleTranslate)

  const [clientVoice, setClientVoice] = useState(false)

  //Inicializacion de variables
  let speech = new SpeechSynthesisUtterance();
  let voices = [];

  useEffect(() => {
    voices = window.speechSynthesis.getVoices();
  }, [lenguageVoice])

  //Monitorizacion del texto traducido
  useEffect(() => {
    console.log(clientVoice)
    if (clientVoice) {
      speech.text = transcriptTrans
      speech.voice = voices[5];
      speech.rate = 2
      window.speechSynthesis.speak(speech)
    }
  }, [transcriptTrans])

  useEffect(() => {
    //Evento de click al boton de start para la voz
    document.getElementById("speack").addEventListener("click", () => {
      window.speechSynthesis.speak(speech)
      startListening()
    });

  }, [])

  return (
    <SpeechGenerator.Provider value={{
      clientVoice,
      setClientVoice
    }}>
      {props.children}
    </SpeechGenerator.Provider>
  )
}
