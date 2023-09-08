import { useState, useEffect, useContext } from 'react'
import { LenguageDetection } from '../../modules/LenguageDetection'
import { GoogleTranslate } from '../../modules/GoogleTranslate'
import { SpeechRecognitionClientContext } from '../../modules/SpeechRecognition/SpeechRecognitionClient'
import { SpeechGenerator } from '../../modules/SpeechGenerator'

export default function Client() {

    const TIME_SILENCE = import.meta.env.VITE_TIME_SILENCE

    const [time, setTime] = useState(TIME_SILENCE)
    const { LenguageDetectionResult } = useContext(LenguageDetection)
    const { translateApi, transcriptTrans, setControlVista } = useContext(GoogleTranslate)
    const { transcript, resetTranscript, SpeechRecognition, startListening } = useContext(SpeechRecognitionClientContext)
    const { clientVoice, setClientVoice } = useContext(SpeechGenerator)

    const [controlHabla, setControlHabla] = useState(false)
    const [controlDetectionLenguage, setControlDetectionLenguage] = useState(true)
    const [textContainer, setTextContainer] = useState('')
    const [timeoutId, setTimeoutId] = useState('')
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setControlVista('client')
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

    useEffect(() => {
        if (transcriptTrans !== '') {
            // Actualiza el estado usando setMessages para agregar un elemento al array
            setMessages((prevMessages) => [...prevMessages, transcriptTrans]);
        }
    }, [transcriptTrans]);


    return (
        <div className=" bg-white shadow-2xl p-1 px-5" >

            <div className='text-center'>
                <h1>CLIENTE</h1>
            </div>

            <div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition-all ">
                    <input onClick={() => { setClientVoice(!clientVoice) }} type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <label htmlFor="toggle" className="text-xs text-gray-700">VOZ CLIENTE</label>
            </div>


            <div className='md:flex justify-around gap-1'>

                <div className='text-center'>
                    <h2>DETECCION</h2>
                    <textarea className='text-black' id='trancription' value={transcript} rows="4" cols="30"></textarea>
                </div>

                <div className='text-center w-full'>
                    <h2>TRADUCCION</h2>
                    <div id='chat-client' className='w-full flex flex-col justify-center gap-2.5 overflow-y-scroll max-h-36 p-5'>
                        {
                            messages.map((message, index) => {
                                return (
                                    <p key={index} className='border-2 border-blue-300 bg-blue-300 rounded-md mx-2.5 p-2.5 '>
                                        {message}
                                    </p>
                                );
                            })
                        }
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-around m-5'>
                <button onClick={() => SpeechRecognition.stopListening()}>STOP</button>
                <button onClick={() => { startListening() }} id='speack' className='flex text-white bg-red-600 justify-center items-center rounded-full '>REC</button>
            </div>

        </div>
    )
}
