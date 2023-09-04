import { createContext, useState, useEffect, useRef, useContext } from 'react'
import axios from "axios";
import fs from "fs";
import path from "path";
import { GoogleTranslate } from './GoogleTranslate';

export const Speech_IAContext = createContext();

export default function Speech_IAContextProvider(props) {

    const { transcriptTrans } = useContext(GoogleTranslate)

    let etiquetaAudio = document.createElement("audio")
    etiquetaAudio.setAttribute("src", "https://storage.googleapis.com/cloudlabs-tts.appspot.com/audio/audio-2e0b59fe002065e0d16bf6486e0253a1.mp3")

    useEffect(() => {

        let boton = document.querySelector(".reproductor")

        boton.addEventListener("click", () => {
            etiquetaAudio.play()
        })

    }, []);

    useEffect(() => {
        if (transcriptTrans != '') {
            etiquetaAudio.play()
        }
    }, [transcriptTrans])

    function all(params) { }

    return (
        <Speech_IAContext.Provider value={{
            all
        }}>
            {props.children}
        </Speech_IAContext.Provider>
    )
}
