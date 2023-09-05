import { createContext, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const SpeechRecognitionClientContext = createContext();

export default function SpeechRecognitionClientContextProvider(props) {

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
    const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();


    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
        <SpeechRecognitionClientContext.Provider value={{
            startListening,
            transcript,
            resetTranscript,
            listening,
            SpeechRecognition
        }}>
            {props.children}
        </SpeechRecognitionClientContext.Provider>
    )
}
