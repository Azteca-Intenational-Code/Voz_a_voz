import { createContext } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export const SpeechRecognitionOperatorContext = createContext();

export default function SpeechRecognitionOperatorContextProvider(props) {

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
    const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();


    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
        <SpeechRecognitionOperatorContext.Provider value={{
            startListening,
            transcript,
            resetTranscript,
            listening,
            SpeechRecognition
        }}>
            {props.children}
        </SpeechRecognitionOperatorContext.Provider>
    )
}
