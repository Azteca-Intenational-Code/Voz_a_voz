import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GptTranslateProvider from './modules/GptTranslate.jsx'
import SpeechRecognitionContextProvider from './modules/SpeechRecognition.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <SpeechRecognitionContextProvider>
        <GptTranslateProvider>
          <App />
        </GptTranslateProvider>
    </SpeechRecognitionContextProvider>

  </React.StrictMode>
)
