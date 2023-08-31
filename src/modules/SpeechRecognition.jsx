import { createContext, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const SpeechRecognitionContext = createContext();

export default function SpeechRecognitionContextProvider(props) {

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
    const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();


    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
        <SpeechRecognitionContext.Provider value={{
            startListening,
            transcript,
            resetTranscript,
            listening,
            SpeechRecognition
        }}>
            {props.children}
        </SpeechRecognitionContext.Provider>
    )
}
