import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SpeechRecognitionContextProvider from './modules/SpeechRecognition.jsx'
import GoogleTranslateProvider from './modules/GoogleTranslate.jsx'
import SpeechGeneratorProvider from './modules/SpeechGenerator.jsx'
import LenguageDetectionProvider from './modules/LenguageDetection.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <SpeechRecognitionContextProvider>
      <LenguageDetectionProvider>
        <GoogleTranslateProvider>
          <SpeechGeneratorProvider>
            <App />
          </SpeechGeneratorProvider>
        </GoogleTranslateProvider>
      </LenguageDetectionProvider>
    </SpeechRecognitionContextProvider>

  </React.StrictMode>
)
