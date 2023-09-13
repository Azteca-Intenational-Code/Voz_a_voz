import { createContext, useEffect, useContext } from 'react'
import axios from "axios";
import { GoogleTranslate } from './GoogleTranslate';

export const Speech_IAContext = createContext();

export default function Speech_IAContextProvider(props) {

    const API_KEY_SPEECH_AI = import.meta.env.VITE_API_KEY_SPEECH_AI
    const URL_API = import.meta.env.VITE_URL_API_SPEECH_AI

    const { transcriptTrans, controlVista } = useContext(GoogleTranslate)

    let playlist = [];

    let etiquetaAudio = document.createElement("audio")

    function playNextInPlaylist() {
        if (playlist.length > 0) {
            var nextAudioPath = playlist.shift(); // Obtiene la siguiente pista de la cola
            etiquetaAudio.setAttribute("src", nextAudioPath); // Establece la fuente del audio
            etiquetaAudio.play(); // Reproduce el audio
        }
    }

    function ai_speak(text) {

        if (text != "") {
            const requestData = {
                Engine: "neural",
                VoiceId: "ai3-Jenny",
                LanguageCode: "en-US",
                Text: text,
                OutputFormat: "mp3",
                SampleRate: "8000",
                Effect: "default",
                MasterSpeed: 20,
                MasterVolume: 0,
                MasterPitch: 0
            }

            // configuracion de axios para el llamado
            axios.post(URL_API, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY_SPEECH_AI}`
                }
            })
                .then(response => {
                    playlist.push(response.data.path);
                    playNextInPlaylist();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

    }

    useEffect(() => {
        if (controlVista == 'operator') {
            ai_speak(transcriptTrans)
        }
    }, [transcriptTrans])

    useEffect(() => {

        etiquetaAudio.addEventListener("canplaythrough", function () {
            // Llama a la función para reproducir la siguiente pista en la cola
            playNextInPlaylist();
        });

    }, [])

    return (
        <Speech_IAContext.Provider value={{
            ai_speak
        }}>
            {props.children}
        </Speech_IAContext.Provider>
    )
}
