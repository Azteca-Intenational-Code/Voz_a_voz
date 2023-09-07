import { createContext, useContext, useEffect } from 'react'
import { LenguageDetection } from './LenguageDetection';
import { GoogleTranslate } from './GoogleTranslate';
import { SpeechRecognitionClientContext } from './SpeechRecognition/SpeechRecognitionClient';

export const SpeechGenerator = createContext();

export default function SpeechGeneratorProvider(props) {

  const { startListening } = useContext(SpeechRecognitionClientContext)
  const { lenguageVoice } = useContext(LenguageDetection)
  const { transcriptTrans } = useContext(GoogleTranslate)

  //Inicializacion de variables
  let speech = new SpeechSynthesisUtterance();
  let voices = [];

  useEffect(() => {
    //inicializacion de modulo de voz
    // window.speechSynthesis.onvoiceschanged = () => {
    //   voices = window.speechSynthesis.getVoices();
    //   speech.voice = voices[lenguageVoice];
    //   speech.rate = '1'
    // };
    voices = window.speechSynthesis.getVoices();
    console.log(voices)
  }, [lenguageVoice])

  //Monitorizacion del texto traducido
  useEffect(() => {
    speech.text = transcriptTrans
    speech.voice = voices[5];
    speech.rate = 2
    window.speechSynthesis.speak(speech)
  }, [transcriptTrans])


  useEffect(() => {
    //Evento de click al boton de start para la voz
    document.getElementById("speack").addEventListener("click", () => {
      window.speechSynthesis.speak(speech)
      startListening()
    });

  }, [])

  return (
    <SpeechGenerator.Provider value={{}}>
      {props.children}
    </SpeechGenerator.Provider>
  )
}
