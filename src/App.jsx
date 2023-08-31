import './App.css'
import 'regenerator-runtime/runtime';
import { useState, useEffect, useContext } from 'react'
import { SpeechRecognitionContext } from './modules/SpeechRecognition.jsx';
import { GptTranslate } from './modules/GptTranslate';
import { GoogleTranslate } from './modules/GoogleTranslate';

function App() {

  // const { transcriptTrans } = useContext(GptTranslate)
  const { translateApi, transcriptTrans } = useContext(GoogleTranslate)
  const { transcript, startListening, resetTranscript, SpeechRecognition } = useContext(SpeechRecognitionContext)

  const [controlHabla, setControlHabla] = useState(false)
  const [textContainer, setTextContainer] = useState('')
  const [time, setTime] = useState(1000)
  const [timeoutId, setTimeoutId] = useState('')

  // Inicializacion del metodo de busqueda
  useEffect(() => {
    startListening()
  }, [])

  // manejo de la variable de control de habla y obtencion del exto impreso
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
          <p>{transcriptTrans}</p>

          <button type="button" onClick={() => SpeechRecognition.stopListening()}>STOP</button>

        </div>
      </div>
    </>
  );
}

export default App