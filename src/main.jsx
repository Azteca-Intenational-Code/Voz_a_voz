import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SpeechRecognitionContextProvider from './modules/SpeechRecognition.jsx'
import GoogleTranslateProvider from './modules/GoogleTranslate.jsx'
import SpeechGeneratorProvider from './modules/SpeechGenerator.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <SpeechRecognitionContextProvider>
      <GoogleTranslateProvider>
        <SpeechGeneratorProvider>
          <App />
        </SpeechGeneratorProvider>
      </GoogleTranslateProvider>
    </SpeechRecognitionContextProvider>

  </React.StrictMode>
)
