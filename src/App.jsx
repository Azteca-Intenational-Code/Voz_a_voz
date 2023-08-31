import './App.css'
import 'regenerator-runtime/runtime';
import { useState, useEffect, useContext } from 'react'
import { SpeechRecognitionContext } from './modules/SpeechRecognition.jsx';
import { GoogleTranslate } from './modules/GoogleTranslate';
import { LenguageDetection } from './modules/LenguageDetection';

function App() {

  const TIME_SILENCE = import.meta.env.VITE_TIME_SILENCE

  const [time, setTime] = useState(TIME_SILENCE)

  const { LenguageDetectionResult } = useContext(LenguageDetection)
  const { translateApi, transcriptTrans } = useContext(GoogleTranslate)
  const { transcript, resetTranscript, SpeechRecognition } = useContext(SpeechRecognitionContext)

  const [controlHabla, setControlHabla] = useState(false)
  const [controlDetectionLenguage, setControlDetectionLenguage] = useState(true)

  const [textContainer, setTextContainer] = useState('')
  const [timeoutId, setTimeoutId] = useState('')

  // manejo de la variable de control de habla y obtencion del texto impreso
  useEffect(() => {

    setControlHabla(true);
    clearTimeout(timeoutId) // reinicio del contador en los timpos de silencio
    let transcriptLabel = document.getElementById('trancription')
    setTextContainer(transcriptLabel.textContent);

  }, [transcript])

  // al terminar cada insercion de habla cambiar de estado la variable de control
  useEffect(() => {
    setControlHabla(false);
  }, [textContainer])

  // manejo para traduccion despues de un tiempo condifurado
  useEffect(() => {
    let id = setTimeout(() => { // inicializacion del contador
      if (!controlHabla) {
        if (controlDetectionLenguage && textContainer != '') {
          console.log(transcript)
          LenguageDetectionResult(transcript)
          setControlDetectionLenguage(false) //Funcion de deteccion de lenguaje 
        }
        translateApi(textContainer) //Funcion de traduccion
        resetTranscript()
      }
    }, time);

    setTimeoutId(id) //id del contador 
  }, [controlHabla])

  return (
    <>
      <div className="container">
        <div>
          <p id='trancription' >{transcript}</p>
          <p id='transcriptTrans' >{transcriptTrans}</p>

          <button type="button" onClick={() => SpeechRecognition.stopListening()}>STOP</button>

          <button id='speack'>START</button>

        </div>
      </div >
    </>
  );
}

export default App