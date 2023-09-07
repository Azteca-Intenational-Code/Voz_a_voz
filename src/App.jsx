import './App.css'
import 'regenerator-runtime/runtime';
import { RouterProvider } from "react-router-dom";
import Routes from './routes/Routes';
import LenguageDetectionProvider from './modules/LenguageDetection';
import GoogleTranslateProvider from './modules/GoogleTranslate';



function App() {


  const routes = Routes()


  return (
    <div className='main'>
      <LenguageDetectionProvider>
        <GoogleTranslateProvider>
          <RouterProvider router={routes} />
        </GoogleTranslateProvider>
      </LenguageDetectionProvider>
    </div>
  );
}

export default App

