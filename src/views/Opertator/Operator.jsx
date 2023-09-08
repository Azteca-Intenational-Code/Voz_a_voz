import { useState, useEffect, useContext } from 'react'
import { LenguageDetection } from '../../modules/LenguageDetection'
import { GoogleTranslate } from '../../modules/GoogleTranslate'
import { SpeechRecognitionOperatorContext } from '../../modules/SpeechRecognition/SpeechRecognitionOperator.jsx'

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

    // manejo de la variable de control de habla y obtencion del texto impreso
    useEffect(() => {

        setControlHabla(true);
        clearTimeout(timeoutId) // reinicio del contador en los timpos de silencio
        let transcriptLabel = document.getElementById('trancription')
        setTextContainer(transcriptLabel.textContent);

    }, [transcript])

    // al terminar cada insercion de habla cambiar de estado la variable de control
    useEffect(() => {
        setControlHabla(false);
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
                    <textarea className='text-black' id='trancription' defaultValue={transcript} rows="4" cols="30"></textarea>
                </div>
                <div className='text-center'>
                    <h2>TRADUCCION</h2>
                    <textarea className='text-black' id='transcriptTrans' defaultValue={transcriptTrans} rows="4" cols="30"></textarea>

                </div>
            </div>

            <div className='flex items-center justify-around'>
                <button onClick={() => { SpeechRecognition.stopListening(), setRecordingOperator(false) }}>STOP</button>
                <button onClick={() => { startListening(), setRecordingOperator(true) }} id='speack' className='flex text-white bg-red-600 justify-center items-center rounded-full '>REC</button>
            </div>

        </div>
    )
}
