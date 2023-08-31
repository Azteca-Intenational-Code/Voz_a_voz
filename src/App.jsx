import './App.css'
import 'regenerator-runtime/runtime';
import { useState, useEffect, useContext } from 'react'
import { SpeechRecognitionContext } from './modules/SpeechRecognition.jsx';
import { GoogleTranslate } from './modules/GoogleTranslate';

function App() {

  const TIME_SILENCE = import.meta.env.VITE_TIME_SILENCE

  const { translateApi, transcriptTrans } = useContext(GoogleTranslate)
  const { transcript, resetTranscript, SpeechRecognition } = useContext(SpeechRecognitionContext)

  const [controlHabla, setControlHabla] = useState(false)
  const [textContainer, setTextContainer] = useState('')
  const [time, setTime] = useState(TIME_SILENCE)
  const [timeoutId, setTimeoutId] = useState('')

  // // Inicializacion del metodo de busqueda
  // useEffect(() => {
  //   startListening()
  // }, [])

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
      if (controlHabla == false) {
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