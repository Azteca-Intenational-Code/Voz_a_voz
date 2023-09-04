import './App.css'
import 'regenerator-runtime/runtime';
import { useState, useEffect, useContext } from 'react'
import { SpeechRecognitionContext } from './modules/SpeechRecognition.jsx';
import { GoogleTranslate } from './modules/GoogleTranslate';
import { LenguageDetection } from './modules/LenguageDetection';
import { Speech_IAContext } from './modules/Speech_IA';

function App() {

  const TIME_SILENCE = import.meta.env.VITE_TIME_SILENCE

  const [time, setTime] = useState(TIME_SILENCE)

  const { LenguageDetectionResult } = useContext(LenguageDetection)
  const { translateApi, transcriptTrans } = useContext(GoogleTranslate)
  const { transcript, resetTranscript, SpeechRecognition } = useContext(SpeechRecognitionContext)
  const { all } = useContext(Speech_IAContext)

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

  useEffect(()=>{
    all()
  },[])

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10" >

        <div>
          <h1>VOZ A VOZ</h1>
        </div>

        <div className='flex gap-10'>
          <div className='flex flex-col text-center gap-5'>
            <h2>DETECCION</h2>
            <p className='flex bg-slate-900 min-h-[30vh] min-w-[50vh] items-center justify-center' id='trancription' >{transcript}</p>
          </div>
          <div className='flex flex-col text-center gap-5'>
            <h2>TRADUCCION</h2>
            <p className='flex bg-slate-900 min-h-[30vh] min-w-[50vh] items-center justify-center' id='transcriptTrans' >{transcriptTrans}</p>
          </div>
        </div>

        <div className='flex gap-10'>
          <button onClick={() => SpeechRecognition.stopListening()}>STOP</button>
          <button id='speack'>START</button>
          <button class="reproductor">Reproduce tu audio</button>
        </div>

      </div>
    </>
  );
}

export default App