import { createContext, useState, useEffect, useRef, useContext } from 'react'
import axios from "axios";
import { GoogleTranslate } from './GoogleTranslate';
import { SpeechRecognitionOperatorContext } from './SpeechRecognition/SpeechRecognitionOperator';

export const Speech_IAContext = createContext();

export default function Speech_IAContextProvider(props) {

    const { startListening } = useContext(SpeechRecognitionOperatorContext)
    const { transcriptTrans } = useContext(GoogleTranslate)

    let etiquetaAudio = document.createElement("audio")
    etiquetaAudio.setAttribute("src", "https://storage.googleapis.com/cloudlabs-tts.appspot.com/audio/audio-2e0b59fe002065e0d16bf6486e0253a1.mp3")

    useEffect(() => {
        if (transcriptTrans != '') {
            etiquetaAudio.play()
        }
    }, [transcriptTrans])

    useEffect(() => {

        //Evento de click al boton de start para la voz
        document.getElementById("speack").addEventListener("click", () => {
          startListening()
        });
    
      }, [])

    function all(params) { }

    return (
        <Speech_IAContext.Provider value={{
            all
        }}>
            {props.children}
        </Speech_IAContext.Provider>
    )
}
