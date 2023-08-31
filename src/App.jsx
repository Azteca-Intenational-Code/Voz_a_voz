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


  useEffect(() => {
    startListening()
  }, [])


  useEffect(() => {

    setControlHabla(true);
    clearTimeout(timeoutId)
    let transcript = document.getElementById('trancription')
    setTextContainer(transcript.textContent);

  }, [transcript])

  useEffect(() => {

    setControlHabla(false);

  }, [textContainer])



  useEffect(() => {

    let id = setTimeout(() => {
      if (controlHabla == false) {
        translateApi(textContainer)
        setTextContainer("")
      }
    }, time);

    setTimeoutId(id)

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