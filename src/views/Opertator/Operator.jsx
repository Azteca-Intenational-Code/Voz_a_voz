import { useState, useEffect, useContext } from 'react'
import { LenguageDetection } from '../../modules/LenguageDetection'
import { GoogleTranslate } from '../../modules/GoogleTranslate'
import { SpeechRecognitionOperatorContext } from '../../modules/SpeechRecognition/SpeechRecognitionOperator.jsx'
import Presentacion from "/public/audio/Presentacion.mp3"
import Unmomento from "/public/audio/Unmomento.mp3"


export default function Operator() {

    const TIME_SILENCE = import.meta.env.VITE_TIME_SILENCE

    const [time, setTime] = useState(TIME_SILENCE)
    const { LenguageDetectionResult } = useContext(LenguageDetection)
    const { translateApi, transcriptTrans, recordingOperator, setRecordingOperator, setControlVista } = useContext(GoogleTranslate)
    const { transcript, resetTranscript, SpeechRecognition, startListening } = useContext(SpeechRecognitionOperatorContext)

    const [controlHabla, setControlHabla] = useState(false)
    const [controlDetectionLenguage, setControlDetectionLenguage] = useState(true)

    const [textContainer, setTextContainer] = useState('')
    const [timeoutId, setTimeoutId] = useState('')

    useEffect(() => {
        setControlVista('operator')
    }, [])

    useEffect(() => {

        setControlHabla(true);
        clearTimeout(timeoutId) // reinicio del contador en los timpos de silencio
        let transcriptLabel = document.getElementById('trancription')
        setTextContainer(transcriptLabel.textContent);

    }, [transcript])

    // al terminar cada insercion de habla cambiar de estado la variable de control
    useEffect(() => {
        setControlHabla(false);
        console.log(textContainer)
    }, [textContainer])

    // manejo para traduccion despues de un tiempo condifurado
    useEffect(() => {
        let id = setTimeout(() => { // inicializacion del contador
            if (!controlHabla) {
                if (controlDetectionLenguage && textContainer != '') {
                    LenguageDetectionResult(transcript)
                    setControlDetectionLenguage(false) //Funcion de deteccion de lenguaje 
                }
                translateApi(textContainer) //Funcion de traduccion
                resetTranscript()
            }
        }, time);

        setTimeoutId(id) //id del contador 
    }, [controlHabla])

    return (
        <div className=" bg-white p-16 shadow-2xl" >

            <div className='text-center'>
                <h1>OPERADOR</h1>
            </div>

            <div className='flex justify-center text-center font-bold'>
                <h3 className={`w-fit  bg-red-100 border-4 px-5 rounded-full ${recordingOperator ? 'animate-pulse border-red-700 text-red-700' : 'border-red-200 text-red-200'}`}>GRABANDO</h3>
            </div>

            <div className='md:flex justify-around gap-1'>
                <div className='text-center'>
                    <h2>DETECCION</h2>
                    <textarea className='text-black' id='trancription' value={transcript} rows="4" cols="30"></textarea>
                </div>
                <div className='text-center'>
                    <h2>TRADUCCION</h2>
                    <textarea className='text-black' id='transcriptTrans' value={transcriptTrans} rows="4" cols="30"></textarea>

                </div>
            </div>

            <div className='p-5'>
                <h2>RESPUESTAS PREGRABADAS</h2>
                <div className='flex text-sm border-2 border-black p-5 gap-2'>
                    <button onClick={() => {
                        let etiquetaAudio = document.createElement("audio")
                        etiquetaAudio.setAttribute("src", Presentacion); // Establece la fuente del audio
                        etiquetaAudio.play();
                    }}> HOLA MI NOMBRE ES DANIEL, QUE PUEDO HACER POR TI </button>
                    <button onClick={() => {
                        let etiquetaAudio = document.createElement("audio")
                        etiquetaAudio.setAttribute("src", Unmomento); // Establece la fuente del audio
                        etiquetaAudio.play();
                    }}> OK, UN MOMENTO</button>
                </div>
            </div>

            <div className='flex items-center justify-around'>
                <button onClick={() => { SpeechRecognition.stopListening(), setRecordingOperator(false) }}>STOP</button>
                <button onClick={() => { startListening(), setRecordingOperator(true) }} id='speack' className='flex text-white bg-red-600 justify-center items-center rounded-full '>REC</button>
            </div>

        </div>
    )
}
