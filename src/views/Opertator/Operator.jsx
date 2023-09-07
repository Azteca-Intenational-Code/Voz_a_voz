import { useState, useEffect, useContext } from 'react'
import { LenguageDetection } from '../../modules/LenguageDetection'
import { GoogleTranslate } from '../../modules/GoogleTranslate'
import { SpeechRecognitionOperatorContext } from '../../modules/SpeechRecognition/SpeechRecognitionOperator.jsx'

export default function Operator() {

    const TIME_SILENCE = import.meta.env.VITE_TIME_SILENCE

    const [time, setTime] = useState(TIME_SILENCE)
    const { LenguageDetectionResult } = useContext(LenguageDetection)
    const { translateApi, transcriptTrans } = useContext(GoogleTranslate)
    const { transcript, resetTranscript, SpeechRecognition } = useContext(SpeechRecognitionOperatorContext)

    const [controlHabla, setControlHabla] = useState(false)
    const [controlDetectionLenguage, setControlDetectionLenguage] = useState(true)

    const [textContainer, setTextContainer] = useState('')
    const [timeoutId, setTimeoutId] = useState('')

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
                    console.log(transcript)
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

        <div className='flex items-center justify-around'>
            <button onClick={() => SpeechRecognition.stopListening()}>STOP</button>
            <button id='speack' className='flex text-white bg-red-600 justify-center items-center rounded-full '>REC</button>
        </div>

    </div>
    )
}
