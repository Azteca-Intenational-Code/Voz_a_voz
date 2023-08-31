import { createContext, useContext, useEffect } from 'react'
import { SpeechRecognitionContext } from './SpeechRecognition';
import { LenguageDetection } from './LenguageDetection';

export const SpeechGenerator = createContext();

export default function SpeechGeneratorProvider(props) {

  const { startListening } = useContext(SpeechRecognitionContext)
  const { lenguageVoice } = useContext(LenguageDetection)

  //Inicializacion de variables
  let speech = new SpeechSynthesisUtterance();
  let voices = [];

  useEffect(() => {
    //inicializacion de modulo de voz
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
      speech.voice = voices[lenguageVoice];
    };
  }, [lenguageVoice])


  useEffect(() => {

    //Evento de click al boton de start para la voz
    document.getElementById("speack").addEventListener("click", () => {
      window.speechSynthesis.speak(speech)
      startListening()
    });

    //Etiqueta donde se imprime el texto ya traducido
    const paragraph = document.getElementById('transcriptTrans');

    // Configuracion del observador
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'characterData') {
          if (mutation.target.textContent != '""') {
            speech.text = mutation.target.textContent
            window.speechSynthesis.speak(speech)
          }
        }
      });
    });

    // asignacion del observador
    observer.observe(paragraph, { characterData: true, subtree: true });


  }, [])

  return (
    <SpeechGenerator.Provider value={{}}>
      {props.children}
    </SpeechGenerator.Provider>
  )
}
