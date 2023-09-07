import { createContext, useState, useEffect, useRef, useContext } from 'react'
import axios from "axios";
import { GoogleTranslate } from './GoogleTranslate';
import { SpeechRecognitionOperatorContext } from './SpeechRecognition/SpeechRecognitionOperator';

export const Speech_IAContext = createContext();

export default function Speech_IAContextProvider(props) {

    const { startListening } = useContext(SpeechRecognitionOperatorContext)
    const { transcriptTrans } = useContext(GoogleTranslate)

    let playlist = [];

    let etiquetaAudio = document.createElement("audio")

    const URL_API = 'https://developer.voicemaker.in/voice/api'

    function playNextInPlaylist() {
        if (playlist.length > 0) {
            var nextAudioPath = playlist.shift(); // Obtiene la siguiente pista de la cola
            etiquetaAudio.setAttribute("src", nextAudioPath); // Establece la fuente del audio
            etiquetaAudio.play(); // Reproduce el audio
        }
    }

    function ai_speak(text) {

        const requestData = {
            Engine: "neural",
            VoiceId: "ai3-Jony",
            LanguageCode: "en-US",
            Text: text,
            OutputFormat: "mp3",
            SampleRate: "48000",
            Effect: "default",
            MasterSpeed: "0",
            MasterVolume: "0",
            MasterPitch: "0"
        }

        // configuracion de axios para el llamado
        axios.post(URL_API, requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 8b13d210-4cce-11ee-b344-13dc19093c5e`
            }
        })
            .then(response => {
                console.log(response.data.path)
                // etiquetaAudio.setAttribute("src", response.data.path)
                // etiquetaAudio.play()
                playlist.push(response.data.path);
                playNextInPlaylist();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        if (transcriptTrans != "") {
            ai_speak(transcriptTrans)
        }
    }, [transcriptTrans])

    useEffect(() => {

        //Evento de click al boton de start para la voz
        document.getElementById("speack").addEventListener("click", () => {
            startListening()
        });

        etiquetaAudio.addEventListener("ended", function () {
            // Llama a la función para reproducir la siguiente pista en la cola
            playNextInPlaylist();
        });

    }, [])

    return (
        <Speech_IAContext.Provider value={{}}>
            {props.children}
        </Speech_IAContext.Provider>
    )
}
