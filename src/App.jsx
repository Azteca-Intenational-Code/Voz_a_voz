import './App.css'
import 'regenerator-runtime/runtime';
import { RouterProvider } from "react-router-dom";
import Routes from './routes/Routes';
import LenguageDetectionProvider from './modules/LenguageDetection';
import GoogleTranslateProvider from './modules/GoogleTranslate';
import Speech_IAContextProvider from './modules/Speech_IA';
import SpeechRecognitionOperatorContextProvider from './modules/SpeechRecognition/SpeechRecognitionOperator';



function App() {


  const routes = Routes()


  return (
    <div className='main'>
      <LenguageDetectionProvider>
        <SpeechRecognitionOperatorContextProvider>
          <Speech_IAContextProvider>
            <GoogleTranslateProvider>
              <RouterProvider router={routes} />
            </GoogleTranslateProvider>
          </Speech_IAContextProvider>
        </SpeechRecognitionOperatorContextProvider>
      </LenguageDetectionProvider>
    </div>
  );
}

export default App

