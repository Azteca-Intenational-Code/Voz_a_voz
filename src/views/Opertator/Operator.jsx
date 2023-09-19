import { useState, useEffect, useContext } from 'react'
import { LenguageDetection } from '../../modules/LenguageDetection'
import { GoogleTranslate } from '../../modules/GoogleTranslate'
import { SpeechRecognitionOperatorContext } from '../../modules/SpeechRecognition/SpeechRecognitionOperator.jsx'
import Hey_thank_you_for from "/audio/Hey_thank_you_for.mp3"
import hold_on from "/audio/hold_on.mp3"
import i_look_in_my_database from "/audio/i_look_in_my_database.mp3"
import one_moment from "/audio/one_moment.mp3"
import one_second from "/audio/one_second.mp3"
import wait_a_moment from "/audio/wait_a_moment.mp3"

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
                <div className='grid text-sm border-2 border-black p-5 gap-2'>
                    <button onClick={() => {
                        let etiquetaAudio = document.createElement("audio")
                        etiquetaAudio.setAttribute("src", Hey_thank_you_for); // Establece la fuente del audio
                        etiquetaAudio.play();
                    }}> Hey! thank you for calling express clean chicago, how can i help you today?</button>
                    <button onClick={() => {
                        let etiquetaAudio = document.createElement("audio")
                        etiquetaAudio.setAttribute("src", hold_on); // Establece la fuente del audio
                        etiquetaAudio.play();
                    }}>hold on</button>
                    <button onClick={() => {
                        let etiquetaAudio = document.createElement("audio")
                        etiquetaAudio.setAttribute("src", i_look_in_my_database); // Establece la fuente del audio
                        etiquetaAudio.play();
                    }}>give me one moment while i look in my database</button>
                    <button onClick={() => {
                        let etiquetaAudio = document.createElement("audio")
                        etiquetaAudio.setAttribute("src", one_moment); // Establece la fuente del audio
                        etiquetaAudio.play();
                    }}> one moment </button>
                    <button onClick={() => {
                        let etiquetaAudio = document.createElement("audio")
                        etiquetaAudio.setAttribute("src", one_second); // Establece la fuente del audio
                        etiquetaAudio.play();
                    }}> one second </button>
                    <button onClick={() => {
                        let etiquetaAudio = document.createElement("audio")
                        etiquetaAudio.setAttribute("src", wait_a_moment); // Establece la fuente del audio
                        etiquetaAudio.play();
                    }}> wait a moment</button>
                </div>
            </div>

            <div className='flex items-center justify-around'>
                <button onClick={() => { SpeechRecognition.stopListening(), setRecordingOperator(false) }}>STOP</button>
                <button onClick={() => { startListening(), setRecordingOperator(true) }} id='speack' className='flex text-white bg-red-600 justify-center items-center rounded-full '>REC</button>
            </div>

        </div>
    )
}
