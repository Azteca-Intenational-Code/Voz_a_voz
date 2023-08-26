import './App.css'
import 'regenerator-runtime/runtime';
import { useState, useEffect, useContext } from 'react'
import { GptTranslate } from './modules/GptTranslate.jsx';
import { SpeechRecognitionContext } from './modules/SpeechRecognition.jsx';

function App() {

  const { transcriptTrans } = useContext(GptTranslate)
  const { transcript, startListening, resetTranscript, SpeechRecognition } = useContext(SpeechRecognitionContext)

  useEffect(() => {
    let transcriptOld = document.getElementById('trancription').value


    setTimeout(() => {
      let transcriptNow = document.getElementById('trancription')


      console.log(transcriptOld)
      console.log(transcriptNow)
      // if (transcriptNow == transcriptOld) {
      //   console.log('TRADUCCION')
      // }

    }, 5500)

  }, [transcript])


  useEffect(() => {
    startListening()
  }, [])



  return (
    <>
      <div className="container">
        <div>
          <p id='trancription' >{transcript}</p>
          <p>{transcriptTrans}</p>
          <button type="button"
            onClick={() => SpeechRecognition.stopListening()}>STOP</button>
        </div>
      </div>

    </>
  );
}

export default App

